app.vm = (function () {
    //"use strict";
    var appraisedItem = new app.addAppraisedItemModel();

    // #region CONTROLS                
    var isAppraisedItemListShowed = ko.observable(true);
    var isManageAppraisedItemShowed = ko.observable(false);
    var isViewAppraisedItemShowed = ko.observable(false);
    var isSaveButtonShowed = ko.observable(true);

    var buttonCaption = ko.observable("");

    var itemType = ko.observableArray();
    var itemCategory = ko.observableArray();

    var serverDate = ko.observableArray();
    var appraisalNo = ko.observableArray();

    var isLoadData = "false";
    var recordCountItemList = ko.observable();
    var isViewLoadMoreData = ko.observable(false);

    var allItems = ko.observableArray([]);
    var items = ko.pureComputed(function () {
        return allItems();
    });

    // #endregion

    // #region BEHAVIORS
    // initializers
    function activate() {
        setInfiteScrollGetItemList();
        SetInitialDate();
    }

    function setInfiteScrollGetItemList() {
        isLoadData = "true";
        inifiniteScroll.init({
            url: RootUrl + "/Administrator//?pageSize=100",
            callback: inifiteScrollCallBackGetItemList,
            searchObject: $("#search-item"),
            page: -1
        });
        inifiniteScroll.getData();
    }

    //Get Data
    function inifiteScrollCallBackGetItemList(result) {
        if (isLoadData === "true") {
            recordCountItemList(result.recordCount);
        }
        isLoadData = "false";

        allItems.removeAll();
        inifiniteScroll.resetDefaults();

        var noMoreData = result.noMoreData;
        var data = result.data;
        var temp = allItems();
        data.forEach(function (o) {
            var appraisalModel = new app.appraisedItemModel(
                o.Id
            );
            temp.push(appraisalModel);
        });
        isViewLoadMoreData(noMoreData);
        allItems.valueHasMutated();

        return allItems();
    }

    function clearControls() {

    }

    function addItem() {

    }

    function viewItem(arg) {
        loaderApp.showPleaseWait();

        loaderApp.hidePleaseWait();
    }

    function backToAppraisedItemList() {

    }

    function saveItem() {
        debugger;
        /*VALIDATIONS -START*/
        if (appraisedItem.AppraiseDate().trim() === "") {
            toastr.error("Date is required.");
            appraisedItem.AppraiseDate("");
            document.getElementById("AppraiseDate").focus();
            return false;
        }

        /*VALIDATIONS -END*/

        loaderApp.showPleaseWait();
        var param = ko.toJS(appraisedItem);
        var url = RootUrl + "/Administrator//";
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

    function SetInitialDate() {
        $('.daterange-single').daterangepicker({
            singleDatePicker: true
        });
    }

    // #endregion

    var vm = {
        addItem: addItem,
        saveItem: saveItem,
        viewItem: viewItem,
        activate: activate
    };
    return vm;
})();
$(function () {
    "use strict";

    app.vm.activate();

    // Success
    $(".control-success").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-success-600 text-success-800'
    });

    //Switchery
    var switches = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
    switches.forEach(function (html) {
        var switchery = new Switchery(html, { color: '#4CAF50' });
    });

    ko.applyBindings(app.vm);
});