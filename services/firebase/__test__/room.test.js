const app = require("../app");
const request = require("supertest");
const { Room } = require("../models/Room");
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


describe("POST /Create rooms", () => {
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

    test("201 success Create room", (done) => {
        request(app)
            .post(`/rooms/createRoom/${userId}`)
            .set("access_token", validToken)
            .send('categoryId', 1)
            .then((response) => {
                const { body, status } = response;
                idRoom = body.id;

                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("200 success get room", (done) => {
        request(app)
            .get("/rooms/getRoom/:categoryId")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                // console.log(body,response)
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();

                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get rooms with invalid token", (done) => {
        request(app)
            .get("/rooms//getRoom/:categoryId")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get room without token", (done) => {
        request(app)
            .get("/rooms/getRoom/:categoryId")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
describe("GET /rooms/byId", () => {
    test("200 success get room", (done) => {
        request(app)
            .get(`/rooms/${idRoom}`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                // idRoom = body[0].id;
                expect(status).toBe(200);
                // expect(Array.isArray(body)).toBeTruthy();
                expect(body).toHaveProperty("isEnded", expect.any(Boolean));
                expect(body).toHaveProperty("player2");
                expect(body).toHaveProperty("player1");
                expect(body).toHaveProperty("id", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("401 get rooms with invalid token", (done) => {
        request(app)
            .get(`/rooms/${idRoom}`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get room without token", (done) => {
        request(app)
            .get(`/rooms/${idRoom}`)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


});
describe("GET /rooms/byId", () => {
    test("200 success get room", (done) => {
        request(app)
            .get(`/rooms/${idRoom}`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("isEnded", expect.any(Boolean));
                expect(body).toHaveProperty("player2");
                expect(body).toHaveProperty("player1");
                expect(body).toHaveProperty("id", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("200 success  PUT ROOM", (done) => {
        request(app)
            .put(`/rooms/${idRoom}`)
            .set("access_token", validToken)
            .send('userId', userId)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);      
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("200 success  DELETE ROOM", (done) => {
        request(app)
            .delete(`/rooms/${idRoom}`)
            .set("access_token", validToken)
            .send('userId', userId)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);      
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});





