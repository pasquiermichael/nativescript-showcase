var http = require('http');
var he = require('he');
var config = require('../../shared/config.json');
var connectivity = require("tns-core-modules/connectivity");
var parseString = require("nativescript-xml2js").parseString;

const TYPE_JSON = "application/json";
const TYPE_XML = "application/atom+xml";

module.exports = {
    callUrl:function(url){
        return new Promise(function(resolve, reject){

        if (connectivity.getConnectionType() === connectivity.connectionType.none) {
            //si offline caching
        }

        http.request({
            url:url,
            method: "GET"
        }).then(function(response){

            var statusCode = getStatusCode(response);
            var contentType = getContentType(response);
            var content = getContent(response);
            console.log(contentType);

            if (isNaN(statusCode) || statusCode !== 200) {
                reject(statusCode);
                //error code caching
            }

            var r = null;
            switch (contentType){
                case TYPE_JSON:
                    r = JSON.parse(content);
                    break;
                case TYPE_XML:
                    parseString(content, function(err, result){
                        r = result;
                        console.dir(r);
                        //resolve r ?
                    });
                    break;
                default:
                    console.log("unsupported content type");
                    break;
            }
            resolve(r);
        }, function(e){
                // caching
            reject(e);
           });
        });
    }
};

function getStatusCode(response){
    return response.statusCode;
}

function getContentType(response){
    var fullContentType = response.headers['Content-Type'];
    var contentType = fullContentType.split(";");
    return contentType[0];
}

function getContent(response){
    return response.content;
}
