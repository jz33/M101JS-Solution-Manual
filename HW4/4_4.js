"use strict";
var mongoClient = require('mongodb').MongoClient;

var databaseName = "m101";
var collectionName = "profile";

mongoClient.connect('mongodb://localhost:27017/'+databaseName, function(err, db){
    if(err) throw err;
    var data = db.collection(collectionName);

    data.createIndex({"op": 1, "ns" : 1},function(err,indexName){
        if(err) throw err;       
        console.log(indexName);
        
        data.createIndex({"millis": -1},function(err,indexName){
            if(err) throw err;       
            console.log(indexName);
            
            /*
            data.explain("executionStats").find({"op": "query", "ns" : "school2.students"},{"_id":0, "millis": 1}).sort({"millis":-1}).limit(1)
            "totolDocsExamined" : 1
            */
            var criteria = {"op": "query", "ns" : "school2.students"};
            var show = {"_id" : 0, "millis" : 1};
            var options = {"sort" : [["millis" , -1]], "limit" : 1};
            data.find(criteria,show,options).toArray(function(err,docs){
                if(err) throw err;
                if(docs.length == 0){
                    console.dir("0 found");
                } else {
                    console.dir(JSON.stringify(docs[0]));
                }
                db.close();
            });
        });
    });
});
