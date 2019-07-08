var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../index");
    });
    describe("GET /", () => {
        let data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3200/accounts", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body).toBe("01");
        });
    });

    it('should POST', function (done) {
        let sent = {
            accountNumber: '125',
            balance: 1000000,
            status: 'active'
        };
        Request.post("http://localhost:3200/account", {json: true, body: sent}, function (error, response, body) {
            expect(body.data).toEqual(sent);
            done();
        });
    });
});

