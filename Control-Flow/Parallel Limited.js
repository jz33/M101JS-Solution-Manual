"use strict";
/*
Parallel Limited
http://book.mixu.net/node/ch7.html
*/
var items = [1, 2, 3, 4, 5, 6];
var results = [];
var running = 0;
var limit = 3;

var async = function(arg, callback){
    console.dir('Do something with \''+arg+'\', return 1 sec later');
    setTimeout(function(){ 
        callback(null, arg.toString()); 
    }, 1000);
}

var final = function(){
    console.log("Done: ", results);
}

var launch = function(){
    for(;running < limit && items.length > 0;running++){
        var item = items.shift();
        async(item, function(error, result){
            if(error) process.exit(1);
            results.push(result);
            running--;         
            if(items.length > 0){
                launch();
            }
            else if(running == 0){
                final();
            }
        });
    }
}

launch();
