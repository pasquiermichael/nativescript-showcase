var observableModule = require('data/observable');
var NewsModel = require('../models/newsModel').NewsModel;

class NewsViewModel extends observableModule.Observable {}

var bc = new NewsViewModel();
bc.set("test", "hello");
bc.set("isLoading", false);
var nModel = new NewsModel();

bc.loadNews = function(){
    nModel.getAllNews().then(function(results){
        bc.set("news", results);
    });
};

exports.newsViewModel = bc;


