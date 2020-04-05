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
})