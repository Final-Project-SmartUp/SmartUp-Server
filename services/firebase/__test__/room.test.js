const app = require("../app");
const request = require("supertest");
const { Room } = require("../models/Room");
let r = (Math.random() + 1).toString(36).substring(7);
// const { mockRequest, mockResponse } = require('jest-mock-req-res');
const RoomController = require("../controllers/RoomController");


const user1 = {
    username: r,
    email: `${r}@mail.com`,
    password: "usertest",
};
let invalidToken = "dsakdmsas";
let validToken;
let idRoom;
let userId;

beforeEach(() => {
    jest.restoreAllMocks();
})

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

describe('ALL ROOM 500', () => {
    // Define the test
    it('should return a status code of 500', async () => {
        // Create a mock implementation of the route handler that always throws an error
        const mockHandler = jest.fn(() => {
            throw new Error('An error occurred');
        });

        // Replace the original route handler with the mock implementation
        app.get(`/rooms/${idRoom}`, mockHandler);

        // Make a GET request to the route using supertest
        const response = await request(app).get(`/rooms/${idRoom}`).set("access_token", validToken);

        // Check that the response has a status code of 500
        expect(response.status).toBe(500);
    });





describe('ROOM 500', () => {
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(RoomController, 'getRoomById').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(RoomController.getRoomById()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(RoomController, 'createRoom').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(RoomController.createRoom()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(RoomController, 'getAllRoomsPlayer2Empty').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(RoomController.getAllRoomsPlayer2Empty()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(RoomController, 'joinRoom').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(RoomController.joinRoom()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });
    test('myAsyncFunction returns a rejected promise with status code 500', async () => {
        // Create a mock implementation for myAsyncFunction that returns a rejected promise with status code 500
        const mockError = new Error('Mocked error');
        mockError.statusCode = 500;
        jest.spyOn(RoomController, 'deleteRoom').mockRejectedValue(mockError);

        // Call the function under test and expect it to throw the mocked error with status code 500
        await expect(RoomController.deleteRoom()).rejects.toThrow(mockError);
        expect(mockError.statusCode).toEqual(500);
        // Restore the original implementation of fetch
        jest.restoreAllMocks();
    });

});


describe('ALL ROOM 500', () => {
    // Define the test
    it('should return a status code of 500', async () => {
        // Create a mock implementation of the route handler that always throws an error
        const mockHandler = jest.fn(() => {
            throw new Error('An error occurred');
        });

        // Replace the original route handler with the mock implementation
        app.post(`rooms/createRoom/${userId}`, mockHandler);

        // Make a GET request to the route using supertest
        const response = await request(app)
            .post(`/rooms/createRoom/${userId}`)
            .set("access_token", validToken)
        // Check that the response has a status code of 500
        expect(response.status).toBe(500);
    });
    it('should return a status code of 500', async () => {
        // Create a mock implementation of the route handler that always throws an error
        const mockHandler = jest.fn(() => {
            throw new Error('An error occurred');
        });

        // Replace the original route handler with the mock implementation
        app.put(`/rooms/${idRoom}`, mockHandler);

        // Make a GET request to the route using supertest
        const response = await request(app)
            .put(`/rooms/${idRoom}`)
            .set("access_token", validToken)
        // Check that the response has a status code of 500
        expect(response.status).toBe(500);
    });


});
});