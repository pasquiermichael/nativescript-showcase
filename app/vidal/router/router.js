var route = require("../../shared/route");
var topmost = require("ui/frame").topmost;

const DEFAULT_ROUTE = "home";

module.exports = {
    navigateTo:function(routeName, binding, animation, animTransition){
        var routePath = getPathFromRoute(routeName);

        var nav = {
            moduleName: routePath,
            //bindingContext: binding,
            context: binding
        };

        if (animation === true) {
            nav.animated = animation;
            animTransition = animTransition === Object(animTransition) ? animTransition : getDefaultAnimation();
            nav.transition = animTransition;
        }

        global.currentRoute = routeName;
        topmost().navigate(nav);
    },

    getCurrentRoute:function(){
        return global.currentRoute;
    },

    setCurrentStartingRoute:function(){
        global.currentRoute = DEFAULT_ROUTE;
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