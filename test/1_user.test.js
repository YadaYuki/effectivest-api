var apiUrl = app + "/api/user";
describe("/api/user/", function() {
    it("sample page getting", function(done) {
        request(apiUrl)
            .get("/sample")
            .expect(200) // status
            .expect((res) => {
                expect(res.body.sample).toBe("sample");
            })
            .end(done);
    });
    it("login success",function(done){
        const userInfo = {username:"yada.yuki@fuji.waseda.jp",password:"password"};
        request(apiUrl)
            .post("/login")
            .send(userInfo)
            .expect(200)
            .expect((res)=>{
                expect(res.body.is_login).toBeTruthy();
            })
            .end(done);
    });
    it("login failed",function(done){
        const userInfo = {email:"mistake@com",password:"email"};
        request(apiUrl)
            .post("/login")
            .send(userInfo)
            .expect((res)=>{
                expect(res.body.is_login).toEqual(false);
            })
            .end(done);
    });
    var sampleUser ={
       email:"sample.user@gmail.com",username:"sampleuser",password:"sample_password", 
    }
    var sampleUserToken;
    it("regist success",function(done){
        request(apiUrl)
            .post("/regist")
            .send(sampleUser)
            .expect((res)=>{
                expect(res.body.is_regist).toBeTruthy();
                sampleUserToken = res.body.user_token;
            })
            .end(done);
    });
    it("regist failed",function(done){
        request(apiUrl)
            .post("/regist")
            .send(sampleUser)
            .expect((res)=>{
                expect(res.body.is_regist).toEqual(false);
            })
            .end(done);
    });

    it("get success",function(done){
        request(apiUrl)
            .get("/get?user_token="+sampleUserToken)
            .expect((res)=>{
                expect(res.body).toEqual({email:sampleUser.email,username:sampleUser.username});
            })
            .end(done)
        });

    it("update email success",function(done){
        request(app)
            .put("/api/user/update")
            .send({user_token:sampleUserToken,email:"updated.sample.email@gmail.com",username:"updated.yadayuki"})
            .expect((res)=>{
                expect(res.body.is_updated).toBeTruthy();
            })
            .end(done)
    });

    it("update password success",function(done){
        request(app)
            .put("/api/user/update/password")
            .send({user_token:sampleUserToken,password:"sample_password",new_password:"updated.sample_password"})
            .expect((res)=>{
                expect(res.body.is_updated).toBeTruthy();
            })
            .end(done);
    });
    it("update password failed",function(done){
        request(app)
            .put("/api/user/update/password")
            .send({user_token:sampleUserToken,password:"wrong_password",new_password:"updated.sample_password"})
            .expect((res)=>{
                expect(res.body.is_updated).toEqual(false);
            })
            .end(done)
    });
    it("update username success",function(done){
        request(app)
            .put("/api/user/update/username")
            .send({user_token:sampleUserToken,username:sampleUser.username})
            .expect((res)=>{
                expect(res.body.is_updated).toBeTruthy();
            })
            .end(done);
    });
    it("update username failed",function(done){
        request(app)
            .put("/api/user/update/username")
            .send({user_token:"",username:sampleUser.username})
            .expect((res)=>{
                expect(res.body.is_updated).toBeFalsy();
            })
            .end(done);
    });
    it("update email",function(done){
        request(app)
            .put("/api/user/update/email")
            .send({user_token:sampleUserToken,email:sample})
    });
    it("confirm update by login",function(done){
        request(app)
            .post("/api/user/login")
            .send({username:"updated.sample.email@gmail.com",password:"updated.sample_password"})
            .expect((res)=>{
                expect(res.body.is_login).toBeTruthy();
                sampleUserToken = res.body.user_token;
            })
            .end(done);
    });

    it("delete success",function(done){
        request(app)
            .post("/api/user/delete")
            .send({user_token:sampleUserToken,password:"updated.sample_password"})
            .expect((res)=>{
                expect(res.body.is_deleted).toBeTruthy();
            })
            .end(done)
    });
    it("delete fail",function(done){
        request(app)
            .post("/api/user/delete")
            .send({user_token:sampleUserToken,password:"",})
            .expect((res)=>{
                expect(res.body.is_deleted).toEqual(false);
            })
            .end(done);
    });

    //regist failed

})