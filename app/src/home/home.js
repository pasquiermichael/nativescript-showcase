
var enums = require("ui/enums");
var createViewModel = require("./home-view-model").createViewModel;
var timerModule = require("timer");
var frameModule = require("ui/frame");
var routing = require('../../shared/routing.json');
var sideDrawer = require("nativescript-pro-ui/sidedrawer");
var homeModel;
var page;
var idTimer;

function onNavigatingTo(args) {

    page = args.object;
    page.actionBarHidden = true;

    homeModel = createViewModel();
    page.bindingContext = homeModel;

    idTimer = timerModule.setInterval(function(e){
        console.log("setInterval");
        toggleActHandler();
    }, 8000);

    // appCache.setString("gloug", "somedata", false);
    // appCache.setString("gloug_t_", new Date().toUTCString());
}

exports.onLoad = function(e){
   e.object.set("visibility", "collapse");
};

exports.toggleAct = function(e){
    console.log("toggleAct");
    var p = e.object;
    timerModule.clearInterval(idTimer);
    // Path system a faire
    frameModule.topmost().navigate(routing.main.news.list);
};




exports.onNavigatingTo = onNavigatingTo;



function toggleActHandler(p) {
    var labelCont = page.getViewById("actLabelContainer");
    var parentCont = p || labelCont.parentNode;
    var backgroundCont = page.getViewById("actBackground");

    var y;
    var o;
    if (parentCont.get("toggled") === true) {
        y = 0;
        o = 0.7;
        parentCont.set("toggled", false);
    } else {
        y = parentCont.height * -1;
        o = 0;
        parentCont.set("toggled", true);
    }

    animateAct(labelCont, y, backgroundCont, o);
}


function animateAct(element, elementVal, bgElement, bgElementVal) {
    element.animate({
        translate:{y:elementVal, x:0},
        duration:1000,
        curve: enums.AnimationCurve.spring
    });

    bgElement.animate({
        opacity:bgElementVal,
        duration:750
    })
}

