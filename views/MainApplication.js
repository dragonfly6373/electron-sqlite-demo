function MainApplication() {
    BaseTemplatedWidget.call(this);
    var thiz = this;
    var conn = DataAdapter.connect(__dirname + "/db/data.sqlite3");
    console.log("Connection: ", conn);
    this.bind(NewAccountWidget.EVENT_SAVED, function() {
        thiz.listAccount.requestData();
    }, this.newAccount);
}
__extend(BaseTemplatedWidget, MainApplication);

MainApplication.prototype.onAttached = function() {
    console.log("MainApplication is attached.");
}
