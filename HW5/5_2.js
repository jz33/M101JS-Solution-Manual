// double match, double group
db.zips.aggregate([{$match : {$or :[{"state" : "CA"},{"state": "NY"}]}},{$group :{_id : "$city", "population" : {$sum : "$pop"}}}, {$match : {"population" : {$gt : 25000}}},{$group : {_id : null, "population" : {$avg : "$population"}}}])
