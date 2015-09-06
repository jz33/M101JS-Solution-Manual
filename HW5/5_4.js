// use regex 
db.zips.aggregate([{$project:{pop : 1, first_char : {$substr : ["$city", 0, 1]}}}, {$match : {"first_char" : {$regex : /\d/}}},{$group: {_id : null, total : {$sum : "$pop"}}}])
