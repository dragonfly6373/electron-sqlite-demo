function ListAccountWidget() {
    BaseTemplatedWidget.call(this);
    var thiz = this;
    this.bind("keypress", function(event) {
        if (event.keyCode == 13) {
            var keyword = thiz.filterName.value;
            thiz.requestData(keyword);
        }
    }, this.filterName);
}
__extend(BaseTemplatedWidget, ListAccountWidget);

ListAccountWidget.prototype.onAttached = function() {
    this.requestData("");
}

ListAccountWidget.prototype.requestData = function(keyword) {
    var thiz = this;
    var condition = keyword.length ? Condition.iLike("name", keyword) : null;
    DataAdapter.getAll(Model.User, condition, function(data) {
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
