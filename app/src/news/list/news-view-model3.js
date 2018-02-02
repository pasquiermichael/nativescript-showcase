var observableModule = require('data/observable');
var NewsModel = require('../../models/newsModel').NewsModel;
var appSettings = require("application-settings");
var appCache = require('../../../vidal/cache/appCache');
var ObservableArray = require("data/observable-array").ObservableArray;

function NewsViewModel(items) {
    var viewModel = new ObservableArray(items);
    var nModel = new NewsModel();

    viewModel.loadNews = function() {
        var d = appCache.getString("listData2");
        if(d !== undefined) {
            return new Promise(function(resolve, reject) {
                var results = JSON.parse(d);
                if (results === undefined) {
                    reject("no");
                }
                pushData(viewModel, results);

                resolve(results);
            });
        } else {
            return nModel.getAllNews().then(function(results){
                pushData(viewModel, results);


                appCache.setString("listData2", JSON.stringify(results));

            });
        }
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}


function pushData(viewModel, data) {
    data.forEach(function(news) {
        viewModel.push({
            decoded_title: news.decoded_title,
            decoded_name: news.type.decoded_name,
            name_user: news.author.name_user,
            firstname_user: news.author.firstname_user,
            formated_date: news.publication_date_news,
            abr_title: news.abr_title,
            image: news.image,
            index: news.cIndex,
            hg: news.hg
        });
    });
}


module.exports = NewsViewModel;











