app.appraisedItemModel =
    function (appraiseid,
        appraisedate,
        appraiseno,
        itemtypeid,
        itemcategoryid,
        itemname,
        weight,
        appraisedvalue,
        remarks,
        customerfirstname,
        customerlastname,
        ispawned,
        createdby,
        createdat,
        itemcategoryname,
        itemtypename) {
        "use strict";

        var self = this;

        // #region MODEL TO BE MAP
        self.AppraiseId = ko.observable(appraiseid);
        self.AppraiseDate = ko.observable(appraisedate);
        self.AppraiseNo = ko.observable(appraiseno);
        self.ItemTypeId = ko.observable(itemtypeid);
        self.ItemCategoryId = ko.observable(itemcategoryid);
        self.ItemName = ko.observable(itemname);
        self.Weight = ko.observable(weight);
        self.AppraisedValue = ko.observable(appraisedvalue);
        self.Remarks = ko.observable(remarks);
        self.CustomerFirstName = ko.observable(customerfirstname);
        self.CustomerLastName = ko.observable(customerlastname);
        self.IsPawned = ko.observable(ispawned);
        self.CreatedBy = ko.observable(createdby);
        self.CreatedAt = ko.observable(createdat);

        self.ItemCategoryName = ko.observable(itemcategoryname);
        self.ItemTypeName = ko.observable(itemtypename);
        // #endregion
    };
app.addAppraisedItemModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.AppraiseId = ko.observable();
    self.AppraiseDate = ko.observable();
    self.AppraiseNo = ko.observable();
    self.ItemTypeId = ko.observable();
    self.ItemCategoryId = ko.observable();
    self.ItemName = ko.observable();
    self.Weight = ko.observable();
    self.AppraisedValue = ko.observable();
    self.Remarks = ko.observable();
    self.CustomerFirstName = ko.observable();
    self.CustomerLastName = ko.observable();
    self.IsPawned = ko.observable();
    self.CreatedBy = ko.observable();
    self.CreatedAt = ko.observable();
    // #endregion     

    return self;
};