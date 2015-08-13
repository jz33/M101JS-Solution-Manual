"use strict";

var mongoClient = require('mongodb').MongoClient;

var databaseName = "weather";
var collectionName = "data";

mongoClient.connect('mongodb://localhost:27017/'+databaseName, function(err, db){
    if(err) throw err;

    var data = db.collection(collectionName);
    var key = "State";
    
    /*
    By counting docs that are going to update.
    it is possible to know when to close db.
    */
    data.distinct(key, function(err,docs){
        if(err) throw err;
        
        var savesPending = docs.length;
        console.log(savesPending);

        var options = {'sort' : [['State', 1], ['Temperature', -1]]};
        var cursor = data.find({}, {}, options);
        
        var newInfo = {"$set" :{"month_high" : true}};
        var prev = "";
        
        cursor.each(function(err, doc){
            if(err) throw err;

            if(doc == null)
                return;
            
            if(doc.State !== prev){
                prev = doc.State;
                console.dir(doc);
        
                var query = {"_id" : doc["_id"]};
                data.update(query,newInfo,function(err,updated){
                    if(err) throw err;
            
                    console.log("Updated: " + updated);
                    savesPending--;
                
                    if(savesPending == 0)
                        db.close();
                });
            }
        }); 
    });
});