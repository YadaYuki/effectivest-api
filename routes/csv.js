var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var loggerjs = require("./logger");
var json2csv = require("json2csv");
router.get("/get/:id", function (req, res, next) {
    const testId = req.params.id;
    loggerjs.info("get csv:" + testId);
    const selectQuestionQuery = "select question,answer from question where test_id = ?";
    connection.query(selectQuestionQuery, testId, function (err, result, fields) {
        if(err){loggerjs.error(err);res.json({});throw err}
        const questionCsv = json2csv.parse(result, ["question", "answer"]);
        const selectTestNameQuery = "select testname from test where test_id = ?";
        connection.query(selectTestNameQuery, testId, function (err, result, fields) {
            if(err){loggerjs.error(err);res.json({});throw err}
            const testName = result[0].testname;
            const encodedTestName = encodeURI(testName + ".csv");
            loggerjs.debug(encodedTestName);
            res.setHeader('Content-disposition', "attachment; filename=#;filename*=UTF-8''?".replace("#", encodedTestName).replace("?", encodedTestName));
            loggerjs.debug("attachment; filename=#;filename*=UTF-8''?".replace("#", encodedTestName).replace("?", encodedTestName));
            res.setHeader('Content-Type', 'text/csv; charset=UTF-8');
            res.status(200).send(questionCsv);
        });
    });
});
module.exports = router;