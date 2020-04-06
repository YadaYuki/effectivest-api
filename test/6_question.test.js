var apiUrl = app + "/api/question";
describe("/api/question",function(){
    it("get all question",function(done){
        request(apiUrl)
            .get("/get/all?test_id=1&is_test=true")
            .expect(200)
            .expect(res=>{
                expect(res.body.length).toBeGreaterThan(1);
                expect(Object.keys(res.body[0])).toEqual(["question_id","question","answer"]);
            }).end(done);
    });
    it("get random question",function(done){
        request(apiUrl)
            .get("/get/random?test_id=1&question_num=10")
            .expect(200)
            .expect(res=>{
                expect(res.body.length).toBe(10);
                expect(Object.keys(res.body[0])).toEqual(["question_id","question","answer"]);
            })
            .end(done)
    });
    it("get week question",function(done){
        request(apiUrl)
            .get("/get/random?test_id=1&question_num=10")
            .expect(200)
            .expect(res=>{
                expect(res.body.length).toBe(10);
                expect(Object.keys(res.body[0])).toEqual(["question_id","question","answer"]);
            })
            .end(done)
    });
    var userToken;
    it("login for test afterward", function (done) {
        const userInfo = { username: "yada.yuki@fuji.waseda.jp", password: "password" };
        request(app + "/api/user")
            .post("/login")
            .send(userInfo)
            .expect(200)
            .expect((res) => {
                expect(res.body.is_success).toEqual(true);
                userToken = res.body.user_token;
            })
            .end(done);
    });
    var questionId;
    it("add question",function(done){
        const questionJson = {user_token:userToken,test_id:1,question:"sample",answer:"サンプル"};
        request(apiUrl)
            .post("/add")
            .send(questionJson)
            .expect(200)
            .expect(res=>{
                expect(res.body.question_id).toBeGreaterThanOrEqual(1);
                questionId = res.body.question_id;
            })
            .end(done)
    });
    it("update correct time",function(done){
        const questionJson = {user_token:userToken,question_id:[1,2,questionId]};
        request(apiUrl)
            .put("/update/correct_time")
            .send(questionJson)
            .expect(200)
            .expect(res=>{
                expect(res.body.is_updated).toBeTruthy();
            })
            .end(done);
    });
    it("update question",function(done){
        const questionJson = {user_token:userToken,question:"update.sample",answer:"更新されたサンプル",question_id:questionId};
        request(apiUrl)
            .put("/update")
            .send(questionJson)
            .expect(200)
            .expect(res=>{
                expect(res.body.is_updated).toBeTruthy();
            })
            .end(done);
    });
    it("delete question",function(done){
        const questionJson = {user_token:userToken,question_id:questionId};
        request(apiUrl)
            .delete("/delete")
            .send(questionJson)
            .expect(200)
            .expect(res=>{
                expect(res.body.is_deleted).toBeTruthy();
            })
            .end(done);
    });
})