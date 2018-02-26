var platformModule = require("tns-core-modules/platform");
var observableModule = require("data/observable");
var profiling = require("../../vidal/debug/profiling");
var realHeight;
var realWidth;
var debugMainContent;
var page;
var tracer = require("~/vidal/debug/tracer/tracer");

const DEBUG_MAIN_CONTENT_ID = "debuggerMainContent";

var pageData = new observableModule.fromObject({
    dbOpened: false
});

exports.init = function(args) {
    realHeight = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    realWidth = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;

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

exports.trace = function(message, type = tracer.LOG_TRACE_TYPE) {
    tracer.trace(message, type);
};



exports.T_ERR = tracer.ERR_TRACE_TYPE;
exports.T_LOG = tracer.LOG_TRACE_TYPE;
exports.T_QRY = tracer.QRY_TRACE_TYPE;
exports.T_PRF = tracer.PRF_TRACE_TYPE;

function hideMainContent() {
    debugMainContent.translateX = realWidth;
    debugMainContent.translateY = realHeight;
}
