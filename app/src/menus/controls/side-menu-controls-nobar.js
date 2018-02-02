var frameModule = require("ui/frame");
var controls = require("./side-menu-controls");

exports.onLoad = function(args) {
    controls.onLoad(args);
};

exports.toggleDrawer = function() {
    controls.toggleDrawer();
};