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
    if (Boolean(req.query.is_test) == true) {// increment  tested_times
        loggerjs.info("test all question:", JSON.stringify(req.query));
        const updateTestedTimesQuery = "update question set tested_times=tested_times+1 where test_id=?";
        connection.query(updateTestedTimesQuery, req.query.test_id, function (err, result, field) {
            if (err) { loggerjs.error(err); res.json({}); throw err }
        });
    }
});
router.get("/get/random", function (req, res, next) {
    loggerjs.info("get random question:", JSON.stringify(req.query));
    const selectQuestionQuery = "select question_id,question,answer from question where test_id=? order by rand() limit ?";
    connection.query(selectQuestionQuery, [req.query.test_id, parseInt(req.query.question_num)], function (err, result, field) {
        if (err) { loggerjs.error(err); res.json({}); throw err }
        res.json(result);
        // update tested_time
        loggerjs.info("test random question:", JSON.stringify(req.query));
        const updateTestedTimesQuery = "update question set tested_times=tested_times+1 where question_id=?";
        for (let item of result) {
            loggerjs.debug(JSON.stringify(item));
            connection.query(updateTestedTimesQuery, item.question_id, function (err, result_update, field) {
                if (err) { loggerjs.error(err); throw err }
            });
        }
    });
});
router.get("/get/week", function (req, res, next) {
    loggerjs.info("get week question:", JSON.stringify(req.query));
    const selectQuestionQuery = "select question_id,question,answer from question where test_id=? order by correct_rate limit ?";
    connection.query(selectQuestionQuery, [req.query.test_id, parseInt(req.query.question_num)], function (err, result, field) {
        if (err) { loggerjs.error(err); res.json({}); throw err }
        res.json(result);
        loggerjs.info("test week question:", JSON.stringify(req.query));
        const updateTestedTimesQuery = "update question set tested_times=tested_times+1 where question_id=?";
        for (let item of result) {
            loggerjs.debug(JSON.stringify(item));
            connection.query(updateTestedTimesQuery, [item.question_id], function (err, result_update, field) {
                if (err) { loggerjs.error(err); throw err }
            });
        }
    });
});
router.post("/add", function (req, res, next) {
    loggerjs.info("add question:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({});
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " add question");
        const insertQuestionQuery = "insert into question set ?";
        questionJson = {
            question: req.body.question,
            answer: req.body.answer,
            test_id: req.body.test_id,
        };
        connection.query(insertQuestionQuery, questionJson, function (err, result, next) {
            if (err) { loggerjs.error(err); res.json({}); throw err }
            res.json({ question_id: result.insertId });
        });
    }
});
router.delete("/delete", function (req, res, next) {
    loggerjs.info("delete question:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({ is_deleted: false });
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " delete question");
        const deleteQuestionQuery = "delete from question where question_id=?";
        connection.query(deleteQuestionQuery, req.body.question_id, function (err, result, next) {
            if (err) { loggerjs.error(err); res.json({ is_deleted: false }); throw err }
            res.json({ is_deleted: true });
        });
    }
});
router.put("/update/correct_time", function (req, res, next) {
    loggerjs.info("update question correct time:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({ is_updated: false });
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " update question correct_rate and correct_times");
        const updateQuestionQuery = "update question set correct_times=correct_times+1,correct_rate=correct_times/tested_times where question_id=?";
        const qidArr = req.body.question_id;
        res.json({ is_updated: true });
        for (let question_id of qidArr) {
            loggerjs.debug(question_id);
            connection.query(updateQuestionQuery, [question_id], function (err, result, field) {
                loggerjs.debug(JSON.stringify(result));
                if (err) { loggerjs.error(err); throw err }
            });
        }
    }
});
router.put("/update", function (req, res, next) {
    loggerjs.info("update question " + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({ is_updated: false });
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " update question");
        const updateQuestionQuery = "update question set question=?,answer=? where question_id=?";
        connection.query(updateQuestionQuery, [req.body.question, req.body.answer, req.body.question_id], function (err, result, field) {
            if (err) { loggerjs.error(err);req.json({is_updated:false}); throw err;}
            res.json({is_updated:true});
        });
    }
});
module.exports = router;