var express = require('express');
var router = express.Router();
var connection = require("./mysql");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var bcrypt = require("bcrypt")
var loggerjs = require("./logger");
var privateKey = fs.readFileSync("./private-key.pem", "utf8");

router.get("/sample", function (req, res, next) {
    res.json({ sample: "sample" });
});

router.post("/login", function (req, res, next) {
    // generate hash password
    loggerjs.debug(JSON.stringify(req.body));
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const selectUserQuery = "select user_id,password from user where email=? or username=?";
        connection.query(selectUserQuery, [req.body.username, req.body.username], function (err, result, fields) {
            loggerjs.debug(JSON.stringify(result));
            if (err) {
                loggerjs.info("login failed error");
                res.json({ is_login: false });
                throw error;
            }
            if (!(result.length)) {// user does not exist.
                loggerjs.info("login failed user not exist");
                res.json({ is_login: false });
            } else if (bcrypt.compareSync(req.body.password, result[0].password)) {
                const userIdJson = {user_id:result[0].user_id };
                loggerjs.info(userIdJson.user_id + ":login");
                res.json({ is_login: true, user_token: jwt.sign(userIdJson, privateKey) });
            } else {
                loggerjs.info("login failed password is incorrect");
                res.json({is_login:false});
            }
        });
    });
});
router.post("/regist", function (req, res, next) {
    loggerjs.debug(JSON.stringify(req.body));
    // validate whether username or email exist;
    const selectUserQuery = "select user_id from user where email=? or username=?;";
    connection.query(selectUserQuery, [req.body.email, req.body.username], function (err, result, fields) {
        if (err) {
            loggerjs.error(err);
            res.json({ is_regist: false });
            throw err;
        }
        if (result.length) {
            loggerjs.info("user already exist");
            res.json({ is_regist: false });
        } else {
            const hash = bcrypt.hashSync(req.body.password, 10);
            const insertUserQuery = "insert into user set ?"
            const userJson = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };
            connection.query(insertUserQuery, userJson, function (err, result, fields) {
                if (err) { loggerjs.error(err); res.json({ is_regist: false });throw err; }
                loggerjs.info(result.insertId + ":registerd");
                const userIdJson = { user_id: result.insertId };
                res.json({ is_regist: true, user_token: jwt.sign(userIdJson, privateKey) });
            });
        }
    });
});
router.post("/delete", function (req, res, next) {
    loggerjs.debug(JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        loggerjs.info("token is incorrect");
    } else {
        const selectUserQuery = "select password from user where user_id = ?";
        connection.query(selectUserQuery, [userIdJson.user_id], function (err, result, fields) {
            loggerjs.debug(JSON.stringify(result));
            if (err) {
                loggerjs.error(err);
                res.json({ is_deleted: false });
                throw err;
            }

            if (!(result.length)) {
                loggerjs.info("user does not exist");
                res.json({ is_deleted: false });
            } else if (bcrypt.compareSync(req.body.password, result[0].password)) {
                loggerjs.info("delete" + userIdJson.user_id);
                const deleteUserQuery = "delete from user where user_id = ?";
                connection.query(deleteUserQuery, [userIdJson.user_id], function (err, result, fields) {
                    if (err) {
                        loggerjs.error(err);
                        res.json({ is_deleted: false });
                        throw err;
                    }
                    loggerjs.info(userIdJson.user_id + " deleted");
                    res.json({ is_deleted: true });
                });
            } else {
                loggerjs.info("password is incorrect");
                res.json({ is_deleted: false });
            }
        });
    }
});
router.get("/get", function (req, res, next) {
    loggerjs.debug(JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.query.user_token, privateKey);
    const selectUserQuery = "select email,username from user where user_id = ?";
    if (!(userIdJson.user_id)) {
        loggerjs.info("token is incorrect");
    } else {
        connection.query(selectUserQuery, [userIdJson.user_id], function (err, result, fields) {
            if (err) {
                loggerjs.error(err);
                res.json({});
                throw err;
            }
            loggerjs.info("get " + userIdJson.user_id);
            const userInfoJson = result[0];
            res.json(userInfoJson);
        });
    }
});
router.put("/update", function (req, res, next) {
    loggerjs.debug("update "+JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    const updateJson = req.body;
    if (!(userIdJson.user_id)) {
        loggerjs.info("token is incorrect");
    } else {
        let updateUserQuery = "update user set email=?,username=? where user_id=?";
        connection.query(updateUserQuery, [updateJson.email, updateJson.username, userIdJson.user_id], function (err, result, fields) {
            if (err) { loggerjs.error(err); res.json({ is_updated: false }); throw err; }
            res.json({ is_updated: true });
        });
    }
});
router.put("/update/password", function (req, res, next) {
    loggerjs.debug("update password"+JSON.stringify(req.body));
    const userIdJson = jwt.verify(req.body.user_token, privateKey);
    if (!(userIdJson.user_id)) {
        loggerjs.info("token is incorrect");
    } else {
        const selectUserQuery = "select password from user where user_id = ?";
        connection.query(selectUserQuery, [userIdJson.user_id], function (err, result, fields) {
            loggerjs.debug(JSON.stringify(result));
            if (err) {
                loggerjs.error(err);
                res.json({ is_updated: false });
                throw err;
            }

            if (!(result.length)) {
                loggerjs.info("user does not exist");
                res.json({ is_updated: false });

            } else if (bcrypt.compareSync(req.body.password, result[0].password)) {
                loggerjs.info("update password " + userIdJson.user_id);
                const updateUserPasswordQuery = "update user set password=? where user_id=?";
                const hash = bcrypt.hashSync(req.body.new_password, 10);
                connection.query(updateUserPasswordQuery, [hash,userIdJson.user_id], function (err, result, fields) {
                    if (err) {
                        loggerjs.error(err);
                        res.json({ is_updated: false });
                        throw err;
                    }
                    loggerjs.info(userIdJson.user_id + " updated");
                    res.json({ is_updated: true });
                });
            } else {
                loggerjs.info("password is incorrect");
                res.json({ is_updated: false });
            }
        });
    }
})
module.exports = router;