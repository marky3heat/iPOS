app.vm = (function () {
    //"use strict";
    var appraisedItem = new app.addAppraisedItemModel();

    // #region CONTROLS                
    var isAppraisedItemListShowed = ko.observable(true);
    var isManageAppraisedItemShowed = ko.observable(false);
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

    var vm = {
        items: items,

        isAppraisedItemListShowed: isAppraisedItemListShowed,
        isManageAppraisedItemShowed: isManageAppraisedItemShowed,

        itemType: itemType,
        itemCategory: itemCategory,

        isSaveButtonShowed: isSaveButtonShowed,

        backToAppraisedItemList: backToAppraisedItemList,

        buttonCaption: buttonCaption,
        recordCountItemList: recordCountItemList,
        isLoadData: isLoadData,

        appraisedItem: appraisedItem,

        addItem: addItem,
        saveItem: saveItem,
        viewItem: viewItem,
        activate: activate,

        getItemCategory: getItemCategory,
        getItemType: getItemType
    };
    return vm;


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
        appraisedItem.AppraiseId("");
        appraisedItem.AppraiseDate("");
        appraisedItem.AppraiseNo("");

        appraisedItem.ItemTypeId("");
        appraisedItem.ItemCategoryId("");

        appraisedItem.ItemName("");
        appraisedItem.Weight("");
        appraisedItem.AppraisedValue("");
        appraisedItem.Remarks("");
        appraisedItem.CustomerFirstName("");
        appraisedItem.CustomerLastName("");
        appraisedItem.IsPawned("");

        appraisedItem.CreatedBy("");
        appraisedItem.CreatedAt("");
    }

    function addItem() {
        buttonCaption(" Appraise Item");
        clearControls();
        SetInitialDate();

        getItemType();
        getItemCategory();

        GetAppraiseNo();
        getServerDate();

        isAppraisedItemListShowed(false);
        isManageAppraisedItemShowed(true);
    }
    function viewItem(arg) {
        loaderApp.showPleaseWait();
        buttonCaption("");
        clearControls();

        getItemCategory();

        appraisedItem.AppraiseId(arg.AppraiseId());
        appraisedItem.AppraiseDate(arg.AppraiseDate());
        appraisedItem.AppraiseNo(arg.AppraiseNo());

        appraisedItem.ItemTypeId(arg.ItemTypeId());
        appraisedItem.ItemCategoryId(arg.ItemCategoryId());
        appraisedItem.ItemName(arg.ItemName());
        appraisedItem.Weight(arg.Weight());
        appraisedItem.AppraisedValue(arg.AppraisedValue());
        appraisedItem.Remarks(arg.Remarks());
        appraisedItem.CustomerFirstName(arg.CustomerFirstName());
        appraisedItem.CustomerLastName(arg.CustomerLastName());
        appraisedItem.IsPawned(arg.IsPawned());

        appraisedItem.CreatedBy(arg.CreatedBy());
        appraisedItem.CreatedAt(arg.CreatedAt());

        isItemListShowed(false);

        isManageItemShowed(true);
        isSaveButtonShowed(false);

        isAppraisedItemListShowed(true);
        isManageAppraisedItemShowed(false);

        loaderApp.hidePleaseWait();
    }

    function backToAppraisedItemList() {
        isAppraisedItemListShowed(true);
        isManageAppraisedItemShowed(false);
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

                    isAppraisedItemListShowed(true);
                    isManageAppraisedItemShowed(false);

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");

                    clearControls();                     
                }
            }
        });
    }

    function getItemType() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetItemType", function (result) {
            itemType.removeAll();
            itemType(result);
        });
    }
    function getItemCategory() {
        var ItemTypeId = $("#ItemTypeId option:selected").val();

        $.getJSON(RootUrl + "/Administrator/Appraisal/GetItemCategory?ItemTypeId=" + ItemTypeId, function (result) {
            itemCategory.removeAll();
            itemCategory(result);
        });
    }
    function getServerDate() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetServerDate", function (result) {
            appraisedItem.AppraiseDate(result);
        });
    }
    function GetAppraiseNo() {
        $.getJSON(RootUrl + "/Administrator/Appraisal/GetAppraiseNo", function (result) {
            appraisedItem.AppraiseNo(result);
        });
    }

    function SetInitialDate() {
        $('.daterange-single').daterangepicker({
            singleDatePicker: true
        });
    }

    // #endregion

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