const app = require('../app');
const request = require('supertest');
const { Friend } = require('../models/Friend');

let invalidToken = "dsakdmsas";
let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZsWHN5SnVveHdtc2l4MmxsOE04IiwiZW1haWwiOiJnaWxhbmdAbWFpbC5jb20iLCJpYXQiOjE2NzgxOTc2ODF9.GbF4LgW2jgSMhC2HaCHyGE2hT2sUyt2DjV2KbwlfT2E";
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
    
    test("401 fail Get all friends invalid token", (done) => {
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

    test("404 success get friend invitation", (done) => {
        request(app)
            .get(`/friends/invitationFriend`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik get friend invitation");
                expect(status).toBe(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get friend invitation with invalid token", (done) => {
        request(app)
            .get(`/friends/invitationFriend`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik get friend invitation");
                expect(status).toBe(401);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("200 success get request friend", (done) => {
        request(app)
            .get(`/friends/requestFriend`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik get request friend");
                console.log(status, "ini status milik get request friend");
                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("201 success add friend", (done) => {
        request(app)
            .post(`/friends/36dZHKhAIUuNbINuZxdr`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik add friend");
                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    
});

describe("PUT /friends", () => {
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




