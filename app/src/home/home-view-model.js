var ObservableArray = require("data/observable-array").ObservableArray;
var NewsModel = require('~/src/models/newsModel').NewsModel;

class HomeViewModel extends ObservableArray{}

var viewModel = new HomeViewModel();
var nModel = new NewsModel();

viewModel.getLastNews = function() {
    return nModel.getNews(1).then(function(result){
        viewModel.set("news", result);
        return result;
    }, function(error){
        console.log("inERROR");
    });
};

exports.homeViewModel = viewModel;