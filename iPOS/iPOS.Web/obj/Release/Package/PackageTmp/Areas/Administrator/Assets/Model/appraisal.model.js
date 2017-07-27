app.appraisalModel =
    function (appraiseid,
    appraisedate,
    appraiseno,
    itemname,
    itemdescription,
    marketvalue,
    appraisedvalue,
    ispawned,
    customerfirstname,
    customerlastname,
    middelname,
    itemcategoryid,
    itemcategoryname) {
    "use strict";

    var self = this;

    // #region MODEL TO BE MAP
    self.AppraiseId = ko.observable(appraiseid);
    self.AppraiseDate = ko.observable(appraisedate);
    self.AppraiseNo = ko.observable(appraiseno);
    self.ItemName = ko.observable(itemname);
    self.ItemDescription = ko.observable(itemdescription);
    self.MarketValue = ko.observable(marketvalue);
    self.AppraisedValue = ko.observable(appraisedvalue);
    self.IsPawned = ko.observable(ispawned);

    self.CustomerFirstName = ko.observable(customerfirstname);
    self.CustomerLastName = ko.observable(customerlastname);

    self.ItemCategoryId = ko.observable(itemcategoryid);
    self.ItemCategoryName = ko.observable(itemcategoryname);
    // #endregion
};
app.createAppraisalModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.AppraiseId = ko.observable();
    self.AppraiseDate = ko.observable();
    self.AppraiseNo = ko.observable();
    self.ItemName = ko.observable();
    self.ItemDescription = ko.observable();
    self.AppraisedValue = ko.observable();
    self.MarketValue = ko.observable();
    self.IsPawned = ko.observable();

    self.CustomerFirstName = ko.observable();
    self.CustomerLastName = ko.observable();

    self.ItemCategoryId = ko.observable();
    // #endregion     

    return self;
};