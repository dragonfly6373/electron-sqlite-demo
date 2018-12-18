function ListAccountWidget() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, ListAccountWidget);

ListAccountWidget.prototype.onAttached = function() {
    this.requestData();
}

ListAccountWidget.prototype.requestData = function() {
    var thiz = this;
    DataAdapter.getAll(Model.User, function(data) {
        if (data && data.length) {
            thiz.dataContainer.innerHTML = "";
            for (var i in data) {
                var dom = Dom.newDOMElement({
                    _name: "div",
                    _text: data[i].name
                });
                Dom.append(dom, thiz.dataContainer);
            }
        }
    });
}
