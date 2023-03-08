const app = require('../app');
const request = require('supertest');
const { Friend } = require('../models/Friend');

let r = (Math.random() + 1).toString(36).substring(7);

const user1 = {
    username: r,
    email: `${r}@mail.com`,
    password: "usertest",
};
let invalidToken = "dsakdmsas";
let validToken;
let idRoom;
let userId;

describe("TESTING /rooms", () => {
    test("201 Success register - should create new User", (done) => {
        request(app)
            .post("/users/register")
            .send(user1)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(String));
                userId = body.id;
                expect(body).toHaveProperty("username", expect.any(String));
                expect(body).toHaveProperty("email", expect.any(String));
                return done();
            });
    }, 30000);
    test("200 Success login - should return access_token", (done) => {
        request(app)
            .post("/users/login")
            .send(user1)
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                validToken = body.access_token;
                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", expect.any(String));
                return done();
            });
    }, 30000);
    test("200 success Create room", (done) => {
        request(app)
            .get(`/friends`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("201 Add Friend ", (done) => {
        request(app)
            .post("/friends/87151bnZ2Pkhxe9D2UFF")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(201);
                // expect(Array.isArray(body)).toBeTruthy();

                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    
});




