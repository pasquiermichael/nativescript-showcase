var http = require('http');
var he = require('he');
var dictionary = require('../../shared/dictionnary');
var config = require('../../shared/config.json');
var api = require('../../vidal/api/api');

class NewsModel {
    constructor() {

    }

    getAllNews(order) {
        order = order || 'publication_date_news:desc';
        var url = config.api.resources.url+"news?order="+order+"&token="+config.api.resources.token;
        var news;

        return new Promise(function(resolve, reject) {
            api.callUrl(url).then(function(r){
                var cIndex = 0;
                for(var i = 0, max = r.results.length; i<max; i++){
                    r.results[i].decoded_title = he.decode(r.results[i].title_news);
                    r.results[i].type.decoded_name = he.decode(r.results[i].type.name_type);
                    r.results[i].author.name_user = he.decode(r.results[i].author.name_user);
                    r.results[i].author.firstname_user = he.decode(r.results[i].author.firstname_user);
                    r.results[i].formated_date = formatDate(r.results[i].publication_date_news);
                    r.results[i].abr_title = r.results[i].decoded_title.substring(0,50);
                    r.results[i].image = r.results[i].images[0].url_image;
                    r.results[i].index = cIndex;
                    r.results[i].hg = Math.floor(Math.random() * (480 - 120) + 120);
                    if(i%2 === 0) {
                        cIndex++;
                    }
                }

                news = r.results;
                resolve(news);
            }, function(e){
                reject(e);
            });
        });
    }

    getNews(number=1) {
        var url = config.api.resources.url+"news?replies="+number+"&token="+config.api.resources.token;

        return new Promise(function(resolve, reject){
            api.callUrl(url).then(function(r){
                var news = {};
                news.decoded_title = he.decode(r.results[0].title_news);
                news.image = r.results[0].images[0].url_image;
                resolve(news);
            }, function(error){
                reject(error);
            });
        });
    }

    getNewsById(id) {
        var url = config.api.resources.url+"news/"+id+"?token="+config.api.resources.token;
        // var news = {};
        return new Promise(function(resolve, reject){
            api.callUrl(url).then(function(r){
                var news = {};
                news.decoded_title = he.decode(r.results[0].title_news);
                news.image = r.results[0].images[0].url_image;
                resolve(news);
            });
        });
    }
}

function formatDate(pDate){
    let d = pDate.split('-');
    return d[2]+" "+dictionary.months[Number(d[1])-1]+" "+d[0];
}

exports.NewsModel = NewsModel;