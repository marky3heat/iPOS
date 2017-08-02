app.model =
    function (id
        ) {
        "use strict";

        var self = this;

        // #region MODEL TO BE MAP
        self.Id = ko.observable(id);

        // #endregion
    };
app.addModel = function () {
    "use strict";

    var self = this;

    // #region MODEL TO CREATE/UPDATE
    self.Id = ko.observable();

    // #endregion     

    return self;
};