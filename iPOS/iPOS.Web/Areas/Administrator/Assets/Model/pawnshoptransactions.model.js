app.viewModeModel = function (
    transactionid,
    transactionno,
    transactiondate,
    transactiontype,
    terminal,
    status,
    reviewedby,
    approvedby,
    createdby,
    createdat) {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.TransactionId = ko.observable(transactionid);
    self.TransactionNo = ko.observable(transactionno);
    self.TransactionDate = ko.observable(transactiondate);
    self.TransactionType = ko.observable(transactiontype);
    self.Terminal = ko.observable(terminal);
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
    self.TransactionNo = ko.observable();
    self.TransactionDate = ko.observable();
    self.TransactionType = ko.observable();
    self.Terminal = ko.observable();
    self.Status = ko.observable();
    self.ReviewedBy = ko.observable();
    self.ApprovedBy = ko.observable();
    self.CreatedBy = ko.observable();
    self.CreatedAt = ko.observable();

    self.FirstName = ko.observable();
    self.LastName = ko.observable();
    self.Address = ko.observable();
    self.ContactNo = ko.observable();

    self.ItemName = ko.observable();
    self.ItemTypeId = ko.observable();
    self.ItemCategoryId = ko.observable();
    self.Remarks = ko.observable();

    // #endregion     

    return self;
};

app.createCustomerModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO BE MAP
    self.autonum = ko.observable();
    self.first_name = ko.observable();
    self.last_name = ko.observable();
    self.middle_name = ko.observable();
    self.st_address = ko.observable();
    self.mobile_no = ko.observable();
    // #endregion
};