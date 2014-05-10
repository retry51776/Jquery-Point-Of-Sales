$(function(){
	var setting 		= $().POSsetting();
	var websql 			= $().POSwebsql();
	var tableSummary 	= $("#table_item");
	var selectMonth 	= $(".monthLabel");
	var selectYear 		= $(".yearLabel");

	initialized();
	attachHanlder();
	refresSummary();

	function initialized(){
		for(var i=-5;i<=0;i++){
			var thisYear 	= Date.today().addYears(i).toString("yyyy");
			var yearOpt 	= $('<option value="'+thisYear+'">'+thisYear+'</option>');
			selectYear.append( yearOpt );
		}

		selectMonth.find("option[value='"+Date.today().toString("MM")+"']").attr("selected","selected");
		selectYear.find("option[value='"+Date.today().toString("yyyy")+"']").attr("selected","selected");
	}

	function attachHanlder(){
		$(document).on("input",".newPrice , .newQty", function(){
			var whatIfQtyTotal 	 = 0;
			var whatIfPriceTotal = 0;
			var Alltr = $("#table_item tbody tr.itemSummary");
			$.each( Alltr, function(){
				var thisTr 			= $(this);
				var thisAdjQty 		= thisTr.find(".newQty").val();
				var thisAdjPrice 	= thisTr.find(".newPrice ").val();

				if( !thisAdjQty.length ){
					thisAdjQty = 0;
				}else{
					thisAdjQty = parseInt(thisAdjQty);
				}

				if( !thisAdjPrice.length ){
					thisAdjPrice = 0;
				}else{
					thisAdjPrice = Number( thisAdjPrice );
				}

				if( thisTr.find(".newQty").val().length || thisTr.find(".newPrice ").val().length ){
					var diffPrice = (parseInt( thisTr.find(".qtyTotal").text() ) + thisAdjQty )//Difference on Qty
								* 	(Number( thisTr.find(".price").text() ) + thisAdjPrice )
								-   Number( thisTr.find(".salesTotal").text() );
					thisTr.find(".priceDiff").text( diffPrice.toFixed(2));
					whatIfPriceTotal += Number(diffPrice);
					whatIfQtyTotal 	 += parseInt(thisAdjQty);
				}
			});//end each
			
			$(".adjQtyTotal").text('['+whatIfQtyTotal+']');
			$(".diffTotal").empty().append('$ <b>'+whatIfPriceTotal.toFixed(2)+'</b>');
		});

		$(document).on("input",".txtFliter", function(){
			var searchText = $.trim( $(this).val().toLowerCase() );
			$("#table_item tbody tr.itemSummary").show();
			if( searchText.length ){
				$("#table_item tbody tr.itemSummary").each( function(){
					if( $(this).text().toLowerCase().indexOf( searchText) == -1 ){
						$(this).hide();
					}
				});
			}
			$("#table_item").trigger("update").trigger("appendCache").trigger("applyWidgets");
		});

		$(document).on("change",".monthLabel, .yearLabel", refresSummary );
	}//end attachHanlder

	function refresSummary(){
		var selectDate  = Date.parse(selectYear.val()+"-"+selectMonth.val()+"-1");
		var startDate 	= selectDate.toString("yyyy-MM-dd")
		var endDate  	= selectDate.addMonths(1).toString("yyyy-MM-dd");
		$(".adjQtyTotal, .diffTotal").empty();
		websql.getItemOverView( 
			startDate, 
			endDate, 
			function(tx, results){
				
				tableSummary.find("tbody").empty();
				var qtySum 		= 0;
				var salesTotal 	= 0;

				if( results.rows.length ){
					$(".holder").remove();
					for (i = 0; i < results.rows.length; i++) {
						var itemSummary = results.rows.item(i);
						var itemInfo 	= setting.searchItem( itemSummary.itemId );
						var thisTr 		= $(
						'<tr class="itemSummary">\
							<td class="name"></td>\
							<td class="itemId"></td>\
							<td class="qtyTotal"></td>\
							<td class="price"></td>\
							<td class="salesTotal"></td>\
							<td><input class="newPrice form-control input-sm" type="number" placeholder="Set new price"></td>\
							<td><input class="newQty form-control input-sm" type="number" placeholder="Set new qty"></td>\
							<td class="priceDiff"></td>\
						</tr>'
						);

						qtySum 	+= itemSummary.qtyTotal;

						if( itemInfo != null){
							setting.setTextByClass( itemInfo , thisTr);
							if( itemInfo.content  != undefined ){
								setting.setTextByClass( itemInfo.content , thisTr);
								if( itemInfo.content.price != undefined ){
									var thisTotal = itemSummary.qtyTotal * itemInfo.content.price;
									salesTotal 	 += thisTotal;
									thisTr.find(".salesTotal").text(thisTotal);
								}
							}
						}
						setting.setTextByClass( itemSummary , thisTr);
						tableSummary.append( thisTr );
					}//end for
				}else{
					tableSummary.append('<td colspan="8" class="holder">No results found. Try a different date.</td>');
				}//end if leng

				tableSummary.find(".itemCnt").text( results.rows.length );
				tableSummary.find(".qtySum").text( qtySum );
				tableSummary.find(".TotalGross").text( (salesTotal * (setting.info.tax /100 + 1)).toFixed(2) );
				tableSummary.find(".allTotal").empty().append('$ <b>'+salesTotal.toFixed(2)+'</b>');
				tableSummary.tablesorter(); 
		});//end sql
	}//refreshSummary
});