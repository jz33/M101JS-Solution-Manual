// how many types
db.grades.aggregate([{$unwind : "$scores"}, {$group : {_id : "$scores.type"}}])
// double group
db.grades.aggregate([{$unwind : "$scores"}, {$match :{$or : [{"scores.type" : "exam "}, {"scores.type" : "homework"}]}}, {$group :{_id : {class_id : "$class_id", student_id : "$student_id"}, "average" : {$avg : "$scores.score"}}}, {$group : {_id : "$_id.class_id", "average": {$avg : "$average"}}},{$sort : {"_id" : 1}}])
