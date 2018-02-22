var observableModule = require("data/observable");
var NewsViewModel = require("./news-view-model");
var page;
var timerModule = require("timer");
var router = require("../../../vidal/router/router");

var newsModel = NewsViewModel.newsViewModel;
var debug = require("~/vidal/debug/debugger");

var pageData = new observableModule.fromObject({
    news: newsModel,
    isLoading: false
});

function onNavigatingTo(args) {
    page = args.object;
    pageData.set("isLoading", true);
    //page.actionBarHidden = true;

    page.bindingContext = pageData;
    newsModel.empty();

    timerModule.setTimeout(function(){
        newsModel.loadNews().then(function(e){
            pageData.set("isLoading", false);
        });
    }, 100);

    debug.trace("News trace LGO");
}

exports.onLoad = function(args){
    console.log("onload");
};

exports.imageLoadedHandler = function(e){
    console.log("imageLH");
    e.object.animate({
        opacity:1,
        duration:2000
    });
};

exports.tapHandler = function(e){
    var item = e.view.bindingContext;
    var index = newsModel.indexOf(item);
    var news = newsModel.getItem(index);

    if(!news){
        return;
    }

    var transition = {
        name: "slide",
        duration: 500,
        curve: "easeOut"
    };

    router.navigateTo("news_detail", news, true, transition);

};

exports.onPTRInit = function(e){
    timerModule.setTimeout(function(){
        e.object.animate({
            opacity:1,
            duration:500
        });
        var listview = e.object;

        listview.animate({
            opacity:0,
            duration:200
        }).then(function(){
            newsModel.empty();
            newsModel.loadNews(true).then(function(e){
                listview.notifyPullToRefreshFinished();
            });
        });

    }, 1000);
};

exports.onNavigatingTo = onNavigatingTo;

