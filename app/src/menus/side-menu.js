var controls = require("./controls/side-menu-controls");
var Button = require("ui/button").Button;
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var menu = require("../../shared/menu");
var router = require("../../vidal/router/router");
var route = require("../../shared/route");

var page;

const CURR_MENU_BTN_CLASS = "currentMmBtn";

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
    var sideMenu = route;
    var currentRoute = router.getCurrentRoute();

    for (var property in sideMenu) {
        var btnId = sideMenu[property].id_menu;
        var exBtn = p.getViewById(btnId);
        if(!exBtn && sideMenu[property].in_menu === true) { // back button problem otherwise
            var btn = new Button();
            btn.text = sideMenu[property].text_menu;
            btn.src = property;
            btn.id = btnId;
            if (currentRoute === property) {
                btn.class = CURR_MENU_BTN_CLASS;
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
    console.log(target.object.src);
    router.navigateTo(target.object.src, null, true);
}