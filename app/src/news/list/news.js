
var createViewModel = require("./news-view-model");
var newsModel;
var page;

function onNavigatingTo(args) {
    console.log("onNavigating");
    page = args.object;
    newsModel = createViewModel.newsViewModel;
    newsModel.loadNews().then(function(e){
        page.bindingContext = newsModel;
    });

}

exports.onLoad = function(e){
    console.log("onload");


};

exports.imageLoadedHandler = function(e){
    e.object.animate({
        opacity:1,
        duration:2000
    });
};

exports.tapHandler = function(e){
    console.dir(e.object);
};

exports.onNavigatingTo = onNavigatingTo;

