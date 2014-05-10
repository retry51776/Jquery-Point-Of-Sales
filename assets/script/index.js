$(function(){
	try{
		var flashMsg 	= localStorage.getItem("flashMsg");

		//flash Msg store in localstorage.flashMsg
		if( flashMsg != undefined && flashMsg.length){
			$.bootstrapGrowl( flashMsg,{type: 'error'});
			localStorage.setItem("flashMsg","");
		}

		if( ! $().POSsetting ){
			$.bootstrapGrowl("Init jquery error: setting.js didn't loaded",{type: 'error'});
		}

		if( ! $().POScustomer ){
			$.bootstrapGrowl("Init jquery error: customer.js didn't loaded",{type: 'error'});
		}

		if( ! $().POSmenu ){
			$.bootstrapGrowl("Init jquery error: menu.js didn't loaded",{type: 'error'});
		}

		var setting 	= $().POSsetting();
		var websql 		= $().POSwebsql();
		var customer 	= $( "#UI-customer" ).POScustomer();
		var menu 		= $( "#UI-menu" ).POSmenu();
		
		initialized( setting.info );
		attachHandler();

	  	//info: [obj] 
		//load bussiness info into prepared setted html Doms
		function initialized( info ){
			$.each( info , function( key , value ){
				if( $(".bussiness-"+key ).length ){
					$(".bussiness-"+key ).empty().append( value );
				}//End of if
			});//End of each info pro
			var menu_panel = $('#UI-menu .panel-body');
			menu_panel.css('height', ($( window ).height() - menu_panel.offset().top - 10 )+'px');
			setTimeout(function() {
				if( $(".tour-backdrop.in").length == 0){
					$("#demo-tour").hide()
				}
			}, 1000 * 60 * 5);
		}//end initialized

		//attach custom event handler
		function attachHandler(){
			//Event Handler: when user choose menu
			//1. use itemId to get OrderItem detail
			//2. call customer handler addOrder( orderItem )
			$(document).on("click", ".dish", function(){
				var result = customer.selectMenu( $(this).data("item") );
			});

			//attach Your other custome type hanlder here
			$(document).on("click", ".extraName, .extra img", function(){
				var thisTr 	= $(this).closest("tr");
				var item 	= thisTr.data("item");
				var result 	= customer.selectMenu( item );
			});

			$("#demo-tour").tour({
				items : [
				      {
				        title: "Header Page",
				        content: "<p>You can <b>add</b> and <b>edit</b> these context in /assets/script/setting.js variable <b>setting.info</b><p>\
				        		Just create property in setting.info, then add HTML element in index.html with class=\"bussiness-[property name]\"",
				        id: ".bussiness",
				        placement: "bottom",
				        onShow : function(){
				        	$(".menu_clearSearch").trigger("click");
				        }
				      },
				      {
				        title: "Menu Tab",
				        content: "Here is menu module, all codes control this module is in /assets/script/menu/menu.js",
				        id: "#UI-menu",
				        placement: "top"
				      },
				      {
				        title: "Current Category Label",
				        content: "This is showing the Current Category|Menu",
				        id: ".menu_disLabel",
				        placement: "right"
				      },
				      {
				        title: "Result Count Label",
				        content: "Display How Many items the Current Category|Menu have",
				        id: ".menu_cnt",
				        placement: "left"
				      },
				      {
				        title: "Text Filter",
				        content: "Display ANY Category & items that have these key word",
				        id: ".menu_searchItem",
				        placement: "top",
				        onShown : function(){
				        	var keyword = ["d","do","don","donut"];
				        	$(keyword).each(function(index){
				        		var w = this;
				        		setTimeout(function() {
				        			$(".menu_searchItem").val( w ).trigger("input");
								}, index * 100);//end timeout
				        	});//end each
				        }
				      },
				      {
				        title: "Return Main Menu",
				        content: "Click this button to return default Menu",
				        id: ".menu_clearSearch",
				        placement: "top",
				        onShow : function(){
				        	$(".menu_clearSearch").trigger("click");
				        }
				      },
				      {
				        title: "Category",
				        content: "This is a Category button, click it to look for items within this Category.",
				        id: ".label_category",
				        placement: "top",
				      },
				      {
				        title: "Items",
				        content: "This is a item within selected Category. <b>Click</b> item to add to customer cart.",
				        id: "tr.dish td",
				        placement: "top",
				        onShow : function(){
				        	if( !$(".category").length){
				        		$(".menu_clearSearch").trigger("click");
				        	}
				        	$(".category").trigger("click");
				        }
				      },
				      {
				        title: "Notification",
				        content: "When you added item to cart, there is a green notification",
				        id: ".bootstrap-growl.alert",
				        placement: "bottom",
				        onShow : function(){
				        	$(".dish:first").trigger("click");
				        }
				      },
				      {
				        title: "Customer Tab",
				        content: "This is Customer module, all codes control this module is in /assets/script/customer/customer.js",
				        id: "#UI-customer",
				        placement: "top"
				      },
				      {
				        title: "Current Customer",
				        content: "This is Current Customer Tab, Click other Customer Tabs to switch between different customers",
				        id: "#UI-customer .nav-tabs li.active a",
				        placement: "bottom",
				      },
				      {
				        title: "Customer Info",
				        content: "Enter Customer Info, there will be auto suggestion from existed Customer Database.<br>\
				         Use <b>Phone</b> or <b>Address</b> to selecte existed customer",
				        id: "#UI-customer .custInfo.active .cust_summary .span7",
				        placement: "top",
				        onShown : function(){
				        	$('#UI-customer .custInfo.active .cust_summary .span7 .custName').autocomplete("search");
				        }
				      },
				      {
				        title: "Google phone number",
				        content: "Click the icon to search Phone Number in google",
				        id: "#UI-customer .custInfo.active .cust_summary .googlePhone",
				        placement: "bottom"
				      },
				      {
				        title: "Google Map",
				        content: "Click the icon to get direction in Google Map",
				        id: "#UI-customer .custInfo.active .cust_summary .getGoogleMap",
				        placement: "bottom"
				      },
				      {
				        title: "Customer Bill",
				        content: "Here is Bill Summary for this customer",
				        id: "#UI-customer .custInfo.active .cust_summary .span5",
				        placement: "top",
				      },
				      {
				        title: "Order Cart",
				        content: "Here is order cart of this customer",
				        id: "#UI-customer .custInfo.active .customerOrder",
				        placement: "top",
				      },
				      {
				        title: "Order Item",
				        content: "Here is one of item this customer order",
				        id: "#UI-customer .custInfo.active .customerOrder .orderItem td",
				        placement: "top",
				      },
				      {
				        title: "Item Action",
				        content: "<p>Here is all the actions avaiable for this item.</p><p>Click the <b>yellow</b> action icon to change this item.</p>",
				        id: "#UI-customer .custInfo.active .customerOrder .orderItem td .orderItem_setting",
				        placement: "bottom",
				      },
				      {
				        title: "Open Action Panel",
				        content: "This is Action Panel for that Item",
				        id: "#myModal",
				        placement: "top",
				        onShow: function(){
				        	$("#UI-customer .custInfo.active .customerOrder .orderItem td .orderItem_setting:first").trigger("click");
				        }
				      },
				      {
				        title: "Close Action Panel",
				        content: "Click Cancel or Confirm when you are done",
				        id: "#myModal .modal-header button.close",
				        placement: "right",
				        onShown: function(){
				        	setTimeout(function () {
				        		$(".modal-header .close").trigger("click");
				        	}, 2000);
				        }
				      },
				      {
				        title: "Confirm Order",
				        content: "When customer ready, click it to save customer order",
				        id: "#UI-customer .custInfo.active .action-confirm",
				        placement: "bottom"
				      },
				      {
				        title: "Reports",
				        content: "Choose the report you want, or go to manager customer page to update/search/remove customer info",
				        id: ".reports",
				        placement: "bottom"
				      },
				      {
				        title: "Contact Me?",
				        content: '<p>You could go to <a href="http://www.terrystuffs.com" target="_blank">www.terrystuffs.com</a> to find my Contact Info</p>',
				        id: "#demo-tour",
				        placement: "bottom"
				      }
				]
			});
		}//end attachHandler
	}catch(erro){
		console.log(erro.stack);
		localStorage.setItem("flashMsg", "Page Reloaded due to Javascript Erro<hr>Last Erro Message<br>: "+erro.message );
		setTimeout(function() {
			location.reload();
		}, 5000);
	}//end catch
	
});
console.log("default js loaded");