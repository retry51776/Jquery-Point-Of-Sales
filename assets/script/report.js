$(function(){
	var setting 		= $().POSsetting();
	var websql 			= $().POSwebsql();
	var tableToday 		= $("#table_today");
	var todaySummary 	= $(".table_today_summary");

	attchHandler();
	//init table
	websql.getOverViewByDate( 
		Date.today().toString("yyyy-MM-dd"),
		Date.today().addDays(1).toString("yyyy-MM-dd"),
		getOverViewByDate_onSuccess, 
		websql.onError
	);

	function attchHandler(){
		$(document).on("click",".orderDelete",function(){
			$(".selectDelete").removeClass("selectDelete");
			var thisTr 		= $(this).closest(".orderItem");
			var thisOrder 	= thisTr.data("summary");
			var deleteModal = $(
			'<div class="modal fade" id="myModal">  \
				<div class="modal-content"> 		\
					<div class="modal-header"> 		\
						<button type="button" class="close" data-dismiss="modal">&times;</button> \
						<h4 class="modal-title">Delete Order</h4>   \
					</div> 								\
					<div class="modal-body"></div> 		\
					<div class="modal-footer"> 			\
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> 	\
						<button type="button" class="btn btn-primary modal_confirm" data-dismiss="modal">Confirm</button>		\
					</div>	\
				</div>		\
			</div>');

			thisTr.addClass("selectDelete");
			$(deleteModal).modal('show');
			$(document).off("click",".modal_confirm");
			$(document).on("click",".modal_confirm",function(){
				websql.removeOrder( thisOrder.id , removeOrder_onSuccess);
			});
			
		});

		$(document).on("click", ".orderDetail", function(){
			var thisTr 		= $(this).closest(".orderItem");
			var thisOrder 	= thisTr.data("summary");
			var modal 		= $(
				'<div class="modal fade" id="myModal"> \
			        <div class="modal-content"> \
			          	<div class="modal-header"> \
			            	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
			            	<h4 class="modal-title">Order Detail</h4> \
			          	</div> \
			          	<div class="modal-body">Loading......</div> \
			          	<div class="modal-footer"> \
			            	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
			            	<button type="button" class="btn btn-primary modal_confirm" data-dismiss="modal">Confirm</button> \
			          	</div> \
			        </div> \
    			</div>');

			thisTr.addClass("openDetail");
			modal.modal('show');
			websql.getOrderDetail( 
				thisOrder.id,
				function(tx, results){
					var newTable 	= $("#table_today").clone();
					var modalBody	= modal.find(".modal-body");;
					
					newTable.find("tbody tr:not(.openDetail:first), .DetailRemovable").remove();
					modalBody.empty().append("<h3>Order Summary</h3>").append( newTable );

					if( results.rows.length == 0 ){
						modalBody.append("<h3>No order Detail found!</h3>");
					}else{
						modalBody.append('<hr><h3>Order Items</h3>\
							<table class="table table-hover tableDetail">\
								<thead>\
									<tr>\
										<th>ItemId</th>\
										<th>Name</th>\
										<th>Type</th>\
										<th>Description</th>\
										<th>Qty</th>\
										<th>Content</th>\
										<th>Addit</th>\
									</tr>\
								</thead>\
								<tbody></tbody>\
							</table>');
					}
					for (i = 0; i < results.rows.length; i++) {
						var thisDetail = results.rows.item(i);
						var searchItemInfo = setting.searchItem( thisDetail.itemId );
						var thisTr = $(
							'<tr>\
								<td class="itemId"></td>\
								<td class="name"></td>\
								<td class="type"></td>\
								<td class="desc"></td>\
								<td class="qty"></td>\
								<td></td>\
								<td class="additationInfo"></td>\
							</tr>');

						setting.setTextByClass( thisDetail , thisTr);
						if( searchItemInfo != null){
							setting.setTextByClass( searchItemInfo , thisTr);
							if( searchItemInfo.content  != undefined ){
								setting.setTextByClass( searchItemInfo.content , thisTr);
							}
						}
						modalBody.find(".tableDetail tbody").append( thisTr );
					}
				}//end getOrderDetail_onSuccess
			);//end getOrderDetail
			
		});
	}

	function updateTodaySummry( todayDishCnt, todayTotal, todayCustCnt){
		var tax = setting.info.tax/100;
		var gross = todayTotal* (tax+1);
		todaySummary.empty().append('<p>Today\'s Total Sale [<b class="todayDishCnt h2">'+todayDishCnt
			+'</b>] : $ <b class="todayTotal h2">'+todayTotal.toFixed(2) +"</b> with Tax : "+(tax*100)
			+'%</b> Gross Total: $ <b class="todayGross h2 text-danger">'+gross.toFixed(2) +'</b>'
			+'<br> Customer Count : <b class="todayCustCnt h2">'+todayCustCnt
			+'</b>, with Average spending : $ <b class="todayAvg h2">'+( todayTotal/todayCustCnt ).toFixed(2)+'</b></p>');
	}

	function removeOrder_onSuccess(tx, results){
		$.bootstrapGrowl( '<span class="glyphicon glyphicon-trash"></span> Order Removed' );
		var thisTr 		 = $(".selectDelete");
		var thisOrder 	 = thisTr.data("summary");
		var todayCustCnt = parseInt($(".todayCustCnt").text());
		var todayDishCnt = parseInt($(".todayDishCnt").text());
		var todayTotal   = Number( $(".todayTotal").text() );
		updateTodaySummry( todayDishCnt-thisOrder.orderQty, todayTotal-thisOrder.total, (todayCustCnt-1) );
		thisTr.remove();
		tableToday.trigger("update").trigger("appendCache").trigger("applyWidgets");
	}

	function getOverViewByDate_onSuccess(tx, results){
		$(".todayLabel").text( Date.today().toString("yyyy-MM-dd") );
		var todayDishCnt = 0;
		var todayTotal   = 0;
		for (i = 0; i < results.rows.length; i++) {
			var thisSummary = results.rows.item(i);
			var thisTr = $(
				'<tr class="orderItem">\
					<td class="stamp"></td>\
					<td class="total"></td>\
					<td class="orderQty"></td>\
					<td class="custId"></td>\
					<td class="name"></td>\
					<td class="phone"></td>\
					<td class="address"></td>\
					<td class="ation DetailRemovable">\
						<input class="orderDetail btn-info btn-xs" type="button" value="Detail">\
						<input class="orderDelete btn-danger btn-xs" type="button" value="Delete">\
					</td>\
				</tr>'
			).data("summary",thisSummary);

			setting.setTextByClass( thisSummary , thisTr );
			todayDishCnt 	+= thisSummary.orderQty;
			todayTotal 		+= thisSummary.total;
			tableToday.append( thisTr );
			
		}//end for
		updateTodaySummry( todayDishCnt, todayTotal, results.rows.length );
		tableToday.tablesorter(); 

	}//end after_getOverViewByDate_success
});