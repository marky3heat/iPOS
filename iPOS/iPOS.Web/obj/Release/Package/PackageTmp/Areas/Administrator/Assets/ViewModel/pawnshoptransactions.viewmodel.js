app.vm = (function () {
    //"use strict";
    var model = new app.createModeModel();
    var customerModel = new app.createCustomerModel();

    // #region CONTROLS                
    var isListShowed = ko.observable(true);
    var isCreateModeShowedSales = ko.observable(false);
    var isCreateModeShowedPawning = ko.observable(false);
    var isCreateModeShowedLayaway = ko.observable(false);

    var isSaveButtonShowed = ko.observable(false);
    var saveButtonCaption = ko.observable("");

    var itemType = ko.observableArray();
    var itemCategory = ko.observableArray();
    var customer = ko.observableArray();
    var isJewelry = ko.observable(true);

    // #endregion

    // #region BEHAVIORS
    // initializers
    function activate() {
        hideSidebar();
        setInitialDate();
        loadTransactionList();
    }

    function loadTransactionList() {
        $("#transactionTable").dataTable().fnDestroy();
        $('#transactionTable').DataTable({
            "ajax": {
                "url": RootUrl + "/Administrator/PawnshopTransactions/GetTransactions",
                "type": "GET",
                "datatype": "json"
            },
            "order": [[2, "desc"]],
            "columns": [
                { "data": "TransactionNo", "className": "text-left" },
                {
                    "data": "TransactionDate",
                    "className": "text-left",
                    "render": function(data, type, row) {
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(row.TransactionDate);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                    }
                },
                { "data": "TransactionType", "className": "text-left" },
                { "data": "Status", "className": "text-left" },
                {
                    "render": function () {
                        return '<ul class="icons-list text-center">' +
                            '<li class="dropdown">' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>' +
                            '<ul class="dropdown-menu dropdown-menu-right">' +
                            '<li><a href="#"><i class="icon-file-stats"></i> View transaction</a></li>' +
                            '<li><a href="#"><i class="icon-file-stats"></i> Print</a></li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>';
                    }
                },
                { "data": "TransactionId", "className": "hide" },{ "data": "TransactionId", "className": "hide" }
            ]
        });
    }

    function clearControls() {
        model.TransactionId("");
        model.TransactionNo("");
        model.TransactionDate("");
        model.TransactionType("");
        model.CustomerId("");
        model.Terminal("");
        model.Status("");
        model.ReviewedBy("");
        model.ApprovedBy("");
        model.CreatedBy("");
        model.CreatedAt("");

        model.first_name("");
        model.last_name("");
        model.st_address("");
        model.mobile_no("");

        model.ItemName("");
        model.ItemTypeId("");
        model.ItemCategoryId("");
        model.Remarks("");

        customerModel.first_name("");
        customerModel.last_name("");
        customerModel.middle_name("");
        customerModel.st_address("");
        customerModel.mobile_no("");
    }

    function showCreateModeSales() {
        getServerDate();
        getTransactionNo();
        getItemType();
        getCustomer();

        isListShowed(false);
        isCreateModeShowedSales(true);
        isCreateModeShowedPawning(false);
        isCreateModeShowedLayaway(false);

        isSaveButtonShowed(true);
        saveButtonCaption("Save");
    }
    function showCreateModePawning() {
        getServerDate();
        getTransactionNo();
        getItemType();
        getCustomer();

        isListShowed(false);
        isCreateModeShowedSales(false);
        isCreateModeShowedPawning(true);
        isCreateModeShowedLayaway(false);

        isSaveButtonShowed(true);
        saveButtonCaption("Save");
    }
    function showCreateModeLayaway() {
        getServerDate();
        getTransactionNo();
        getItemType();
        getCustomer();

        isListShowed(false);
        isCreateModeShowedSales(false);
        isCreateModeShowedPawning(false);
        isCreateModeShowedLayaway(true);

        isSaveButtonShowed(true);
        saveButtonCaption("Save");
    }

    function viewItem(arg) {
        loaderApp.showPleaseWait();

        loaderApp.hidePleaseWait();
    }

    function backToList() {
        loadTransactionList();
        isListShowed(true);
        isCreateModeShowedSales(false);
        isCreateModeShowedPawning(false);
        isCreateModeShowedLayaway(false);

        isSaveButtonShowed(false);
    }

    function saveTransactionPawn() {

        /*VALIDATIONS -START*/
        //if (appraisedItem.AppraiseDate().trim() === "") {
        //    toastr.error("Date is required.");
        //    appraisedItem.AppraiseDate("");
        //    document.getElementById("AppraiseDate").focus();
        //    return false;
        //}

        /*VALIDATIONS -END*/

        model.first_name(customerModel.first_name);
        model.last_name(customerModel.last_name)
        model.ItemCategoryId(isJewelry.itemTypeId)

        loaderApp.showPleaseWait();
        var param = ko.toJS(model);
        var url = RootUrl + "/Administrator/PawnshopTransactions/SaveTransactionPawning";
        $.ajax({
            type: 'POST',
            url: url,
            data: ko.utils.stringifyJson(param),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.success) {
                    swal("Success", result.message, "success");

                    backToList();

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");

                    clearControls();
                    backToList();
                }
            }
        });
    }

    function getCustomer() {
        $.getJSON(RootUrl + "/Administrator/Base/GetCustomer", function (result) {
            customer.removeAll();
            customer(result);
        });
    }
    function saveCustomer(firstname, lastname, middlename, address, contactno) {
        /*VALIDATIONS -START*/

        customerModel.first_name(firstname);
        customerModel.last_name(lastname);
        customerModel.middle_name(middlename);
        customerModel.st_address(address);
        customerModel.mobile_no(contactno);

        /*VALIDATIONS -END*/
        debugger;
        loaderApp.showPleaseWait();
        var param = ko.toJS(customerModel);
        var url = RootUrl + "/Administrator/Base/SaveCustomer";
        $.ajax({
            type: 'POST',
            url: url,
            data: ko.utils.stringifyJson(param),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.success) {
                    swal("Success", result.message, "success");
                    getCustomer();

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");

                    clearControls();
                }
            }
        });
    }

    function getCustomerById() {
        var CustomerId = $('#CustomerId').val();
        $.getJSON(RootUrl + "/Administrator/Pawning/GetCustomerById?CustomerId=" + CustomerId, function (result) {
            customerModel.autonum(result.autonum);
            customerModel.first_name(result.first_name);
            customerModel.last_name(result.last_name);
            customerModel.middle_name(result.middle_name);
            customerModel.st_address(result.st_address);
            customerModel.mobile_no(result.mobile_no);
        });
    }

    function getItemType() {
        $.getJSON(RootUrl + "/Administrator/Base/GetItemType", function (result) {
            itemType.removeAll();
            itemType(result);
        });
    }
    function getItemCategory(arg) {
        var itemTypeId = "";
        if (arg !== "") {
            itemTypeId = arg;
        } else {
            itemTypeId = model.ItemTypeId(isJewelry.itemTypeId);
        }

        if (itemTypeId !== "") {
            $.getJSON(RootUrl + "/Administrator/Base/GetItemCategory?ItemTypeId=" + itemTypeId, function (result) {
                itemCategory.removeAll();
                itemCategory(result);
            });
        }
    }

    function setInitialDate() {
        $('.daterange-single').daterangepicker({
            singleDatePicker: true
        });
    }

    function getServerDate() {
        $.getJSON(RootUrl + "/Administrator/Base/GetServerDate", function (result) {
            model.TransactionDate(result);
        });
    }

    function getTransactionNo() {
        $.getJSON(RootUrl + "/Administrator/PawnshopTransactions/GetTransactionNo", function (result) {
            model.TransactionNo(result);
        });
    }
    
    function hideSidebar() {
        $('#hide-sidebar').trigger('click');
    };

    // #endregion

    var vm = {
        activate: activate,
        isListShowed: isListShowed,
        isCreateModeShowedSales: isCreateModeShowedSales,
        isCreateModeShowedPawning: isCreateModeShowedPawning,
        isCreateModeShowedLayaway: isCreateModeShowedLayaway,

        showCreateModeSales: showCreateModeSales,
        showCreateModePawning: showCreateModePawning,
        showCreateModeLayaway: showCreateModeLayaway,

        backToList: backToList,
        saveButtonCaption: saveButtonCaption,
        isSaveButtonShowed: isSaveButtonShowed,
        saveTransactionPawn: saveTransactionPawn,

        model: model,
        customerModel: customerModel,

        getItemType: getItemType,
        getItemCategory: getItemCategory,

        itemType: itemType,
        itemCategory: itemCategory,

        customer: customer,
        saveCustomer: saveCustomer,
        getCustomerById: getCustomerById,

        isJewelry: isJewelry

    };

    var self = this;

    self.isSubmiting = ko.observable(false);

    self.clickFunc = function () {
        if (!self.isSubmiting()) {
            self.isSubmiting(true);
        }
    }

    return vm;

})();
$(function () {
    "use strict";

    app.vm.activate();
    
    // Custom bootbox dialog
    $('#select_transaction').on('click', function () {
        bootbox.dialog({
            message: "Please select a transaction.",
            title: "Transactions",
            buttons: {
                success: {
                    label: "Sale",
                    className: "btn-success",
                    callback: function () {
                        app.vm.showCreateModeSales();
                    }
                },
                danger: {
                    label: "Pawn",
                    className: "btn-danger",
                    callback: function () {
                        app.vm.showCreateModePawning();
                    }
                },
                main: {
                    label: "Lay-away",
                    className: "btn-warning",
                    callback: function () {
                        app.vm.showCreateModeLayaway();
                    }
                }
            }
        });
    });

    // Custom bootbox dialog with form
    $('#create_customer').on('click', function () {
        bootbox.dialog({
            title: "Create a new customer.",
            message: '<div class="row">  ' +
                '<div class="col-md-12">' +
                    '<form class="form-horizontal">' +
                        '<div class="form-group">' +
                            '<label class="col-md-4 control-label">First name</label>' +
                            '<div class="col-md-8">' +
                                '<input id="FirstName" data-bind="textinput: customerModel.first_name" name="FirstName" type="text" placeholder="First name" class="form-control">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-md-4 control-label">Last name</label>' +
                            '<div class="col-md-8">' +
                                '<input id="LastName" data-bind="textinput: customerModel.last_name" name="LastName" type="text" placeholder="Last name" class="form-control">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-md-4 control-label">Middle name</label>' +
                            '<div class="col-md-8">' +
                                '<input id="MiddleName" data-bind="textinput: customerModel.middle_name" name="MiddleName" type="text" placeholder="Middle name" class="form-control">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-md-4 control-label">Address</label>' +
                            '<div class="col-md-8">' +
                                '<input id="Address" data-bind="textinput: customerModel.st_address" name="Address" type="text" placeholder="Address" class="form-control">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-md-4 control-label">Contact no.</label>' +
                            '<div class="col-md-8">' +
                                '<input id="ContactNo" data-bind="textinput: customerModel.mobile_no" name="ContactNo" type="text" placeholder="Contact no." class="form-control">' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '</div>',
            buttons: {
                success: {
                    label: "Save",
                    className: "btn-success",
                    callback: function () {

                        var firstname = $('#FirstName').val();
                        var lastname = $('#LastName').val();
                        var middlename = $('#MiddleName').val();
                        var address = $('#Address').val();
                        var contactno = $('#ContactNo').val();

                        app.vm.saveCustomer(
                            firstname,
                            lastname,
                            middlename,
                            address,
                            contactno
                            );

                        //var name = $('#cFirstName').val();
                        //var answer = $("input[name='awesomeness']:checked").val()
                        //bootbox.alert("Hello " + name + ". You've chosen <b>" + answer + "</b>");
                    }
                },
                danger: {
                    label: "Cancel",
                    className: "btn-danger",
                    callback: function () {

                    }
                }
            }
        }
        );
    });

    ko.applyBindings(app.vm);
});