;(function( $ ) {
 	var setting = $().POSsetting();

    $.fn.POSwebsql = function() {
    	
    	var myDB = init_DB(); 
    	//clearDB();
	 	var functions = {
	 		"resetDB" 			: clearDB,
	 		"onError"			: myDB.onError,
	 		"createCustInfo" 	: createCustInfo,
	 		"createOrderSummary" : createOrderSummary,
	 		"createOrderDetail" : createOrderDetail,
	 		"getOverViewByDate" : getOverViewByDate,
	 		"getOrderDetail" 	: getOrderDetail,
	 		"getItemOverView" 	: getItemOverView,
	 		"removeOrder" 		: removeOrderDetail,
	 		"removeCustInfo"	: removeCustInfo,
	 		"getCustInfo"		: getCustInfo,
	 		"editCustInfo"		: editCustInfo
	 	};//End of functions

		return functions;

		function init_DB(){
			if (window.openDatabase) {
				var websqlDB 		= openDatabase("myPOS", "1.0", "This DB is designed to storage sales record as little as possiable", 100 * 1024 * 1024);
				websqlDB.onError 	= function(tx, e) {
					e.sql = tx;
				  	alert("There has been an error in WebSql: " + e.message);
				  	console.log(e);
				  	return null;
				}
				websqlDB.onSuccess = function(tx, r) {
					console.log(r);
				}
				
				websqlDB.transaction( function(tx){
					tx.executeSql(
						"CREATE TABLE IF NOT EXISTS custInfo		\
						(											\
							id INTEGER PRIMARY KEY ASC				\
							,name VARCHAR(250)  NULL 				\
							,phone VARCHAR(250)  NULL 				\
							,address VARCHAR(250)  NULL 			\
							,stamp DATETIME  NULL 					\
							DEFAULT (datetime('now','localtime'))   \
						);											\
					",[],websqlDB.onSuccess, websqlDB.onError );

					tx.executeSql(
						"CREATE TABLE IF NOT EXISTS OrderSummary 	\
						(											\
							id INTEGER PRIMARY KEY ASC 				\
							,stamp DATETIME NOT NULL 				\
							DEFAULT (datetime('now','localtime'))   \
							,total DECIMAL(0, 0)  NULL 				\
							,orderQty INT  							\
							,custId INT  NULL 						\
							,FOREIGN KEY (custId) 					\
							REFERENCES custInfo(id) 				\
						);											\
					",[],websqlDB.onSuccess, websqlDB.onError );

					tx.executeSql(
						"CREATE TABLE IF NOT EXISTS orderDetail		\
						(											\
							orderId INT  NULL 						\
							,itemId VARCHAR(250)  NULL 				\
							,qty INT  NULL 							\
							,additationInfo VARCHAR(250)  NULL 		\
							,FOREIGN KEY (orderId) 					\
							REFERENCES OrderSummary(id) 			\
						);											\
					",[],websqlDB.onSuccess, websqlDB.onError );
				});

				return websqlDB;
			}else{
				$("body").empty().append(
					'<center><h1>Your browser doesn\'t support WebSql</h1>\
					<p>We recomend you use chrome instead</p>\
					<a class="h1 text-info" href="https://www.google.com/intl/en-US/chrome/browser/">Download Chrome Here</a></center>');
				alert("WebSQL is not supported by your browser!");
				return null;
			}
		}

		function clearDB(){
			myDB.transaction( function(tx){
				tx.executeSql( "DROP TABLE custInfo ;"		,[],myDB.onSuccess, myDB.onError );
				tx.executeSql( "DROP TABLE OrderSummary ;"	,[],myDB.onSuccess, myDB.onError );
				tx.executeSql( "DROP TABLE orderDetail ;"	,[],myDB.onSuccess, myDB.onError );
			});
			myDB = init_DB();
		}

		function createCustInfo( name , phone, address, onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql("INSERT INTO custInfo ( name, phone, address ) VALUES ( ?,?,?);"
	                	, [ name , phone, address]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		//save summary
		function createOrderSummary( subtotal, count, custId, onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql("INSERT INTO OrderSummary ( total, orderQty, custId ) VALUES ( ?,?,?);"
	                	, [ subtotal, count, custId ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		//excrat & save order detail
		function createOrderDetail( orderSummaryId , itemId, qty, additationInfo, onSuccess ){
			if( myDB != null ){
				myDB.transaction( function(t) {
	                t.executeSql( 
	                	"INSERT INTO orderDetail ( orderId, itemId, qty, additationInfo ) VALUES ( ?,?,?,?);"
	                	, [ orderSummaryId , itemId, qty, JSON.stringify(additationInfo) ]
	                	, onSuccess
	                	, myDB.onError);//end excu
			    });//end transaction
			}//end if
		}//end OrderDetail

		//reuturn between date records, 
		//Important: NOT include endDate records
		function getOverViewByDate( startDate, endDate, onSuccess, onError ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "SELECT S.id, S.orderQty, S.total, S.custId, time( S.stamp) AS stamp, C.name, C.phone, C.address \
	                FROM OrderSummary AS S					 \
	                LEFT JOIN custInfo AS C 				 \
	                	ON S.custId = C.id 					 \
	               	WHERE S.stamp BETWEEN ? AND ? "	
	                	, [ startDate , endDate ]
	                	, onSuccess
	                	, onError );
	            });
			}
		}

		function getCustInfo( id, onSuccess, onError ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "SELECT * FROM custInfo WHERE (? IS NULL) OR (ID = ?) "	
	                	, [ id, id ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		function getOrderDetail( orderId , onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "SELECT * FROM orderDetail WHERE orderId = ? "	
	                	, [ orderId ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		function getItemOverView( startDate, endDate , onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "SELECT D.itemId, SUM( D.qty ) AS qtyTotal \
	                FROM orderDetail AS D 						\
	                LEFT JOIN OrderSummary AS S 				\
	                	ON D.orderId = S.id 					\
	                WHERE S.stamp BETWEEN ? AND ? 				\
	                GROUP BY D.itemId"	
	                	, [ startDate , endDate ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		function removeOrderDetail( orderId, onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "DELETE FROM orderDetail WHERE orderId = ? "	
	                	, [ orderId ]
	                	, function(tx, r){
	                		removeOrderSummry( orderId, onSuccess);
	                	}
	                	, myDB.onError );
	            });
			}
		}

		function removeOrderSummry( orderId, onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "DELETE FROM OrderSummary WHERE id = ? "	
	                	, [ orderId ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		function removeCustInfo( custId, onSuccess ){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "DELETE FROM custInfo WHERE id = ? "	
	                	, [ custId ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}

		function editCustInfo( custId, name, phone, address, onSuccess){
			if( myDB != null ){
				myDB.transaction(function(t) {
	                t.executeSql(
	                "UPDATE custInfo 	\
	                SET name = ? ,		\
	                	phone = ? ,		\
	                	address = ?		\
	                WHERE id = ? "	
	                	, [ name, phone, address, custId ]
	                	, onSuccess
	                	, myDB.onError );
	            });
			}
		}
    }
//dish.content.eng


}( jQuery ));