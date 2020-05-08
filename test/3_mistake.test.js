var apiUrl = app + "/api/mistake";
describe("/api/mistake/", function () {
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
    it("add mistake", function (done) {
        const mistakeJson = { user_token:userToken,mistake:[{result_id: 2, question_id: 2},{result_id: 2, question_id: 2}]};
        request(apiUrl)
            .post("/add")
            .send(mistakeJson)
            .expect(200)
            .expect((res) => {
                expect(res.body.is_mistaked).toEqual(true);
            })
            .end(done);
    });
});