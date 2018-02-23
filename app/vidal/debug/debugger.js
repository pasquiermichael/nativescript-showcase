var platformModule = require("tns-core-modules/platform");
var observableModule = require("data/observable");
var profiling = require("../../vidal/debug/profiling");
var TraceViewModel = require("./trace-view-model");
var realHeight;
var realWidth;
var debugMainContent;
var traceContainer;
var page;

var logs = new TraceViewModel.traceViewModel();
var errors = new TraceViewModel.traceViewModel();
var queries = new TraceViewModel.traceViewModel();
var perfs = new TraceViewModel.traceViewModel();

const DEBUG_MAIN_CONTENT_ID = "debuggerMainContent";
const TRACE_CONTAINER_ID = "traceContainer";

const ERR_TRACE_TYPE = "ErrType";
const LOG_TRACE_TYPE = "LogType";
const QRY_TRACE_TYPE = "QryType";
const PRF_TRACE_TYPE = "PrfType";

var pageData = new observableModule.fromObject({
    dbOpened: false,
    traces: {
        [LOG_TRACE_TYPE]:logs,
        [ERR_TRACE_TYPE]:errors,
        [QRY_TRACE_TYPE]:queries,
        [PRF_TRACE_TYPE]:perfs
    },
    [LOG_TRACE_TYPE]:0,
    [ERR_TRACE_TYPE]:0,
    [QRY_TRACE_TYPE]:0,
    [PRF_TRACE_TYPE]:0
});

//peut se lancer apres dautre call
exports.init = function(args) {
    console.log("debuggerInit");
    realHeight = (platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale);
    realWidth = (platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale);

    //ya surement miex pour recp la page usr un compo?
    page = args.object.parentNode;
    args.object.bindingContext = pageData;
    debugMainContent = page.getViewById(DEBUG_MAIN_CONTENT_ID);
    traceContainer = page.getViewById(TRACE_CONTAINER_ID);

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

exports.trace = function(message, type = LOG_TRACE_TYPE) {
    var tab = pageData.get("traces")[type];
    //gérer undefined//
    tab.unshift({
        type:type,
        message:message
    });

    updateTraceCount(type, tab.length);
};

exports.clearTrace = function(args) {
    var type = args.object.type;
    var tab = pageData.get("traces")[type];
    tab.unload();
    updateTraceCount(type);
};

exports.ERR_TRACE_TYPE = ERR_TRACE_TYPE;
exports.LOG_TRACE_TYPE = LOG_TRACE_TYPE;
exports.QRY_TRACE_TYPE = QRY_TRACE_TYPE;
exports.PRF_TRACE_TYPE = PRF_TRACE_TYPE;

function hideMainContent() {
    debugMainContent.translateX = realWidth;
    debugMainContent.translateY = realHeight;
}

function updateTraceCount(type, lgt = 0) {
    pageData.set([type],lgt);
}