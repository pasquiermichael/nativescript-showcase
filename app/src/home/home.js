var enums = require("ui/enums");
var HomeViewModel = require("./home-view-model");
var timerModule = require("timer");
var page;
var idTimer;
var animationSet;
var router = require("~/vidal/router/router");
var animationModule = require("tns-core-modules/ui/animation");
var api = require("~/vidal/api/api");
var observableModule = require("data/observable");

var debug = require("~/vidal/debug/debugger");

const ANIM_TOGGLE_TIME = 4000;

var homeModel = HomeViewModel.homeViewModel;

var pageData = new observableModule.fromObject({
    lastNews: homeModel,
    dbOpened: false
});

exports.onNavigatingFrom = function(args) {
    console.log("leaving page");
    timerModule.clearInterval(idTimer);
};

exports.onNavigatingTo = function(args) {
    router.setCurrentStartingRoute();
    page = args.object;
    page.actionBarHidden = true;
    homeModel.getLastNews().then(function(e){

    });
    page.bindingContext = pageData;

    idTimer = timerModule.setInterval(function(e){
        toggleActHandler();
    }, ANIM_TOGGLE_TIME);

    debug.trace("THIS IS WORKING !!!", debug.T_ERR);
};

exports.onLoad = function(e){
   var logo = page.getViewById("mainLogo");

    animationSet = new animationModule.Animation([{
        target: logo,
        rotate: 360,
        duration: 100,
        iterations: Number.POSITIVE_INFINITY,
        curve: enums.AnimationCurve.linear
    }]);

    debug.trace("Onload");

};

exports.logoDTapHandler = function(e){
    console.log(animationSet.isPlaying);
    if (animationSet.isPlaying !== true) {
        animationSet.play().catch(function (e) {
            console.log("Animation stopped!");
        });
    } else {
        animationSet.cancel();
    }
};

exports.toggleAct = function(e){
    router.navigateTo("news_list");
};


function toggleActHandler(p) {
    console.log("toggleActHandler");
    var labelCont = page.getViewById("actLabelContainer");
    var parentCont = p || labelCont.parentNode;
    var backgroundCont = page.getViewById("actBackground");

    var y;
    var o;
    if (parentCont.get("toggled") === true) {
        y = 0;
        o = 0.5;
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
    });
}

