var DetailViewModel = require("./detail-view-model");
var htmlViewModule = require("tns-core-modules/ui/html-view");
var imageModule = require("tns-core-modules/ui/image");
var html = require("~/vidal/utils/html");
var timerModule = require("timer");
var observableModule = require("data/observable");

var detailViewModel = DetailViewModel.detailViewModel;
var pageData = new observableModule.fromObject({
    news: detailViewModel,
    isLoading: true,
    loadIndicator: "visible",
    opacity: 0
});

var page;

exports.navigatingToHandler = function(args){
    page = args.object;
    var news = page.navigationContext;
    pageData.set("news", news);
    pageData.set("loadIndicator", "visible");
    pageData.set("isLoading", true);

    page.bindingContext = pageData;
};

exports.loadedHandler = function(args){
    //page = args.object;
    var mainContainer = page.getViewById("newsDetailMainContent");
    var cn = pageData.get("news").content_news;
    var subContainer = page.getViewById("mainNewsDetailContent");

    //timerModule.setTimeout(function(){
    console.log(mainContainer);
        recreateContentView(cn, subContainer).then(function(e){
            pageData.set("isLoading", false);
            pageData.set("loadIndicator", "collapse");
            console.log(recreateContentView);
            timerModule.setTimeout(function(){
                mainContainer.animate({
                    opacity:1,
                    duration:350
                });
            }, 500);
        });


    //}, 1000);

};

function recreateContentView(content, container) {
    console.log("recreateContentView");
    return new Promise(function(resolve, reject){
        try{
            var imgReg = html.getImgRegex();
            var imgMatches = content.match(imgReg);
            var splitContent = content.split(imgReg);

            for(var i= 0, max=splitContent.length; i<max; i++) {
                createHtmlView(splitContent[i], container);

                //ptetre plus élégant que ça comme vérif
                if (imgMatches !== null) {
                    if (imgMatches[i] !== undefined) {
                        createImgView(imgMatches[i], container);
                    }
                }
            }

            resolve(true);
        } catch(e){
            console.log(e);
        }
    });

}

function createHtmlView(source, container) {
    var hv = new htmlViewModule.HtmlView();
    hv.html = source;
    container.addChild(hv);
}

function createImgView(source, container) {
    var srcReg = html.getSrcRegex();
    var img = new imageModule.Image();
    var srcMatches = source.match(srcReg);
    if (srcMatches !== null) {
        img.src = srcMatches[0];
        container.addChild(img);
    }
}

