var performance = require("performance-now");
var fs = require("tns-core-modules/file-system");
var fps = require("tns-core-modules/fps-meter");

var timeFragments = {};
var fpsFragments = {};
var loggedElement = [];

var androidDocuments = android.os.Environment.DIRECTORY_DOCUMENTS;
var debugFolderName = "profiling-logs";
var debugFileName = "performance.txt";

module.exports = {
    /**
     * Gives time to execute in ms
     * Usage: one call at the start, one at the end
     * @param idFragment, str used to identify the benched segment
     */
    timeTick:function(idFragment) {
        var t0 = performance();
        if (timeFragments.hasOwnProperty(idFragment)) {
            var t1 = timeFragments[idFragment][0];
            delete timeFragments[idFragment];
            var t = t0 - t1;
            var toDisplay = idFragment + ": " + t + "ms";
            console.log(toDisplay);
            loggedElement.push(toDisplay);
        } else {
            timeFragments[idFragment] = [t0];
        }
    },
    /**
     * Gives the average frame per second
     * Usage: one call at the start, one at the end
     * @param idFragment, str used to identify the benched segment
     */
    fpsTick:function(idFragment) {


        if (fpsFragments.hasOwnProperty(idFragment)) {
            var total = 0;
            var l = fpsFragments[idFragment].length - 1;
            for(var j=1; j<=l; j++) {
                total += fpsFragments[idFragment][j];
                console.log("addingTottal: "+total);
            }

            // fps.removeCallback(fpsFragments[idFragment][0]);
            // fps.stop();
            // delete fpsFragments[idFragment];
            console.log("total :"+total);
            console.log("average :"+total/l);
        } else {
            fpsFragments[idFragment] = [];
            if (fps.running() === false) {
                fps.start();
            }

            var i = 0;
            fpsFragments[idFragment][i] = fps.addCallback(function(fps, minFps){
                fpsFragments[idFragment][++i] = fps;
                console.log(fps);
            });
        }
    },
    /**
     * Write all tick() logs of the current execution in a file
     * @param fileName, str used to define the output filename
     * Need the following permissions in android :
     * "android.permission.INTERNET",
     * "android.permission.READ_EXTERNAL_STORAGE",
     * "android.permission.WRITE_EXTERNAL_STORAGE",
     */
    logToFile:function(fileName) {
        fileName = fileName || debugFileName;
        var androidDocumentsPath = android.os.Environment.getExternalStoragePublicDirectory(androidDocuments).toString();
        var folderPath = fs.path.join(androidDocumentsPath, debugFolderName);
        var fullFilePath = fs.path.join(folderPath , fileName);
        var file = fs.File.fromPath(fullFilePath);

        var data = "";
        for (var i = 0, max = loggedElement.length; i < max; i++) {
            data += loggedElement[i] + '\n\r';
        }

        file.writeText(data)
            .then(function () {
                console.log("Success writing log file : "+fullFilePath);
            }, function (error) {
                // Failed to readfile file.
                console.log("Error writing log file : "+error);
            });
    }

};

/*************IDEA**************/
// Add parameter to allow keeping the logs instead of overwriting everytime genre il en écri un noeuveau avec la date
// Do on iOS
// on log plusieurs breakpoint pour la meme idfrag
// associer des descriptif supplémenaire par idFragment; Genre sur X appels etc

/****************************/