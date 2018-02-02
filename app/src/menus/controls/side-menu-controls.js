var frameModule = require("ui/frame");

exports.onLoad = function(args) {
    console.log("sideMenuControls");
    var container = args.object;
};

exports.toggleDrawer = function() {
    var sd = frameModule.topmost().getViewById("sideDrawer");
    sd.toggleDrawerState();
};