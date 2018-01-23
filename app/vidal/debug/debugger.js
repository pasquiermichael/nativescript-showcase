var platformModule = require("tns-core-modules/platform");
var observableModule = require("data/observable");
var profiling = require("../../vidal/debug/profiling");

var pageData = new observableModule.fromObject({
    dheight: 25,
    dwidth: 25,
    fulled: false
});
exports.onLoad = function(args) {
    console.log("here");
    var b = args.object.parentNode;
    b.bindingContext = pageData;

    var realHeight = (platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale);
    var realWidth = (platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale);
    b.set("left", realWidth - b.width - 5);

    var page = b.parentNode.parentNode;
    var actionBar = page.getViewById('ab');
    b.set("top", realHeight - b.height - actionBar.height - 75);
};

exports.tap = function(args) {
    console.log("tap");
    profiling.fpsTick('deploy');
    var b = args.object.parentNode;
    var realHeight = (platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale);
    var realWidth = (platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale);
    var page = b.parentNode.parentNode;
    var actionBar = page.getViewById('ab');

    if (pageData.fulled === false) {
        var x = realWidth * -1 + b.width + 5;
        var y = realHeight * -1 + b.height + actionBar.height + 75;

        console.log(x);
        console.log(y);

        pageData.set("dheight", Math.round(realHeight - (actionBar.height - 75)));
        pageData.set("dwidth", Math.round(realWidth));
        pageData.set("fulled", true);

        b.animate({
            translate: { x: x, y: y},
            duration: 1000,
        }).then(function(e){
            profiling.fpsTick('deploy');
        });
    } else {
        var x = realWidth - 25 - 5; //I know
        var y = realHeight - 25 - actionBar.height - 75;

        b.animate({
            translate: { x: 0, y: 0},
            duration: 500,
        }).then(function(e){
            pageData.set("dheight", 25);
            pageData.set("dwidth", 25);
            pageData.set("fulled", false);
        });
        console.log("x:" +x);
        console.log("y:" +y);

    }

};