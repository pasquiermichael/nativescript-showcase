var controls = require("./controls/side-menu-controls");

exports.onLoad = function(args) {
    console.log("sideMenuTop");
};

exports.toggleDrawer = function() {
    controls.toggleDrawer();
};