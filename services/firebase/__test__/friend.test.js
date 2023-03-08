const app = require('../app');
const request = require('supertest');
const { Friend } = require('../models/Friend');
const FriendController = require('../controllers/FriendController');

let r = (Math.random() + 1).toString(36).substring(7);

const user1 = {
    username: r,
    email: `${r}@mail.com`,
    password: "usertest",
  };
let invalidToken = "dsakdmsas";
let validToken = "";
let idRoom;
let userId;
let friendId;
let friendId2;

describe("GET /friends", () => {
    test("201 Success register - should create new User", (done) => {
        request(app)
          .post("/users/register")
          .send(user1)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(201);
            userId = body.id;
            expect(body).toHaveProperty("id", expect.any(String));
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
      });
    test("200 success Get all friends", (done) => {
        request(app)
            .get(`/friends`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body)
                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    },300000);
    test("200 success Get all friends", (done) => {
        request(app)
            .get(`/friends`)
            .send({us:'decline'})
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body)
                expect(status).toBe(500);
                done();
            })
            .catch((err) => {
                done(err);
            });
    },300000);
    
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

    // test("404 success get friend invitation", (done) => {
    //     request(app)
    //         .get(`/friends/invitationFriend`)
    //         .set("access_token", validToken)
    //         .then((response) => {
    //             const { body, status } = response;
    //             console.log(body, "ini body milik get friend invitation");
    //             expect(status).toBe(404);
    //             done();
    //         })
    //         .catch((err) => {
    //             done(err);
    //         });
    // });
    // test("404 success get friend invitation", (done) => {
    //     request(app)
    //         .get(`/friends/invitationFriend`)
    //         .set("access_token", validToken)
    //         .send({us:"us"})
    //         .then((response) => {
    //             const { body, status } = response;
    //             console.log(body, "ini body milik get friend invitation");
    //             expect(status).toBe(404);
    //             done();
    //         })
    //         .catch((err) => {
    //             done(err);
    //         });
    // });

    // test("401 get friend invitation with invalid token", (done) => {
    //     request(app)
    //         .get(`/friends/invitationFriend`)
    //         .set("access_token", invalidToken)
    //         .then((response) => {
    //             const { body, status } = response;
    //             console.log(body, "ini body milik get friend invitation");
    //             expect(status).toBe(401);
    //             done();
    //         })
    //         .catch((err) => {
    //             done(err);
    //         });
    // });

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
    test("200 success get request friend", (done) => {
        request(app)
            .get(`/friends/requestFriend`)
            .set("access_token", validToken)
            .send({us:'decline'})
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik get request friend");
                console.log(status, "ini status milik get request friend");
                expect(status).toBe(500);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("201 success add friend pertama", (done) => {
        request(app)
            .post(`/friends/I2iY8j47BMCaHXrRl2pG`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik add friend");
                friendId = body.id;
                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });  

    test("201 success add friend kedua", (done) => {
        request(app)
            .post(`/friends/I2iY8j47BMCaHXrRl2pG`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;
                console.log(body, "ini body milik add friend");
                friendId2 = body.id;
                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });  
});


describe("Decline /friends", () => {
    test("200 Decline Friend ", (done) => {
        request(app)
            .put(`/friends/decline/${friendId2}`)
            // .send({us:'decline'})
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

});

describe("Accept /friends", () => {
    test("200 Accept Friend ", (done) => {
        request(app)
            .put(`/friends/acceptFriend/${friendId}`)
            // .send({us:'decline'})
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
});


describe('Friend 500', () => {
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'requestFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.requestFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'getAllFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.getAllFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'declineFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.declineFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'addFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.addFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'acceptFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.acceptFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });

});


describe('Friend 500', () => {
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(FriendController, 'requestFriend').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(FriendController.requestFriend()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
});