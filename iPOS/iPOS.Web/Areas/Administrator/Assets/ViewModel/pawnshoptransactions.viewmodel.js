app.vm = (function () {
    //"use strict";
    var model = new app.createModeModel();

    // #region CONTROLS                
    var isListShowed = ko.observable(true);
    var isCreateModeShowed = ko.observable(false);

    var isSaveButtonShowed = ko.observable(false);
    var saveButtonCaption = ko.observable("");

    // #endregion

    // #region BEHAVIORS
    // initializers
    function activate() {
        hideSidebar();
        setInitialDate();
    }

    function clearControls() {
     
    }

    function showCreateModePawning() {
        isListShowed(false);
        isCreateModeShowed(true);
        isSaveButtonShowed(true);
        saveButtonCaption("Save");

        getServerDate();
        getTransactionNo();
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

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");

                    clearControls();
                }
            }
        });
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

        model: model
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