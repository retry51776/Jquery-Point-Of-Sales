;(function( $ ) {
 	var setting = $().POSsetting();

    $.fn.POSmenu = function() {
    	//thisMenu: The Menu div
    	var thisMenu 	= this;
    	var thisContent = $(thisMenu).find(".content");
    	var init_ItemId = setting.info.dfMenuID;

    	//function: functions thisContent generator menu
    	//function must match setting.items.type
    	//arg: array of setting.items.id
    	//return void
    	//Desc: generator DOM element according to setting.items.type, then add to The Menu div(thisContent)
	 	var functions = {
	 		"category" 	: render_general,
			"dish" 		: render_dish,
			"extra" 	: render_extra//Here return custom type render function same name as type

	 	};//End of functions
		
		attachHandler();
	 	initialized(init_ItemId);
    	

		return functions;

		function initialized( init_ItemId ){
			var mainMenu 		= setting.searchItem( init_ItemId );
			var menu_title 		= 
			$('<table class="menu_header"><tr class="row">\
				<td class="menu_disLabel col-xs-6 col-md-offset-1"></td>\
				<td class="menu_cnt h4 col-xs-6">0</td>\
			</tr><tr class="row">\
				<td><input class="menu_clearSearch btn-info btn-sm col-xs-6 col-md-offset-1" type="button" value="Back to Main Menu"></td>\
				<td><input class="menu_searchItem form-control input-sm col-xs-6" type="text" placeholder="Search by key words "></td>\
			</tr></table>');
			thisMenu.find(".title").empty().append( menu_title );
			thisContent.empty();
			render_catrgory( mainMenu );
			thisContent.trigger("change");
		}

		function attachHandler(){
			$(document).on("change", thisContent, function(){
				thisMenu.find(".menu_cnt").text( thisContent.find("tbody>tr").length );
			});

			$(document).on("click",".menu_clearSearch",function(){
				$(".menu_searchItem").val("");
				initialized(init_ItemId);
			});

			$(document).on("input",".menu_searchItem",function(){
				//clear pass menu content
				thisContent.empty();

				var searchText 		= $.trim($(this).val());
				if( searchText.length ){
					var searchResult 	= setting.searchObject( searchText );
					$(".menu_disLabel").text("Search result");
					if(searchResult.length){
						$.each( searchResult, function(){
							if(this != undefined && this.type != undefined ){
								functions[this.type ]( this );
							}
						});
					}else{
						thisContent.append('<p class="holder">No result match [<b>'+searchText+'</b>], please clear searchText.</p>');
					}
				}else{
					initialized(init_ItemId);
				}//end searchText.length
				$(this).focus();
				thisContent.trigger("change");
			});

			$(document).on("click", ".content tr.category", function(){
				var item = $(this).data("item");
				if( item != undefined && item.id != undefined && item.id.length ){
					render_catrgory( item );
				}
				thisContent.trigger("change");
			});

			//Here is example attach  custom handler for your custom need
			$(document).on("input", ".extraPrice", function(e){
				//Update extra fee when price input changed
				e.stopPropagation();
				var thisTr 	= $(this).closest("tr");
				var item 	= thisTr.data("item");
				var price 	= Number( $(this).val() );
				item.content.price 	= price;
				thisTr.data("item", item);
			});
		}

		function render_general( item ){
			if( item != undefined && item.type != undefined & item.name != undefined){
				var thisTr = $(
					'<tr class="'+item.type+'"><td colspan="5">\
						<button type="button" class="label_'+item.type+' btn-default btn-block btn-lg"></button>\
					</td></tr>');
				thisTr.find(".label_"+item.type ).text( item.name );
				thisTr.data("item" , item );
				thisContent.append( thisTr );
			}
			thisContent.trigger("change");
		}

		function render_catrgory( category ){
			//clear pass menu content
			thisContent.empty();
			if( typeof category.content != "undefined" && $.isArray( category.content ) && category.content.length ){
				$(".menu_disLabel").text( category.name );
				$.each( category.content, function(){
					var thisItem = setting.searchItem( this );
					if( thisItem != undefined && thisItem != null ){
						functions[thisItem.type ]( thisItem );
					}
				});
			}else{
				thisContent.append('<p class="holder">This category [<b>'+category.name+'</b>] haven\'t set any content.</p>');
			}
		}

	    function render_dish( dish ){

	    	if( typeof dish.content.ico == "undefined" ){
	    		dish.content.ico = dish.id;
	    	}
	    	if( typeof dish.content.eng == "undefined" ){
	    		dish.content.eng = "";
	    	}
	    	if( typeof dish.content.name == "undefined" ){
	    		dish.content.name = "";
	    	}
	    	if( typeof dish.content.desc == "undefined" ){
	    		dish.content.desc = "No description yet.";
	    	}
	    	if( typeof dish.content.price == "undefined" ){
	    		dish.content.price = 0.00;
	    	}

	    	var thisTr = $(
	    		'<tr class="dish hover">\
	    			<td><img class="visible-lg visible-md" src="img/'+dish.content.ico+'.png" onerror="this.src=\'img/none.png\'"></td>\
	    			<td>\
	    				<h4 class="dishSubName"></h4>\
	    				<b class="dishId"></b> <span class="dishName"></span>\
	    				<small class="dishDesc visible-lg visible-md visible-sm"></small>\
	    			</td>\
	    			<td>$<b class="dishPrice h2"></b></td>\
	    		</tr>').data("item", dish);
	    	
	    	thisTr.find(".dishId").text(dish.id);
	    	thisTr.find(".dishName").text(dish.content.name);
	    	thisTr.find(".dishSubName").text(dish.content.eng);
	    	thisTr.find(".dishDesc").text(dish.content.desc);
	    	thisTr.find(".dishPrice").text(dish.content.price);
	    	thisContent.append(thisTr);
	    }

	    //This is example actions to render custome type
	    function render_extra( item ){
	    	if( typeof item.content.ico == "undefined" ){
	    		item.content.ico = item.id;
	    	}
	    	if( typeof item.content.eng == "undefined" ){
	    		item.content.eng = "";
	    	}
	    	if( typeof item.content.name == "undefined" ){
	    		item.content.name = "";
	    	}
	    	if( typeof item.content.desc == "undefined" ){
	    		item.content.desc = "No description yet.";
	    	}
	    	if( typeof item.content.price == "undefined" ){
	    		item.content.price = 0.00;
	    	}

	    	var thisTr = $(
	    		'<tr class="extra hover">\
	    			<td><img class="visible-lg visible-md" src="img/'+item.content.ico+'.png" onerror="this.src=\'img/none.png\'"></td>\
	    			<td>\
	    				<h4 class="extraName"></h4>\
	    				<b class="extraId"></b> <span class="extraSubName"></span>\
	    				<small class="extraDesc visible-lg visible-md visible-sm"></small>\
	    			</td>\
	    			<td class="col-xs-3">\
	    				<div class="input-group">\
		    				<span class="input-group-addon">$</span>\
		    				<input type="number" class="extraPrice form-control input-group-lg form-inline" value="0.00">\
		    			</div>\
	    			</td>\
	    		</tr>').data("item", item);
	    	
	    	thisTr.find(".extraId").text(item.id);
	    	thisTr.find(".extraName").text(item.content.name);
	    	thisTr.find(".extraSubName").text(item.content.eng);
	    	thisTr.find(".extraDesc").text(item.content.desc);
	    	thisTr.find(".extraPrice").text(item.content.price);
	    	thisContent.append(thisTr);
	    }
    }
}( jQuery ));