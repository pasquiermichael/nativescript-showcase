var observableModule = require("data/observable");
var NewsViewModel = require("./news-view-model");
var frameModule = require("ui/frame");
var page;
var routing = require('../../../shared/routing.json');
var timerModule = require("timer");


var newsModel = NewsViewModel.newsViewModel;


var pageData = new observableModule.fromObject({
    news: newsModel,
    isLoading: false
});

function onNavigatingTo(args) {
    console.log("onNavigating");
    // appSettings.remove("listData");

    page = args.object;
    page.bindingContext = pageData;
    newsModel.empty();

    pageData.set("isLoading", true);
    newsModel.loadNews().then(function(e){
        pageData.set("isLoading", false);
    });
}

exports.onLoad = function(args){
    console.log("onload");
};

exports.imageLoadedHandler = function(e){
    e.object.animate({
        opacity:1,
        duration:500
    });
};

exports.tapHandler = function(e){
    console.log("tapHandler");

    var item = e.view.bindingContext;
    var index = newsModel.indexOf(item);
    var news = newsModel.getItem(index);

    if(!news){
        return;
    }

    frameModule.topmost().navigate({
        moduleName:routing.main.news.detail,
        transition:{
            name: "slide",
            duration: 150,
            curve: "easeOut"
        },
        bindingContext:news
    });
};

exports.onPTRInit = function(e){
    timerModule.setTimeout(function(){
        var listview = e.object;
        // newsModel.empty();
        newsModel.loadNews(true).then(function(e){
            listview.notifyPullToRefreshFinished();
        });
    }, 1500);
};

exports.onNavigatingTo = onNavigatingTo;

