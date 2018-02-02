var observableModule = require('data/observable');
var NewsModel = require('../../models/newsModel').NewsModel;
var appSettings = require("application-settings");
var appCache = require('../../../vidal/cache/appCache');

class NewsViewModel extends observableModule.Observable {}

var bc = new NewsViewModel();
bc.set("isLoading", false);
var nModel = new NewsModel();

bc.loadNews = function(){
    bc.set("isLoading", true);

    return nModel.getAllNews().then(function(results){
        bc.set("news", results);
        bc.set("isLoading", false);
        appCache.setString("listData", JSON.stringify(results));
    });
};


exports.newsViewModel = bc;


