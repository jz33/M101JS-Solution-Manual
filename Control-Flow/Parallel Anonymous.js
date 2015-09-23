"use strict";
/*
Parallel Anonymous
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
    var count = 0;
    callbacks.forEach(function(callback, index) {
        callback(function(error, result){
            if(error) process.exit(1);
            results[index] = result;
            count++;
            if(count == callbacks.length) {
                last(results);
            }
        });
    });
}

launch([
    function(next){async(1, next);},
    function(next){async(2, next);},
    function(next){async(3, next);},
    function(next){async(4, next);},
    function(next){async(5, next);},
    function(next){async(6, next);}
], final);
