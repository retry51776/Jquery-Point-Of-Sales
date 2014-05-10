$(function(){
	var websql 		= $().POSwebsql();
	var setting 	= $().POSsetting();
	var custInfoTbl = $("#table_custInfo");
    var deleteTr    = null;
    var editTr      = null;
    
    attachHandler();
	websql.getCustInfo( null, onSuccessGetCustInfo );

	function onSuccessGetCustInfo( tx, result){
		for (i = 0; i < result.rows.length; i++) {
            var customer        = result.rows.item(i);
            var Tr 				= $(
            	'<tr>\
               		<td class="id"></td>\
            		<td class="stamp"></td>\
            		<td><span class="name"></span></td>\
            		<td><span class="phone"></span></td>\
            		<td><span class="address"></span></td>\
            		<td>\
            			<button class="editCustomer btn-info">Edit</button>\
            			<button class="removeCustomer btn-danger">Remove</button>\
            		</td>\
            	</tr>');
            setting.setTextByClass( customer, Tr);
            custInfoTbl.append(Tr);
        }
        custInfoTbl.tablesorter();
        $(".custCntLabel").text( result.rows.length );
	}


    function onSuccessRemoveCustInfo( tx, result){
        deleteTr.remove();
        $(".custCntLabel").text( custInfoTbl.find("tbody tr").length );
        $.bootstrapGrowl( '<span class="glyphicon glyphicon-trash"></span> Customer Removed' );
    }

    function onSuccessEditCustInfo( tx, result){
        var thisTr       = editTr;
        var inputName    = thisTr.find(".editName");
        var inputPhone   = thisTr.find(".editPhone");
        var inputAddress = thisTr.find(".editAddress");
        var inputSave    = thisTr.find(".saveCustomer");

        thisTr.find(".name").show().text( inputName.val() );
        thisTr.find(".phone").show().text( inputPhone.val() );
        thisTr.find(".address").show().text( inputAddress.val() );
        thisTr.find(".editCustomer").show();

        inputName.remove();
        inputPhone.remove();
        inputAddress.remove();
        inputSave.remove();
    }

	function attachHandler(){
		$(document).on("click", ".removeCustomer", function(){
            deleteTr = $(this).closest("tr");
            var deleteModal = $(
            '<div class="modal fade" id="myModal">  \
                <div class="modal-content">         \
                    <div class="modal-header">      \
                        <button type="button" class="close" data-dismiss="modal">&times;</button> \
                        <h4 class="modal-title">Delete Customer</h4>   \
                    </div>                              \
                    <div class="modal-body"></div>      \
                    <div class="modal-footer">          \
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>  \
                        <button type="button" class="btn btn-primary modal_confirm" data-dismiss="modal">Confirm</button>       \
                    </div>  \
                </div>      \
            </div>');
            $(deleteModal).modal('show');
            $(document).off("click",".modal_confirm");
            $(document).on("click",".modal_confirm",function(){
                websql.removeCustInfo( deleteTr.find(".id").text(), onSuccessRemoveCustInfo );
            });
		});

        $(document).on("click", ".editCustomer", function(){
            var thisTr      = $(this).closest("tr");
            var thisName    = thisTr.find(".name");
            var thisPhone   = thisTr.find(".phone");
            var thisAddress = thisTr.find(".address");

            thisName.hide().after($('<input type="text" class="editName">').val(thisName.text()));
            thisPhone.hide().after($('<input type="text" class="editPhone">').val(thisPhone.text()));
            thisAddress.hide().after($('<input type="text" class="editAddress">').val(thisAddress.text()));

            $(this).hide().after('<button type="button" class="saveCustomer btn-success">Save Changes</button>');

        });

        $(document).on("click", ".saveCustomer", function(){
            editTr          = $(this).closest("tr");
            var custId      = editTr.find(".id").text();
            var editName    = editTr.find(".editName").val();
            var editPhone   = editTr.find(".editPhone").val();
            var editAddress = editTr.find(".editAddress").val();
            console.log(custId);
            websql.editCustInfo( custId, editName, editPhone, editAddress, onSuccessEditCustInfo );
        });

        $(document).on("input", "#textFilter", function(){
            var searchTxt = $.trim( $(this).val() ).toLowerCase();
            if( searchTxt.length ){
                custInfoTbl.find("tbody tr").each(function(){
                    if( $(this).text().toLowerCase().indexOf( searchTxt ) == -1 ){
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                });
            }else{
                custInfoTbl.find("tbody tr").show();
            }
        });
	}
});