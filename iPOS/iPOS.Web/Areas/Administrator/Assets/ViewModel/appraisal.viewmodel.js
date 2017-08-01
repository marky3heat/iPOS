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
        getItemType();
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
            var appraisalModel = new app.appraisedItemModel(
                o.AppraiseId,
                o.AppraiseDate,
                o.AppraiseNo,
                o.ItemTypeId,
                o.ItemCategoryId,
                o.ItemName,
                o.Weight,
                o.AppraisedValue,
                o.Remarks,
                o.CustomerFirstName,
                o.CustomerLastName,
                o.IsPawned,
                o.CreatedBy,
                o.CreatedAt,
                o.ItemTypeName,
                o.ItemCategoryName
            );
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

        GetAppraiseNo();
        getServerDate();

        isAppraisedItemListShowed(false);
        isManageAppraisedItemShowed(true);

        isSaveButtonShowed(true);
    }
    function viewItem(arg) {
        debugger;
        loaderApp.showPleaseWait();

        isAppraisedItemListShowed(false);
        isManageAppraisedItemShowed(true);

        buttonCaption("");
        clearControls();

        appraisedItem.AppraiseId(arg.AppraiseId());
        appraisedItem.AppraiseDate(moment(arg.AppraiseDate()).format('L'));

        appraisedItem.AppraiseNo(arg.AppraiseNo());
        appraisedItem.ItemTypeId(arg.ItemTypeId());

        getItemCategory(arg.ItemTypeId());
        setTimeout(function () {
            appraisedItem.ItemCategoryId(arg.ItemCategoryId());
        }, 300);

        appraisedItem.ItemName(arg.ItemName());
        appraisedItem.Weight(arg.Weight());
        appraisedItem.AppraisedValue(arg.AppraisedValue());
        appraisedItem.Remarks(arg.Remarks());
        appraisedItem.CustomerFirstName(arg.CustomerFirstName());
        appraisedItem.CustomerLastName(arg.CustomerLastName());
        appraisedItem.IsPawned(arg.IsPawned());

        appraisedItem.CreatedBy(arg.CreatedBy());
        appraisedItem.CreatedAt(arg.CreatedAt());

        isSaveButtonShowed(false);

        loaderApp.hidePleaseWait();
    }

    function backToAppraisedItemList() {
        isAppraisedItemListShowed(true);
        isManageAppraisedItemShowed(false);
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
        if (appraisedItem.AppraiseNo() === "") {
            toastr.error("Appraise no is required.");
            appraisedItem.AppraiseNo("");
            document.getElementById("AppraiseNo").focus();
            return false;
        }
        if (appraisedItem.ItemTypeId() === "" || appraisedItem.ItemTypeId() === undefined) {
            toastr.error("Item type is required.");
            appraisedItem.ItemTypeId("");
            document.getElementById("ItemTypeId").focus();
            return false;
        }
        if (appraisedItem.ItemCategoryId() === "" || appraisedItem.ItemCategoryId() === undefined) {
            toastr.error("Item category is required.");
            appraisedItem.ItemCategoryId("");
            document.getElementById("ItemCategoryId").focus();
            return false;
        }
        if (appraisedItem.ItemName().trim() === "") {
            toastr.error("Item name is required.");
            appraisedItem.ItemName("");
            document.getElementById("ItemName").focus();
            return false;
        }
        if (appraisedItem.Weight().trim() === "") {
            toastr.error("Weight is required.");
            appraisedItem.Weight("");
            document.getElementById("Weight").focus();
            return false;
        }
        if (appraisedItem.AppraisedValue().trim() === "") {
            toastr.error("Value is required.");
            appraisedItem.AppraisedValue("");
            document.getElementById("AppraisedValue").focus();
            return false;
        }
        if (appraisedItem.CustomerFirstName().trim() === "") {
            toastr.error("First name is required.");
            appraisedItem.CustomerFirstName("");
            document.getElementById("CustomerFirstName").focus();
            return false;
        }
        if (appraisedItem.CustomerLastName().trim() === "") {
            toastr.error("Last name is required.");
            appraisedItem.CustomerLastName("");
            document.getElementById("CustomerLastName").focus();
            return false;
        }
        /*VALIDATIONS -END*/
        
        loaderApp.showPleaseWait();
        var param = ko.toJS(appraisedItem);
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
    function getItemCategory(arg) {
        var itemTypeId = "";
        if (arg !== "") {
            itemTypeId = arg;
        } else {
            itemTypeId = appraisedItem.ItemTypeId();
        }

        if (itemTypeId !== "") {
            $.getJSON(RootUrl + "/Administrator/Appraisal/GetItemCategory?ItemTypeId=" + itemTypeId, function (result) {
                itemCategory.removeAll();
                itemCategory(result);
            });
        }
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