var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var loggerjs = require("./logger");
var fs = require("fs");
var privateKey = fs.readFileSync("./private-key.pem", "utf8");
router.get("/get", function (req, res, next) {
    const testId = req.query.test_id;
    loggerjs.debug(testId + " get");
    const selectTestQuery = "select testname,description,question_num,created_on from test where test_id=?";
    connection.query(selectTestQuery, [testId], function (err, result, field) {
        if (err) { loggerjs.error(err); res.json({}); throw err; }
        loggerjs.debug(JSON.stringify(result))
        res.json(result[0]);
    });
});

router.get("/get/all", function (req, res, next) {
    loggerjs.debug("get all test");
    const userIdJson = jwt.verify(req.query.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({});
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " get all test");
        const selectTestQuery = "select testname,description,question_num,created_on from test where user_id=?";
        connection.query(selectTestQuery, [userIdJson.user_id], function (err, result, field) {
            if (err) { loggerjs.error(err); res.json({}); throw err; }
            loggerjs.debug(JSON.stringify(result))
            res.json(result);
        });
    }
});

router.post("/add", function (req, res, next) {
    loggerjs.debug("add test:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    loggerjs.debug("userIdJson:" + JSON.stringify(userIdJson));
    if (!(userIdJson.user_id)) {
        res.json({});
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " add test");
        const insertTestQuery = "insert into test set ?";
        const testJson = {
            testname:req.body.testname,description:req.body.description,question_num:req.body.question_num
        };
        connection.query(insertTestQuery, testJson, function (err, result, field) {
            if (err) { loggerjs.error(err); res.json({}); throw err; }
            loggerjs.debug(JSON.stringify(result))
            res.json({test_id:result.insertId});
        });
    }
});

router.put("/update",function(req,res,next){
    loggerjs.debug("update test:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({});
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " update test");
        const updateTestQuery = "update test set testname=?,description=?,question_num=? where test_id=?";
        connection.query(updateTestQuery,[req.body.testname,req.body.description,req.body.question_num,userIdJson.user_id],function(err,result,field){
            if (err) { loggerjs.error(err); res.json({is_updated:false}); throw err; }
            res.json({is_updated:true});
        });
    }
});

router.delete("/delete",function(req,res,next){
    loggerjs.debug("delete test:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({});
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " delete test " + req.body.test_id);
        const deleteTestQuery = "delete from test where test_id=?";
        connection.query(deleteTestQuery,req.body.test_id,function(err,result,field){
            if (err) { loggerjs.error(err); res.json({is_deleted:false}); throw err; }
            res.json({is_deleted:true});
        });
    }
});


module.exports = router;