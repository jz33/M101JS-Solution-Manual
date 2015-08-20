"use strict";
var mongoClient = require('mongodb').MongoClient;
var databaseName = "school";
var collectionName = "students";
/*
Import table:
mongoimport -d school -c students < students.json
*/
mongoClient.connect("mongodb://localhost:27017/"+databaseName, function(err, db){
    if(err) throw err;
    var data = db.collection(collectionName);
    
    // for debug
    var select = {"name" : "aimee Zank"}; 
    select = {};

    data.find(select).toArray(function(err,docs){
        if(err) throw err;
        var savesPending = docs.length;

        docs.forEach(function(doc){
            
            // find lowest score and its index
            var lowest_score = 100;
            var lowest_index = -1;       
            var scores = doc["scores"];
            scores.forEach(function(score, index){
                if(score["type"] === "homework" && score["score"] < lowest_score){
                    lowest_score = score["score"];
                    lowest_index = index;
                }
            });
            
            // construct new scores for update
            doc["scores"].splice(lowest_index,1);
            
            var select = {"_id" : doc["_id"]};
            var setter = {"$set" :{"scores" : doc["scores"]}};
            data.update(select, setter, function(err,updated){
                if(err) throw err;
               
                savesPending--;
                if(savesPending == 0) db.close();
            }); 
        }); 
    });    
});
