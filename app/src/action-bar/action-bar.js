var ObservableArray = require("data/observable-array").ObservableArray;

exports.onLoad = function(args) {
    var container = args.object;
    var pageData = new ObservableArray([]);
    pageData.set("title", container.title);
    container.bindingContext = pageData;
};