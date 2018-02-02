var frameModule = require("ui/frame");
var controls = require("./side-menu-controls");
var ObservableArray = require("data/observable-array").ObservableArray;

exports.onLoad = function(args) {
    console.log("sideMenuControls");
    var container = args.object;
    var pageData = new ObservableArray([]);
    pageData.set("name", container.name);
    container.bindingContext = pageData;
};

exports.toggleDrawer = function() {
    controls.toggleDrawer();
};