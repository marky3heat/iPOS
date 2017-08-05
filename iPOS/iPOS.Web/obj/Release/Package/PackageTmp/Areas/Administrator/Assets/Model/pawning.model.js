app.pawnedItemModel =
    function (pawneditemid,
        pawneditemno,
        pawneddate,
        appraiseid,
        customerid,
        pawneditemcontractno,
        loanableamount,
        interestrate,
        interestamount,
        initialpayment,
        servicecharge,
        others,
        isinterestdeducted,
        netcashout,
        termsid,
        scheduleofpayment,
        noofpayments,
        duedatestart,
        duedateend,
        isreleased,
        reviewedby,
        approvedby,
        createdby,
        createdat
        ) {
        "use strict";

        var self = this;

        // #region MODEL TO BE MAP
        self.PawnedItemId = ko.observable(pawneditemid);
        self.PawnedItemNo = ko.observable(pawneditemno);
        self.PawnedDate = ko.observable(pawneddate);
        self.AppraiseId = ko.observable(appraiseid);
        self.CustomerId = ko.observable(customerid);
        self.PawnedItemContractNo = ko.observable(pawneditemcontractno);
        self.LoanableAmount = ko.observable(loanableamount);
        self.InterestRate = ko.observable(interestrate);
        self.InterestAmount = ko.observable(interestamount);
        self.InitialPayment = ko.observable(initialpayment);
        self.ServiceCharge = ko.observable(servicecharge);
        self.Others = ko.observable(others);
        self.IsInterestDeducted = ko.observable(isinterestdeducted);
        self.NetCashOut = ko.observable(netcashout);
        self.TermsId = ko.observable(termsid);
        self.ScheduleOfPayment = ko.observable(scheduleofpayment);
        self.NoOfPayments = ko.observable(noofpayments);
        self.DueDateStart = ko.observable(duedatestart);
        self.DueDateEnd = ko.observable(duedateend);
        self.IsReleased = ko.observable(isreleased);
        self.ReviewedBy = ko.observable(reviewedby);
        self.ApprovedBy = ko.observable(approvedby);
        self.CreatedBy = ko.observable(createdby);
        self.CreatedAt = ko.observable(createdat);
        // #endregion
    };
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
app.customerModel = function (id, firstname, lastname, middlename, middleinitial, address, contactno) {
    "use strict";

    var self = this;

    // #region MODEL TO BE MAP
    self.Id = ko.observable(id);
    self.FirstName = ko.observable(firstname);
    self.LastName = ko.observable(lastname);
    self.MiddleName = ko.observable(middlename);
    self.MiddleInitial = ko.observable(middleinitial);
    self.Address = ko.observable(address);
    self.ContactNo = ko.observable(contactno);
    // #endregion
};

app.addPawnedItemModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.PawnedItemId = ko.observable();
    self.PawnedItemNo = ko.observable();
    self.PawnedDate = ko.observable();
    self.AppraiseId = ko.observable();
    self.CustomerId = ko.observable();
    self.PawnedItemContractNo = ko.observable();
    self.LoanableAmount = ko.observable();
    self.InterestRate = ko.observable();
    self.InterestAmount = ko.observable();
    self.InitialPayment = ko.observable();
    self.ServiceCharge = ko.observable();
    self.Others = ko.observable();
    self.IsInterestDeducted = ko.observable();
    self.NetCashOut = ko.observable();
    self.TermsId = ko.observable();
    self.ScheduleOfPayment = ko.observable();
    self.NoOfPayments = ko.observable();
    self.DueDateStart = ko.observable();
    self.DueDateEnd = ko.observable();
    self.IsReleased = ko.observable();
    self.ReviewedBy = ko.observable();
    self.ApprovedBy = ko.observable();
    self.CreatedBy = ko.observable();
    self.CreatedAt = ko.observable();
    // #endregion     

    return self;
};