var appSettings = require("application-settings");
var connectivity = require("tns-core-modules/connectivity");
const DEFAULT_CACHE_LIFETIME = 1;

module.exports = {
    setString:function(id, data) {
        var currDate = new Date();
        appSettings.setString(id, data);
        appSettings.setString(id+"_t_", currDate.toLocaleString());
    },
    getString:function(id, forceRefresh = false, cacheLife = DEFAULT_CACHE_LIFETIME) {
        if(forceRefresh === true && connectivity.getConnectionType() !== connectivity.connectionType.none) {
            console.log("Forcing refresh...");
        } else {
            var currDate = new Date();
            var dataDate = appSettings.getString(id+'_t_');

            console.log("cache date: "+dataDate);
            console.log("now date: "+currDate);

            if(appSettings.getString(id) !== undefined && dataDate !== undefined) {

                dataDate = new Date(dataDate);
                var timeElapsed = currDate - dataDate;
                console.log("time elapsed in minutes: "+timeElapsed/1000/60);

                if(timeElapsed >= cacheLife && connectivity.getConnectionType() !== connectivity.connectionType.none) {
                    return;
                }

                console.log("Cache is still fresh");
            }

            return appSettings.getString(id);
        }
    }
};

