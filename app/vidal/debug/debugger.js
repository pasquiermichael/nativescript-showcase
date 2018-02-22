var platformModule = require("tns-core-modules/platform");
var observableModule = require("data/observable");
var profiling = require("../../vidal/debug/profiling");

var realHeight;
var realWidth;
var debugMainContent;
var page;

const DEBUG_MAIN_CONTENT_ID = "debuggerMainContent";

var pageData = new observableModule.fromObject({
    dbOpened: false,
    message: ''
});
exports.init = function(args) {
    realHeight = (platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale);
    realWidth = (platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale);

    //ya surement miex pour recp la page usr un compo?
    page = args.object.parentNode;
    args.object.bindingContext = pageData;
    debugMainContent = page.getViewById(DEBUG_MAIN_CONTENT_ID);

    hideMainContent();
};

exports.toggle = function(args) {
    var xPos = 0;
    var yPos = 0;

    if (pageData.dbOpened) {
        xPos = realWidth;
        yPos = realHeight;
    }

    debugMainContent.animate({
        translate: {x: xPos, y: yPos},
        duration:350
    }).then(function(){
        pageData.set("dbOpened", !pageData.dbOpened);
    });
};

exports.trace = function(message) {
    pageData.set("message", message);
};


function hideMainContent() {
    debugMainContent.animate({
        translate: {x: realWidth, y: realHeight},
        duration:100
    });
}