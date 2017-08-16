app.viewModeModel = function (
    transactionid,
    transactiondate,
    transactiontype,
    customerid,
    itemid,
    pawnid,
    saleid,
    layawayid,
    status,
    reviewedby,
    approvedby,
    createdby,
    createdat) {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.TransactionId = ko.observable(transactionid);
    self.TransactionDate = ko.observable(transactiondate);
    self.TransactionType = ko.observable(transactiontype);
    self.CustomerId = ko.observable(customerid);
    self.ItemId = ko.observable(itemid);
    self.PawnId = ko.observable(pawnid);
    self.SaleId = ko.observable(saleid);
    self.LayAwayId = ko.observable(layawayid);
    self.Status = ko.observable(status);
    self.ReviewedBy = ko.observable(reviewedby);
    self.ApprovedBy = ko.observable(approvedby);
    self.CreatedBy = ko.observable(createdby);
    self.CreatedAt = ko.observable(createdat);

    // #endregion     

    return self;
};
app.createModeModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.TransactionId = ko.observable();
    self.TransactionDate = ko.observable();
    self.TransactionType = ko.observable();
    self.CustomerId = ko.observable();
    self.ItemId = ko.observable();
    self.PawnId = ko.observable();
    self.SaleId = ko.observable();
    self.LayAwayId = ko.observable();
    self.Status = ko.observable();
    self.ReviewedBy = ko.observable();
    self.ApprovedBy = ko.observable();
    self.CreatedBy = ko.observable();
    self.CreatedAt = ko.observable();

    // #endregion     

    return self;
};