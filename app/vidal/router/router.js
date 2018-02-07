var route = require("../../shared/route");
var topmost = require("ui/frame").topmost;
var appSettings = require("application-settings");

const CURRENT_ROUTE = "currentRoute";

module.exports = {
    navigateTo:function(routeName, binding, animation, animTransition){
        var routePath = getPathFromRoute(routeName);

        var nav = {
            moduleName: routePath,
            bindingContext: binding
        };

        if (animation === true) {
            nav.animated = animation;
            animTransition = animTransition === Object(animTransition) ? animTransition : getDefaultAnimation();
            nav.transition = animTransition;
        }

        appSettings.setString(CURRENT_ROUTE, routeName);
        topmost().navigate(nav);
    },

    getCurrentRoute:function(){
        return appSettings.getString(CURRENT_ROUTE);
    },

    setCurrentStartingRoute:function(){
        appSettings.setString(CURRENT_ROUTE, "home");
    }
};

function getPathFromRoute(routeName){
    return route[routeName].path;
}

function getDefaultAnimation(){
    return {
        name: "slide",
        duration: 300,
        curve: "easeOut"
    }
}