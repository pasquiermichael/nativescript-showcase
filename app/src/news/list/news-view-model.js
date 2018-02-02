var observableModule = require('data/observable');
var NewsModel = require('../../models/newsModel').NewsModel;
var appSettings = require("application-settings");
var appCache = require('../../../vidal/cache/appCache');
var ObservableArray = require("data/observable-array").ObservableArray;

class NewsViewModel extends ObservableArray{}

    var viewModel = new NewsViewModel();
    var nModel = new NewsModel();

    viewModel.loadNews = function(forceRefresh = false) {
        var d = appCache.getString("listData2", forceRefresh);
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
            hg: news.hg,
            summary_news: news.summary_news,
            content_news: news.content_news
        });
    });
}


exports.newsViewModel = viewModel;











