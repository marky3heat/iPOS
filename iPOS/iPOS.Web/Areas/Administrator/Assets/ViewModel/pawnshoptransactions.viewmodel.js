﻿app.vm = (function () {
    //"use strict";
    var model = new app.createModeModel();

    // #region CONTROLS                
    var isListShowed = ko.observable(true);
    var isCreateModeShowed = ko.observable(false);

    var isSaveButtonShowed = ko.observable(false);
    var saveButtonCaption = ko.observable("");

    var itemType = ko.observableArray();
    var itemCategory = ko.observableArray();
    var customer = ko.observableArray();

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
                            '<li><a href="#"><i class="icon-file-stats"></i> View pawned item</a></li>' +
                            '<li><a href="#" ><i class="icon-file-stats"></i> Approve pawned item</a></li>' +
                            '<li><a href="#"><i class="icon-file-stats"></i> Print</a></li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>';
                    }
                },
                { "data": "TransactionId", "className": "hide" }
            ]
        });
    }

    function clearControls() {
        model.TransactionId("");
        model.TransactionNo("");
        model.TransactionDate("");
        model.TransactionType("");
        model.Terminal("");
        model.Status("");
        model.ReviewedBy("");
        model.ApprovedBy("");
        model.CreatedBy("");
        model.CreatedAt("");

        model.FirstName("");
        model.LastName("");
        model.Address("");
        model.ContactNo("");

        model.ItemName("");
        model.ItemTypeId("");
        model.ItemCategoryId("");
        model.Remarks("");
    }

    function showCreateModePawning() {
        isListShowed(false);
        isCreateModeShowed(true);
        isSaveButtonShowed(true);
        saveButtonCaption("Save");

        getServerDate();
        getTransactionNo();
        getItemType();
    }

    function viewItem(arg) {
        loaderApp.showPleaseWait();

        loaderApp.hidePleaseWait();
    }

    function backToList() {
        isListShowed(true);
        isCreateModeShowed(false);
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
            itemTypeId = model.ItemTypeId();
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
        isCreateModeShowed: isCreateModeShowed,
        showCreateModePawning: showCreateModePawning,
        backToList: backToList,
        saveButtonCaption: saveButtonCaption,
        isSaveButtonShowed: isSaveButtonShowed,
        saveTransactionPawn: saveTransactionPawn,

        model: model,

        getItemType: getItemType,
        getItemCategory: getItemCategory,

        itemType: itemType,
        itemCategory: itemCategory,
        customer: customer

    };
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

                    }
                }
            }
        });
    });

    ko.applyBindings(app.vm);
});