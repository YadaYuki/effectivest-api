var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var bcrypt = require("bcrypt")

var privateKey = fs.readFileSync("./private-key.pem", "utf8");

router.get("/sample", function (req, res, next) {
    res.json({ sample: "sample" });
});

router.post("/login", function (req, res, next) {
    // generate hash password
    bcrypt.hash(req.body.password, 10, function (hash) {
        const selectUserQuery = "select id from t_user where e_mail=? and password=?";
        console.log(hash);
        connection.query(selectUserIdQuery, [req.body.email, hash], function (err, result, fields) {
            console.log("result")
            if (err) {
                res.json({ is_success: false });
                throw error;
            }

            if (!(result.length)) {// user does not exist.
                res.json({ is_success: false });
            } else {
                const userIdJson = result[0];
                res.json({ is_success: true, user_token: jwt.sign(userIdJson, privateKey) });
            }
        });
    });
});
module.exports = router;