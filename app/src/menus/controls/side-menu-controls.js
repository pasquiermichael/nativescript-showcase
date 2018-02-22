var frameModule = require("ui/frame");
var ObservableArray = require("data/observable-array").ObservableArray;

exports.onLoad = function(args) {
    var container = args.object;
    var pageData = new ObservableArray([]);
    console.log("here");
    console.log(container.classname);
    pageData.set("className", container.classname);
    container.bindingContext = pageData;
};

exports.toggleDrawer = function() {
    var sd = frameModule.topmost().getViewById("sideDrawer");
    sd.toggleDrawerState();
};