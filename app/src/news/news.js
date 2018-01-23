
var createViewModel = require("./news-view-model");
var newsModel;
var page;

function onNavigatingTo(args) {

    page = args.object;

    newsModel = createViewModel.newsViewModel;

    newsModel.loadNews();

    page.bindingContext = newsModel;

}

exports.onLoad = function(e){
    console.log("onload");
};

exports.onNavigatingTo = onNavigatingTo;

