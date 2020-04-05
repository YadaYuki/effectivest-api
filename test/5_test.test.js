var apiUrl = app + "/api/test";
describe("api/test",function(){
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
    it("get test",function(done){
        request(apiUrl)
            .get("/get?test_id=1")// get toeic test
            .expect(200) // status
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(["testname","description","question_num","created_on"]);//include all keys
            })
            .end(done);
    });
    it("get all test",function(done){
        request(apiUrl)
            .get("/get/all?user_token="+userToken)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBeGreaterThanOrEqual(2)// => 2
            })
            .end(done)
    });
    var testId;
    it("add test",function(done){
        request(apiUrl)
            .post("/add")
            .send({user_token:userToken,testname:"testname",description:"description",question_num:10})
            .expect(200)
            .expect((res)=>{
                expect(res.body.test_id).toBeGreaterThanOrEqual(1)// 
                testId = res.body.test_id;
            })
            .end(done);
    });
    it("update test",function(done){
        request(apiUrl)
            .put("/update")
            .send({user_token:userToken,test_id:testId,testname:"updated.test",description:"updated.description",question_num:11})
            .expect(200)
            .expect((res)=>{
                expect(res.body.is_updated).toBeTruthy();// 
            })
            .end(done);
    });
    it("delete test",function(done){
        request(apiUrl)
            .delete("/delete")
            .send({user_token:userToken,test_id:testId})
            .expect(200)
            .expect((res)=>{
                expect(res.body.is_deleted).toBeTruthy()
            })
            .end(done)
    })
});