const app = require('../app');
const request = require('supertest');
const { Friend } = require('../models/Friend');

let invalidToken = "dsakdmsas";
let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MTUxYm5aMlBraHhlOUQyVUZGIiwiZW1haWwiOiJnaWxhbmdAbWFpbC5jb20iLCJpYXQiOjE2NzgxODk3MTJ9.84TRm8r_YOLitU0yVsSPCGQ73rSeep7z7jxBwA0D8Nw";
let idRoom;
let userId;

describe("GET /friends", () => {
    test("200 success Get all friends", (done) => {
        request(app)
            .get(`/friends`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, "ini body milik get all friends");
                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    
    test("401 success Get all friends", (done) => {
        request(app)
            .get(`/friends`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, "ini body milik get all friends");
                expect(status).toBe(401);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("201 Add Friend ", (done) => {
        request(app)
            .post("/friends/yNlODvA9bjiLx6c1nZCv")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, "ini body milik add friend");
                expect(status).toBe(201);
                // expect(Array.isArray(body)).toBeTruthy();
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 Add Friend with invalid token", (done) => {
        request(app)
            .post("/friends/yNlODvA9bjiLx6c1nZCv")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, "ini body milik add friend");
                expect(status).toBe(401);
                // expect(Array.isArray(body)).toBeTruthy();
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 Add Friend without token", (done) => {
        request(app)
            .post("/friends/yNlODvA9bjiLx6c1nZCv")
            .set("access_token", null)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, "ini body milik add friend");
                expect(status).toBe(401);
                // expect(Array.isArray(body)).toBeTruthy();
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    
});





