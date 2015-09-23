"use strict";
/*
Sequential Anonymous
http://book.mixu.net/node/ch7.html
*/
var items = [1, 2, 3, 4, 5, 6];

var async = function(arg, callback){
    console.dir('Do something with \''+arg+'\', return 1 sec later');
    setTimeout(function(){ 
        callback(null, arg.toString()); 
    }, 1000);
}

var final = function(results){
    console.log("Done: ", results);
}

var launch = function(callbacks, last) {
    var results = [];
    function next(){
        var callback = callbacks.shift();
        if(callback){
            callback(function(error, result){
                if(error) process.exit(1);
                results.push(result);
                next();
            });
        } else {
            last(results);
        }
    }
    next();
}

launch([
    function(next){async(1, next);},
    function(next){async(2, next);},
    function(next){async(3, next);},
    function(next){async(4, next);},
    function(next){async(5, next);},
    function(next){async(6, next);}
], final);
