app.vm = (function () {
    //"use strict";
    var itemTypeModel = new app.ItemTypeModel();
    var itemCategoryModel = new app.ItemCategoryModel();

    // #region CONTROLS   
    var isItemTypeShowedList = ko.observable(true);
    var isItemCategoryShowedList = ko.observable(true);
    
    var isItemTypeShowed = ko.observable(false);
    var isItemCategoryShowed = ko.observable(false);

    var buttonSaveItemTypeCaption = ko.observable("");
    var buttonSaveItemCategoryCaption = ko.observable("");

    var buttonSaveItemType = ko.observable(false);
    var buttonSaveItemCategory = ko.observable(false);

    var itemTypeArray = ko.observableArray();

    var itemTypeList = ko.observableArray([]);
    var itemType = ko.pureComputed(function () {
        return itemTypeList();
    });

    var itemCategoryList = ko.observableArray([]);
    var itemCategory = ko.pureComputed(function () {
        return itemCategoryList();
    });

    // #endregion

    // #region BEHAVIORS
    // initializers
    function activate() {
        loadItemTypeList();
        loadItemCategoryList();
    }

    //Get Data
    function loadItemTypeList() {
        $("#itemTypeTable").dataTable().fnDestroy();
        $('#itemTypeTable').DataTable({
            "ajax": {
                "url": RootUrl + "/Administrator/Reference/LoadItemTypeList",
                "type": "GET",
                "datatype": "json"
            },
            //"order": [[2, "desc"]],
            "columns": [
                { "data": "ItemTypeId", "className": "hide" },
                { "data": "ItemTypeName", "className": "text-left" },
                {
                    "render": function (data, type, row) {
                        return '<ul class="icons-list">' +
                            '<li class="dropdown">' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>' +
                            '<ul class="dropdown-menu dropdown-menu-right">' +
                            '<li><a href="#"><i class="icon-file-stats"></i> View item type</a></li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>';
                    }
                },
                { "data": "ItemTypeId", "className": "hide" },
                { "data": "ItemTypeId", "className": "hide" },
                { "data": "ItemTypeId", "className": "hide" },
                { "data": "ItemTypeId", "className": "hide" }
            ]
        });
    }

    function loadItemCategoryList() {
        $("#itemCategoryTable").dataTable().fnDestroy();
        $('#itemCategoryTable').DataTable({
            "ajax": {
                "url": RootUrl + "/Administrator/Reference/LoadItemCategoryList",
                "type": "GET",
                "datatype": "json"
            },
            //"order": [[2, "desc"]],
            "columns": [
                { "data": "ItemCategoryId", "className": "hide" },
                { "data": "ItemTypeName", "className": "ext-left" },
                { "data": "ItemCategoryName", "className": "text-left" },
                {
                    "render": function (data, type, row) {
                        return '<ul class="icons-list">' +
                            '<li class="dropdown">' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>' +
                            '<ul class="dropdown-menu dropdown-menu-right">' +
                            '<li><a href="#"><i class="icon-file-stats"></i> View item type</a></li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>';
                    }
                },
                { "data": "ItemCategoryId", "className": "hide" },
                { "data": "ItemCategoryId", "className": "hide" },
                { "data": "ItemCategoryId", "className": "hide" }
            ]
        });
    }

    function clearItemTypeControls() {
        itemTypeModel.ItemTypeId("");
        itemTypeModel.ItemTypeName("");
    }

    function clearItemCategoryControls() {
        itemCategoryModel.ItemCategoryId("");
        itemCategoryModel.ItemCategoryName("");
        itemCategoryModel.ItemTypeId("");
    }

    function addItemType() {
        buttonSaveItemTypeCaption(" Save");
        clearItemTypeControls();

        isItemTypeShowedList(false);
        isItemCategoryShowedList(false);
        isItemTypeShowed(true);

        buttonSaveItemType(true);
    }

    function addItemCategory() {
        buttonSaveItemCategoryCaption(" Save");
        clearItemCategoryControls();

        getItemType();

        isItemTypeShowedList(false);
        isItemCategoryShowedList(false);
        isItemCategoryShowed(true);

        buttonSaveItemCategory(true);
    }

    function viewItemType(arg) {
        loaderApp.showPleaseWait();
        buttonSaveItemTypeCaption("");
        clearItemTypeControls();

        item.AppraiseId(arg.AppraiseId());


        isItemTypeShowedList(false);
        isItemTypeShowed(true);

        buttonSaveItemType(false);

        loaderApp.hidePleaseWait();
    }

    function viewItemCategory(arg) {
        loaderApp.showPleaseWait();

        buttonSaveItemCategoryCaption("");
        clearItemCategoryControls();

        item.AppraiseId(arg.AppraiseId());

        isItemCategoryShowedList(false);
        isItemCategoryShowed(true);

        buttonSaveItemCategory(false);

        loaderApp.hidePleaseWait();
    }

    function backToList() {
        isItemTypeShowedList(true);
        isItemTypeShowed(false);

        isItemCategoryShowedList(true);
        isItemCategoryShowed(false);
    }

    function saveItemType() {
        loaderApp.showPleaseWait();
        var param = ko.toJS(itemTypeModel);
        var url = RootUrl + "/Administrator/Reference/SaveItemType";
        $.ajax({
            type: 'POST',
            url: url,
            data: ko.utils.stringifyJson(param),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.success) {

                    swal({ title: "Success!", text: result.message, type: "success" }, function () { reloadPage(); });

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");
                }
            }
        });
    }

    function saveItemCategory() {
        loaderApp.showPleaseWait();
        var param = ko.toJS(itemCategoryModel);
        var url = RootUrl + "/Administrator/Reference/SaveItemCategory";
        $.ajax({
            type: 'POST',
            url: url,
            data: ko.utils.stringifyJson(param),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.success) {

                    swal({ title: "Success!", text: result.message, type: "success" }, function () { reloadPage(); });

                    loaderApp.hidePleaseWait();
                } else {
                    loaderApp.hidePleaseWait();

                    swal("Error", result.message, "error");
                }
            }
        });
    }

    function getItemType() {
        $.getJSON(RootUrl + "/Administrator/Reference/GetItemType", function (result) {
            itemTypeArray.removeAll();
            itemTypeArray(result);
        });
    }

    function reloadPage() {
        window.location.reload();
    }

    // #endregion
    var vm = {
        activate: activate,

        isItemTypeShowedList: isItemTypeShowedList,
        isItemCategoryShowedList: isItemCategoryShowedList,

        isItemTypeShowed: isItemTypeShowed,
        isItemCategoryShowed: isItemCategoryShowed,

        addItemType: addItemType,
        addItemCategory: addItemCategory,

        viewItemType: viewItemType,
        viewItemCategory: viewItemCategory,

        backToList: backToList,

        saveItemType: saveItemType,
        saveItemCategory: saveItemCategory,

        getItemType: getItemType,

        buttonSaveItemTypeCaption: buttonSaveItemTypeCaption,
        buttonSaveItemCategoryCaption: buttonSaveItemCategoryCaption,

        itemTypeModel: itemTypeModel,
        itemCategoryModel: itemCategoryModel,

        itemTypeArray: itemTypeArray
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