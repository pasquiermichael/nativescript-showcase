var debug = require("~/vidal/debug/debugger");
var observableModule = require("data/observable");
var page;
var TraceViewModel = require("../trace-view-model");

var logs = new TraceViewModel.traceViewModel();
var errors = new TraceViewModel.traceViewModel();
var queries = new TraceViewModel.traceViewModel();
var perfs = new TraceViewModel.traceViewModel();

const ERR_TRACE_TYPE = "ErrType";
const LOG_TRACE_TYPE = "LogType";
const QRY_TRACE_TYPE = "QryType";
const PRF_TRACE_TYPE = "PrfType";

var pageData = new observableModule.fromObject({
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

exports.onLoad = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};


exports.clearTrace = function(args) {
    var type = args.object.type;
    var tab = pageData.get("traces");
    if (type !== undefined && type !== '') {
        tab[type].unload();
        updateTraceCount(type);
    } else {
        for(var typeTab in tab){
            if(tab.hasOwnProperty(typeTab)){
                tab[typeTab].unload();
                updateTraceCount(typeTab);
            }
        }
    }
};

exports.trace = function(message, type) {
    var tab = pageData.get("traces")[type];
    if (tab !== undefined) {
        tab.unshift({
            type:type,
            message:message,
            date:new Date().toTimeString()
        });

        updateTraceCount(type, tab.length);
    }
};

exports.ERR_TRACE_TYPE = ERR_TRACE_TYPE;
exports.LOG_TRACE_TYPE = LOG_TRACE_TYPE;
exports.QRY_TRACE_TYPE = QRY_TRACE_TYPE;
exports.PRF_TRACE_TYPE = PRF_TRACE_TYPE;

function updateTraceCount(type, lgt = 0) {
    pageData.set([type],lgt);
}
