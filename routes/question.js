var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var loggerjs = require("./logger");
var fs = require("fs");
var privateKey = fs.readFileSync("./private-key.pem", "utf8");
router.get("/get/all", function (req, res, next) {
    loggerjs.info("get all question:", JSON.stringify(req.query));
    const selectQuestionQuery = "select question_id,question,answer from question where test_id=?";
    connection.query(selectQuestionQuery, req.query.test_id, function (err, result, field) {
        if (err) { loggerjs.error(err); res.json({}); throw err }
        res.json(result);
    });
    if(Boolean(req.query.is_test) == true){// increment  tested_times
        loggerjs.info("test all question:", JSON.stringify(req.query));
        const updateTestedTimesQuery = "update question set tested_times=tested_times+1 where test_id=?";
        connection.query(updateTestedTimesQuery, req.query.test_id, function (err, result, field) {
            if (err) { loggerjs.error(err); res.json({}); throw err }
        });
    }
});
router.get("/get/random", function (req, res, next) {
    loggerjs.info("get random question:", JSON.stringify(req.query));
    const selectQuestionQuery = "select question_id,question,answer from question where test_id=?";
    connection.query(selectQuestionQuery, req.query.test_id, function (err, result, field) {
        if (err) { loggerjs.error(err); res.json({}); throw err }
        res.json(result);
    });
});


module.exports = router;