var ObservableArray = require("data/observable-array").ObservableArray;

class TraceViewModel extends ObservableArray{
    unload(){
        while (this.length) {
            this.pop();
        }
    }
}

exports.traceViewModel = TraceViewModel;
