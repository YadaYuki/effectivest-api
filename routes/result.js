var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var loggerjs = require("./logger");
var fs = require("fs");
var privateKey = fs.readFileSync("./private-key.pem", "utf8");
router.post("/add",function(req,res,next){
    loggerjs.info("result add " + JSON.stringify(req.body));
    // authentication
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({is_resulted:false});
        loggerjs.info("token is incorrect");
    }else{
        loggerjs.info(userIdJson.user_id + " result insert");
        const insertResultQuery = "insert into result set ?"
        const resultJson = {
            point:req.body.point,
            max_point:req.body.max_point,
            correct_rate:req.body.correct_rate,
            test_id:req.body.test_id,
            user_id:userIdJson.user_id,
        };
        connection.query(insertResultQuery,resultJson,function(err,result,field){
            if(err){loggerjs.error(err);res.json({is_resulted:false});throw err}
            res.json({is_resulted:true});
        });
    }
});
router.get("/get",function(req,res,next){
    loggerjs("result get:" + JSON.stringify(req.body));
    const selectResultQuery = "select point,max_point,correct_rate from result where id = ?";
    connection.query(selectResultQuery,[req.query.test_id],function(err,result,field){
        if(err){loggerjs.error(err);res.json({});throw err}
        loggerjs.debug(JSON.stringify(result));
        res.json(result);
    });
});
module.exports = router;