var apiUrl = app + "/api/result";
describe("/api/result/", function () {
    var userToken;
    it("login for test afterward", function (done) {
        const userInfo = { username: "yada.yuki@fuji.waseda.jp", password: "password" };
        request(app + "/api/user")
            .post("/login")
            .send(userInfo)
            .expect(200)
            .expect((res) => {
                expect(res.body.is_login).toEqual(true);
                console.log(JSON.stringify(res.body))
                userToken = res.body.user_token;
            })
            .end(done);
    });
    it("add result", function (done) {
        const sampleResult = { user_token: userToken, point: 10, max_point: 10, correct_rate: 10 / 10, test_id: 1 };
        request(apiUrl)
            .post("/add")
            .send(sampleResult)
            .expect((res) => {
                expect(res.body.is_resulted).toBe(true);
                // expect(res.body.result_id).toBe(num);
            })
            .end(done);
    });
    it("get result", function (done) {
        request(apiUrl)
            .get("/get?test_id=1")
            .expect((res) => {
                expect(res.body[0]).toEqual({result_id:1,point:10,max_point:10,correct_rate:10/10});
            })
            .end(done);
    });
});