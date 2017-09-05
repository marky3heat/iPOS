

app.ItemTypeModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.ItemTypeId = ko.observable();
    self.ItemTypeName = ko.observable();
    // #endregion     

    return self;
};

app.ItemCategoryModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.ItemCategoryId = ko.observable();
    self.ItemCategoryName = ko.observable();

    self.ItemTypeId = ko.observable();
    // #endregion     

    return self;
};

app.NoGeneratorModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.NoId = ko.observable();
    self.NoDescription = ko.observable();
    self.No = ko.observable();

    // #endregion     

    return self;
};