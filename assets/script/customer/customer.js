;(function( $ ) {
 	var setting 	= $().POSsetting();
    var websql      = $().POSwebsql();
 	var dfInitCust	= 4;
    var CustCnt     = 1;
    var that        = null;
    var suggestName = [];
    var suggestPhone= [];
    var suggestAddr = [];
    var Collection  = {};
    var sqlCounter  = 0;
    var myModal     = null;

    $.fn.POScustomer = function() {
    	//that: The Customer div
    	that = $(this);
    	initialized(that);
        attachHandler();
		return {
            'getCurrentCustomer' : getCurrentCustomer,
            'selectMenu'         : selectMenu,
            'addNewSuggestCustInfo' : addNewSuggestCustInfo,
            'refreshSuggestionList' : refreshSuggestionList
        };
    }

    function initialized( div ){
        websql.getCustInfo( null , initCustomerSuggestion );
    	var ele_tab_ul 			= $('<ul class="nav nav-tabs"></ul>');
    	var ele_tab_content 	= $('<div class="tab-content"></div>');
        var suggestCustCnt      = Math.round( that.width()/80);
        //autotamatic adjust dfCustCnt by width of div
        if ( that.width() > 400 && dfInitCust < suggestCustCnt ) {
            dfInitCust = suggestCustCnt;
        };
        $(div).empty().append(ele_tab_ul).append(ele_tab_content);
    	for(; CustCnt<dfInitCust+1;){
    		addTab_Customer();
    	}
        setDefaultActiveTab();
        
    }

    function setDefaultActiveTab(){
        that.find("ul.nav").find(">:first-child").addClass('active');
        that.find("div.tab-content").find(">:first-child").addClass('active');
    }

    function addTab_Customer(){
        var TabHeader       = '<li><a href="#customer'+CustCnt+'" data-toggle="tab">Cust '+CustCnt+'</a></li>';
        var TabContainer    = $(
            '<div class="tab-pane panel custInfo" id="customer'+CustCnt+'">\
                <div class="panel panel-default">\
                    <div class="panel-heading">\
                        <h6 class="panel-title">Summary of <span class="label_custName">Customer '+CustCnt+'</span></h6>\
                    </div>\
                    <div class="panel-body">\
                        <div class="container-fluid">\
                            <div class="cust_summary row-fluid">\
                                <div class="span7 form-horizontal">\
                                    <div class="form-group col-sm-12">\
                                        <input class="custName form-control" placeholder="Name">\
                                    </div>\
                                    <div class="form-group col-sm-12 has-feedback">\
                                          <input class="custPhone form-control" placeholder="Phone">\
                                          <span class="googlePhone form-control-feedback glyphicon glyphicon-search visible-lg visible-sm"></span>\
                                    </div>\
                                    <div class="form-group col-sm-12 has-feedback">\
                                          <input class="custAddress form-control" placeholder="Address">\
                                          <span class="getGoogleMap form-control-feedback glyphicon glyphicon-map-marker visible-lg visible-sm"></span>\
                                    </div>\
                                </div>\
                                <table class="span5">\
                                    <tr class="row">\
                                        <td class="text-right col-md-5">Count:</td>\
                                        <td class="text-center col-md-7 cust_summary_count">0</td>\
                                    </tr>\
                                    <tr class="row">\
                                        <td class="text-right col-md-5">Subtotal:</td>\
                                        <td class="text-center col-md-7 cust_summary_subtotal">0.00</td>\
                                    </tr>\
                                    <tr class="row">\
                                        <td class="text-right col-md-5">Tax:</td>\
                                        <td class="text-center col-md-7 cust_summary_tax">0.00</td>\
                                    </tr>\
                                    <tr class="row">\
                                        <td class="text-right col-md-5">Total:</td>\
                                        <td class="text-center col-md-7 cust_summary_total">0.00</td>\
                                    </tr>\
                                    <tr>\
                                        <td colspan="9">\
                                            <input type="button" class="action-confirm btn btn-primary btn-block col-xs-10" value="Confirm">\
                                        </td>\
                                    </tr>\
                                </table>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="panel panel-default customerOrder">\
                    <div class="panel-heading">\
                        <h6 class="panel-title">Orders of <span class="label_custName">Customer '+CustCnt+'</span></h6>\
                    </div>\
                    <div class="panel-body ">\
                        <table class="cust_orderitem table table-hover">\
                            <thead>\
                                <tr>\
                                    <th>Name</th>\
                                    <th>Price</th>\
                                    <th>Qty</th>\
                                    <th>Sub</th>\
                                    <th>Actions</th>\
                                </tr>\
                            </thead>\
                            <tbody></tbody>\
                            <tfoot>\
                                <tr>\
                                    <td class="holder" colspan="5">This customer haven\'t place any orders.</td>\
                                </tr>\
                            </tfoot>\
                        </table>\
                    </div>\
                </div>\
            </div>');
        var ordersTable     = TabContainer.find(".cust_orderitem");

        that.find("ul.nav").append( TabHeader );
        that.find("div.tab-content").append( TabContainer );

        //init plugins inside customer pane
        ordersTable.tablesorter();
        refreshSuggestionList();
        CustCnt++;
    }

    function getCustomerName( Customer ){
        //default clear current Customer
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }
        var input_name = Customer.find("input.custName:first");
        if( input_name.length && input_name.val().length ){
            return input_name.val();
        }else{
            var label_name = Customer.find(".label_custName:first");
            if(label_name.length){
                return label_name.text();
            }else{
                return "";
            }
        }
    }

    function getCurrentCustomer(){
        return $(".custInfo.active");
    }

    //Actions: when user order Item
    function selectMenu( orderItem ){
        //console.log(orderItem);
        var result = { 
            "success": false,
            "act_msg": "Order item can't be empty, failed"
        };
        //check order Item
        if( orderItem != undefined ){
            //get current customer obj
            var thisCust = getCurrentCustomer();
            //hide no holder msg
            thisCust.find(".customerOrder .holder").hide();

            //Action for dish
            if( orderItem.type == "dish" ){
                result = addDish( orderItem , thisCust);
            }

            //If you create other item.type, add switch to call your function below to process
            if( orderItem.type == "extra" ){
                result = addDish( orderItem , thisCust);
            }
            return result;
        }else{
            $.bootstrapGrowl( result.act_msg , { type: 'error'});
            return result;
        }
    }

    //Render UI actions to add dish process
    function addDish( dish , Customer){
        //default clear current Customer
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }
        var result          = {};
        var dishId          = dish.id;
        var dishName        = dish.content.name;
        var dishPrice       = dish.content.price;
        var cust_dish       = $(
        '<tr class="orderItem">\
            <td class="orderItem_name"></td>\
            <td>$ <b class="orderItem_price"></b></td>\
            <td><b class="orderItem_qty">1</b></td>\
            <td>$<b class="orderItem_subTotal"></b></td>\
            <td class="orderItem_action">\
                <button type="button" class="glyphicon glyphicon-cog btn-warning orderItem_setting" style="width:auto"></button>\
            </td>\
        </tr>');

        result.act_msg  = "Didn't found match action for this Item, No action taken";
        dish.more  = {};
        dish.qty   = 1;
        dish.sub   = dish.qty * dishPrice;
        cust_dish.data("orderitem", dish );
        cust_dish.find(".orderItem_name").text( dishName );
        cust_dish.find(".orderItem_price, .orderItem_subTotal").text( dishPrice );

        //add side option by checking setting.side
        if( setting.side != undefined ){
            var dishPrefix = dishId.substring(0, 2);
            for( var sideName in setting.side ){
                if($.inArray( dishPrefix, setting.side[sideName] ) != -1){
                    switch( sideName ){
                        case 'lunch' : 
                            dish.more.side = "F";
                            cust_dish.find(".orderItem_action").prepend(
                                '<button type="button" class="btn-info orderItem_rice" style="width:auto">F</button>\
                                <button type="button" class="btn-info orderitem_eggroll" style="width:auto">E</button>');
                        break;
                        case 'chip' :
                            dish.more.side = "C";
                            cust_dish.find(".orderItem_action").prepend('<button type="button" class="btn-info orderItem_chip" style="width:auto">C</button>');
                        break;
                        default:
                            dish.more.side = "F";
                            cust_dish.find(".orderItem_action").prepend('<button type="button" class="btn-info orderItem_rice" style="width:auto">F</button>');
                        break;
                    }//end switch
                }//end inArray
            }//end for
        }//end if setting.side

        Customer.find(".customerOrder .cust_orderitem tbody").append( cust_dish );
        updateSummary( Customer );

        result.act_msg = "Added Order ["+ dishName +"] to <b>"+getCustomerName()+"</b>";
        result.success = true;
        $.bootstrapGrowl( '<span class="glyphicon glyphicon-plus"></span> '+result.act_msg ,{type: 'success'});
        
        return result;
    }

    function updateSummary( Customer ){
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }

        var SummaryTable    = Customer.find(".cust_summary");
        var CustomerOrders  = Customer.find(".cust_orderitem tbody .orderItem");
        var CustomerOrders_count = 0, CustomerOrders_subTotal = 0;
        $.each( CustomerOrders, function(){
            var thisQty = parseInt( $(this).find(".orderItem_qty").text() );
            var thisSub = Number(   $(this).find(".orderItem_subTotal").text() );
            if( thisQty > 0 ){
                CustomerOrders_count    += thisQty;
            }
            if( !isNaN(thisSub) ){
                CustomerOrders_subTotal += thisSub;
            }
        });

        SummaryTable.find(".cust_summary_count").text( CustomerOrders_count );
        SummaryTable.find(".cust_summary_subtotal").text( CustomerOrders_subTotal.toFixed(2) );
        SummaryTable.find(".cust_summary_tax").text( (CustomerOrders_subTotal * setting.info.tax / 100).toFixed(2) );
        SummaryTable.find(".cust_summary_total").text( (CustomerOrders_subTotal * (setting.info.tax / 100 + 1)).toFixed(2) );

        Customer.find(".cust_orderitem").trigger("update").trigger("appendCache").trigger("applyWidgets");
    }

    function clearCustomer( Customer ){
        //default clear current Customer
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }
        Customer.find("input:not(:button)").val("");
        Customer.find(".customerOrder panel-body").empty();
    }

    function removeTab_Customer( Customer){
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }
        that.find("ul.nav li a[href='#"+Customer.attr("id")+"']").closest("li").remove();
        Customer.remove();
        setDefaultActiveTab();
    }

    function addNewSuggestCustInfo( CustInfo ){
        suggestName.push(
            {
                "value" : CustInfo.name,
                "label" : CustInfo.name,
                "custId": CustInfo.custId
            }
        );

        suggestPhone.push(
            {
                "value" : CustInfo.phone,
                "label" : CustInfo.phone,
                "custId": CustInfo.custId
            }
        );

        suggestAddr.push(
            {
                "value" : CustInfo.address,
                "label" : CustInfo.address,
                "custId": CustInfo.custId
            }
        );
    }

    function initCustomerSuggestion( tx, result ){
        suggestName = [];
        suggestPhone= [];
        suggestAddr = [];

        for (i = 0; i < result.rows.length; i++) {
            var CustInfo        = {};
            var customer        = result.rows.item(i);
            CustInfo.custId     = customer.id;
            CustInfo.name       = customer.name;
            CustInfo.phone      = customer.phone;
            CustInfo.address    = customer.address;
            addNewSuggestCustInfo( CustInfo );
        }
        refreshSuggestionList();
    }

    function refreshSuggestionList(){
        $("input.custName").autocomplete({
            source  : suggestName,
            focus   : function( event, ui ) {
                $(this).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                $(this).val( ui.item.label );
                return false;
            }
        });

        $("input.custPhone").autocomplete({
            source  : suggestPhone,
            focus   : function( event, ui ) {
                $(this).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                $(this).val( ui.item.label );
                var cust_summary = $(this).closest(".cust_summary");
                cust_summary.data("existedCustomerId",ui.item.custId );
                fillCustInfo( ui.item.custId );
                return false;
            }
        });

        $("input.custAddress").autocomplete({
            source  : suggestAddr,
            focus   : function( event, ui ) {
                $(this).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                $(this).val( ui.item.label );
                var cust_summary = $(this).closest(".cust_summary");
                cust_summary.data("existedCustomerId",ui.item.custId );
                fillCustInfo( ui.item.custId );
                return false;
            }
        });
    }

    function fillCustInfo( custId, Customer ){
        if( Customer ==  undefined){
            var Customer = getCurrentCustomer();
        }

        $.each( suggestName, function(){
            if( this.custId == custId ){
                Customer.find(".custName").val( this.value );
            }
        });

        $.each( suggestPhone, function(){
            if( this.custId == custId ){
                Customer.find(".custPhone").val( this.value );
            }
        });

        $.each( suggestAddr, function(){
            if( this.custId == custId ){
                Customer.find(".custAddress").val( this.value );
            }
        });
    }

    function onSuccessCreateCustInfo( tx, result ){
        //continue to save order after instered to custInfo
        websql.createOrderSummary( 
            Collection.OrderSummary.subtotal, 
            Collection.OrderSummary.count, 
            result.insertId, 
            onSuccessCreateOrderSummary );

        var CustInfo        = {};
        CustInfo.custId     = result.insertId;
        CustInfo.name       = Collection.Customer.name;
        CustInfo.phone      = Collection.Customer.phone;
        CustInfo.address    = Collection.Customer.address;
        addNewSuggestCustInfo( CustInfo );
        refreshSuggestionList();
    }

    function onSuccessCreateOrderSummary( tx, result ){
        //continue to save order after instered to custInfo
        sqlCounter = Collection.OrderCollection.length;
        $.each( Collection.OrderCollection , function(){
            var itemId          = this.id;
            var qty             = this.qty;
            var additationInfo  = {};

            if( this.more != undefined ){
                additationInfo = this.more;
            }

            websql.createOrderDetail( result.insertId , itemId, qty, additationInfo, onSuccessCreateOrderDetail );
        });//end each
        
    }

    function onSuccessCreateOrderDetail(  tx, result ){
        sqlCounter --;
        if( sqlCounter == 0 ){
            var dayCnt     = parseInt($("#daily_cust_cnt").text()) + 1 ;
            var dayTotal   = (Number($("#daily_bill_total").text()) + Number(Collection.OrderSummary.total)).toFixed(2);
            $("#daily_cust_cnt").text( dayCnt );
            $("#daily_bill_total").text( dayTotal  );
            Collection = {};
            removeTab_Customer();
            addTab_Customer();
            $.bootstrapGrowl( '<span class="glyphicon glyphicon-floppy-save"></span> Order Confirmed');//end growl
        }
    }


    function attachHandler(){
        myModal   = $('#myModal').clone();

        $(document).on("click",".getGoogleMap",function(){
            if (navigator.onLine) {
                var addressTxt = $.trim( $(this).siblings(".custAddress").val() );
                if( addressTxt.length ){
                    window.open( "http://maps.google.com/?q="+addressTxt + " "+setting.info.zip, "_blank" );
                }else{
                    $.bootstrapGrowl( "Type a address before search" , { type: 'error'});
                }
            }else{
                $.bootstrapGrowl( "No network connection, can't go to Google Map!" , { type: 'error'});
            }
        });

        $(document).on("click",".googlePhone",function(){
            if (navigator.onLine) {
                var phone = $.trim( $(this).siblings(".custPhone").val() );
                if( phone.length ){
                    window.open( "http://google.com/#q="+phone, "_blank" );
                }else{
                    $.bootstrapGrowl( "Type a phone number before search" , { type: 'error'});
                }
            }else{
                $.bootstrapGrowl( "No network connection, can't go to Google!" , { type: 'error'});
            }
        });

        $(document).on("click",".orderItem_rice",function(){
            var orderItem = $(this).closest(".orderItem").data("orderitem");
            if( $(this).text() == "F"){
                orderItem.more.side = "S";
                $(this).text("S");
            }else{
                orderItem.more.side = "F";
                $(this).text("F");
            }
            $(this).closest(".orderItem").data("orderitem" , orderItem );
        });

        $(document).on("click",".action-confirm",function(){
            var thisCust        = getCurrentCustomer();
            if( thisCust.find(".orderItem").length ){
                myModal.find(".modal-title").empty().text("Submit Order");
                myModal.find(".modal-body").empty().append(thisCust.find(".customerOrder:first").clone());
                myModal.modal('show');

                $(document).off("click",".modal_confirm");
                $(document).on('click', '.modal_confirm', function () {
                            var Orders     = [];

                            $.each( thisCust.find(".customerOrder .orderItem"), function(){
                                Orders.push( $(this).data("orderitem") );
                            });
                            Collection = {
                                "Customer" : {
                                    "custId"    : thisCust.find(".cust_summary").data("existedCustomerId"),
                                    "name"      : thisCust.find(".custName").val(),
                                    "phone"     : thisCust.find(".custPhone").val(),
                                    "address"   : thisCust.find(".custAddress").val()
                                },
                                "OrderSummary" : {
                                    "count"     : thisCust.find(".cust_summary_count").text(),
                                    "subtotal"  : thisCust.find(".cust_summary_subtotal").text(),
                                    "total"     : thisCust.find(".cust_summary_total").text()
                                },
                                "OrderCollection"   : Orders
                            };
                            //default Collection.Customer.custId is null 
                            if( Collection.Customer.custId == undefined || Collection.Customer.custId < 1 ){
                                Collection.Customer.custId = null;
                            }

                            if( Collection.Customer.custId == null &&
                                (  Collection.Customer.name.length 
                                || Collection.Customer.phone.length 
                                || Collection.Customer.address.length) ){
                                websql.createCustInfo( Collection.Customer.name, Collection.Customer.phone, Collection.Customer.address, onSuccessCreateCustInfo );
                            }else{
                                websql.createOrderSummary( Collection.OrderSummary.subtotal, Collection.OrderSummary.count, Collection.Customer.custId, onSuccessCreateOrderSummary );
                            }

                            //console.log( Collection );
                            myModal.modal('hide');
                        });//end modal
            }else{
                alert("This Customer havn't place any order yet.");
            }
        });

        $(document).on("click",".orderItem_setting",function(){
            var thisRow         = $(this).closest(".orderItem");
            var orderItem       = thisRow.data("orderitem");

            //more is preperty to store notes & side & other additional info
            if( orderItem.more.note == undefined ){
                orderItem.more.note = "";
            }
            var modalDetail     = $(
                '<table class="table table-hover">\
                    <tr class="row">\
                        <td class="h4">'+orderItem.content.name+'</td>\
                        <td>\
                            <button type="button" class="removeItem btn-danger">Remove This Item</button>\
                        </td>\
                    </tr>\
                    <tr class="row">\
                        <td>Qty</td>\
                        <td class="col-md-4">\
                            <input type="Number" class="itemQty form-control" data-min="1" value="'+orderItem.qty+'">\
                        </td>\
                    </tr>\
                    <tr class="row">\
                        <td>Price Adjustment</td>\
                        <td class="col-md-4">\
                            <div class="input-group">\
                                <span class="input-group-addon">$</span>\
                                <input type="Number" class="itemAdjPrice form-control" value="'+orderItem.adj+'">\
                            </div>\
                        </td>\
                    </tr>\
                    <tr class="row">\
                        <td colspan="2"><textarea class="itemNote form-control" rows="3" placeholder="Type notes here">'+orderItem.more.note+'</textarea></td>\
                    </tr>\
                </table>'
            );
            myModal.find(".modal-title").empty().text("Order Detail");
            myModal.find(".modal-body").empty().append( modalDetail );
            myModal.find(".removeItem").on("click",function(){
                thisRow.remove();
                $.bootstrapGrowl( '<span class="glyphicon glyphicon-trash"></span> Order Cancelled' );
                myModal.modal('hide');
                updateSummary();
            });//end removeItem click

            myModal.modal('show');
            $(document).off("click",".modal_confirm");
            $(document).on('click', '.modal_confirm', function () {
                        var newQty      = parseInt(myModal.find(".itemQty").val());
                        var newAdjPrice = Number(myModal.find(".itemAdjPrice").val());
                        var newNote     = myModal.find(".itemNote").val();
                        if( newQty > 0 ){
                            orderItem.qty = newQty;
                        }

                        if( !isNaN( newAdjPrice )){
                            orderItem.adj = newAdjPrice;
                        }

                        if( newNote.length ){
                            orderItem.more.note = newNote;
                        }

                        orderItem.sub = orderItem.content.price * orderItem.qty + newAdjPrice;
                        thisRow.find(".orderItem_subTotal").text( orderItem.sub );
                        thisRow.find(".orderItem_qty").text( orderItem.qty );
                        thisRow.data("orderitem", orderItem);
                        
                        updateSummary();
                        myModal.modal('hide');
                        $.bootstrapGrowl( '<span class="glyphicon glyphicon-ok-circle"></span> Order Changed',{type: 'success'});
                    });//end modal
        });

        $(document).on("input","input.custName",function(){
            var thisCust = getCurrentCustomer();
            thisCust.find(".label_custName").text($(this).val());
        });
    }
}( jQuery ));
console.log("customer loaded");