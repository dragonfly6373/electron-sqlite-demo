function NewAccountWidget() {
    BaseTemplatedWidget.call(this);
    this.bind("click", this.save.bind(this), this.btnSave);
    this.bind("click", this.clear.bind(this), this.btnClear);
}
__extend(BaseTemplatedWidget, NewAccountWidget);
NewAccountWidget.EVENT_SAVED = "w:saved";

NewAccountWidget.prototype.onAttached = function() {
    console.log("New Account attached");
}

NewAccountWidget.prototype.save = function() {
    var thiz = this;
    var obj = {
        name: this.inputName.value,
        email: this.inputEmail.value,
        sex: this.selectGender.getValue(),
        status: 0
    };
    DataAdapter.insert(Model.User, obj, function(data) {
        console.log("Save user call back:", data);
        Dom.emitEvent("w:saved", thiz.node());
    });
}

NewAccountWidget.prototype.clear  = function() {
    this.inputName.value = "";
    this.inputEmail.value = "";
    this.selectGender.setValueSelected(0);
}
