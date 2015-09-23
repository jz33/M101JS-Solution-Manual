"use strict";
/*
Parallel
http://book.mixu.net/node/ch7.html
*/
var items = [1, 2, 3, 4, 5, 6];
var results = [];

var async = function(arg, callback){
    console.dir('Do something with \''+arg+'\', return 1 sec later');
    setTimeout(function(){ 
        callback(null, arg.toString()); 
    }, 1000);
}

var final = function(){
    console.log("Done: ", results);
}

items.forEach(function(item) {
    async(item, function(error, result){
        if(error) process.exit(1);
        results.push(result);
        if(results.length == items.length) {
            final();
        }
    })
});
