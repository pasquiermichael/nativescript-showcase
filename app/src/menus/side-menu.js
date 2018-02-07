var controls = require("./controls/side-menu-controls");
var Button = require("ui/button").Button;
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var menu = require("../../shared/menu");
var router = require("../../vidal/router/router");

var page;
var pageData = new observableModule.fromObject({

});

exports.onLoad = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    var cont = page.getViewById('mainMenuContent');
    buildMenu(cont);
};

exports.toggleDrawer = function() {
    controls.toggleDrawer();
};

function buildMenu(p) {
    var sideMenu = menu["sideMenu"];
    var currentRoute = router.getCurrentRoute();

    for (var property in sideMenu) {
        var btnId = sideMenu[property].id;
        var exBtn = p.getViewById(btnId);
        if(!exBtn) { // back button problem otherwise
            var btn = new Button();
            btn.text = sideMenu[property].text;
            btn.src = sideMenu[property].src;
            btn.id = btnId;
            if (currentRoute === sideMenu[property].src) {
                btn.class = "currentMmBtn";
            } else {
                btn.on(Button.tapEvent, function(args){
                    navigateFromMenu(args);
                });
            }
            p.addChild(btn);
        }
    }
}

function navigateFromMenu(target) {
    router.navigateTo(target.object.src, null, true);
}