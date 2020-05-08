var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var loggerjs = require("./logger");
var fs = require("fs");
var privateKey = fs.readFileSync("./private-key.pem", "utf8");
router.post("/add", function (req, res, next) {
    loggerjs.debug("add mistake:" + JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        res.json({ is_mistaked: false });
        loggerjs.info("token is incorrect");
    } else {
        loggerjs.info(userIdJson.user_id + " mistake insert");
        const insertMistakeQuery = "insert into mistake set ?";
        for (let mistake of req.body.mistake) {
            const mistakeJson = { result_id: mistake.result_id, question_id: mistake.question_id };
            connection.query(insertMistakeQuery, mistakeJson, function (err, result, field) {
                if (err) { loggerjs.error(err); res.json({ is_mistaked: false }); throw err }
            });
        }
        res.json({ is_mistaked: true });
    }
});
module.exports = router;