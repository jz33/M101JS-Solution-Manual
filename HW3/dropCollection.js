"use strict";
var mongoClient = require('mongodb').MongoClient;
var databaseName = "school";
var collectionName = "students";
var fullName = databaseName + "." + collectionName;
/*
Drop a collection if exists.
*/
mongoClient.connect("mongodb://localhost:27017/"+databaseName, function(err, db){
    if(err) throw err;
    
    var query = {"name" : fullName};
    db.collection("system.namespaces").find(query).toArray(function(err,docs){
        if(err) throw err;
        if(docs.length == 0){
            console.dir(fullName + " not exists.");
            return db.close();
        }
        else{
            db.collection(collectionName).drop(function(err,reply){
                if(err) throw err;
        
                console.dir(fullName + " dropped.");
                db.close();
            });
        }
    });     
});
