var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var NewsModel = require('../models/newsModel').NewsModel;

class HomeViewModel extends ObservableArray{}

var viewModel = new HomeViewModel();
var nModel = new NewsModel();

viewModel.getLastNews = function() {
    return nModel.getNewsById(22565).then(function(result){
        viewModel.set("news", result);
    });
};

exports.homeViewModel = viewModel;