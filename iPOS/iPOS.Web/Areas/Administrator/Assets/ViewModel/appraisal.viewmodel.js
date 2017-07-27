app.vm = (function () {
    //"use strict";
    var item = new app.createAppraisalModel();

    // #region CONTROLS                
    var isItemListShowed = ko.observable(true);
    var isManageItemShowed = ko.observable(false);
    var isSaveButtonShowed = ko.observable(true);

    var buttonCaption = ko.observable("");
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
    }

    function setInfiteScrollGetItemList() {
        isLoadData = "true";
        inifiniteScroll.init({
            url: RootUrl + "/Administrator/Appraisal/GetAppraisedItemList?pageSize=100",
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
            var appraisalModel = new app.appraisalModel(
                o.AppraiseId,
                o.AppraiseDate,
                o.AppraiseNo,
                o.ItemName,
                o.ItemDescription,
                o.MarketValue.toFixed(2),
                o.AppraisedValue.toFixed(2),
                o.IsPawned,
                o.CustomerFirstName,
                o.CustomerLastName,
                o.ItemCategoryId,
                o.ItemCategoryName);
            temp.push(appraisalModel);
        });
        isViewLoadMoreData(noMoreData);
        allItems.valueHasMutated();

        return allItems();
    }

    function clearControls() {
        item.AppraiseId("");
        item.AppraiseId("");
        item.AppraiseDate("");
        item.AppraiseNo("");
        item.ItemName("");
        item.ItemDescription("");
        item.AppraisedValue("");
        item.MarketValue("");
        item.IsPawned("");

        item.CustomerFirstName("");
        item.CustomerLastName("");

        item.ItemCategoryId("");
    }

    function addItem() {
        buttonCaption(" Appraise Item");
        clearControls();
        SetInitialDate();
        getItemCategory();
        GetAppraiseNo();
        getServerDate();

        isItemListShowed(false);
        isManageItemShowed(true);
    }
    function viewItem(arg) {
        loaderApp.showPleaseWait();
        buttonCaption("");
        clearControls();
        getItemCategory();

        item.AppraiseId(arg.AppraiseId());
        item.AppraiseNo(arg.AppraiseNo());
        item.AppraiseDate(arg.AppraiseDate());
        item.ItemCategoryId(arg.ItemCategoryId());
        item.ItemName(arg.ItemName());
        item.ItemDescription(arg.ItemDescription());
        item.AppraisedValue(arg.AppraisedValue());
        item.MarketValue(arg.MarketValue());
        item.CustomerFirstName(arg.CustomerFirstName());
        item.CustomerLastName(arg.CustomerLastName());

        isItemListShowed(false);
        isManageItemShowed(true);
        isSaveButtonShowed(false);
        loaderApp.hidePleaseWait();
    }

    function backToAppraisedItemList() {
        isItemListShowed(true);
        isManageItemShowed(false);
    }

    function saveItem() {
        /*VALIDATIONS -START*/
        //if (customer.FirstName().trim() === "") {
        //    toastr.error("FirstName is required.");
        //    customer.FirstName("");
        //    document.getElementById("FirstName").focus();
        //    return false;
        //}
        /*VALIDATIONS -END*/
        
        loaderApp.showPleaseWait();
        var param = ko.toJS(item);
        var url = RootUrl + "/Administrator/Appraisal/SaveAppraisedItem";
        $.ajax({
            type: 'POST',
            url: url,
            data: ko.utils.stringifyJson(param),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.success) {
                    swal("Success", result.message, "success");

                    //to refresh infinitescroll                    
                    setInfiteScrollGetItemList();
                    isLoadData = "true";
                    //--------

                    isItemListShowed(true);
                    isManageItemShowed(false);

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");

                    clearControls();                     
                }
            }
        });
    }
    function getItemCategory() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetItemCategory", function (result) {
            itemCategory.removeAll();
            itemCategory(result);
        });
    }
    function getServerDate() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetServerDate", function (result) {
            //var resultDate = new Date(result);
            //var newDate = resultDate.toString();
            //item.AppraiseDate(newDate);
            item.AppraiseDate(result);
        });
    }
    function GetAppraiseNo() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetAppraiseNo", function (result) {
            item.AppraiseNo(result);
        });
    }

    function SetInitialDate() {
        $('.daterange-single').daterangepicker({
            singleDatePicker: true
        });
    }

    // #endregion
    var vm = {
        items: items,
        isItemListShowed: isItemListShowed,
        isManageItemShowed: isManageItemShowed,
        isSaveButtonShowed: isSaveButtonShowed,
        backToAppraisedItemList:backToAppraisedItemList,
        buttonCaption: buttonCaption,
        recordCountItemList: recordCountItemList,
        isLoadData: isLoadData,
        itemCategory: itemCategory,
        item: item,
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