const app = require("../app");
const request = require("supertest");
const { User } = require("../models/User");

let r = (Math.random() + 1).toString(36).substring(7);

const user1 = {
  username: r,
  email: `${r}@mail.com`,
  password: "usertest",
};

let userId;
let validToken;

describe("User Routes Test", () => {
  describe("POST users/register - create new user", () => {
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
    test("400 Failed register - should return error if there null input", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "sdadasada",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email are required");
          return done();
        });
    }, 30000);
    test("400 Failed register - should return error if there null input", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "lololo@gmail.com",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username are required");
          return done();
        });
    }, 30000);
    test("400 Failed register - should return error if there null input", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: 'shanananNed@gmail.com',
          username: "ssdxcmmadasada",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password are required");
          return done();
        });
    }, 30000);
    test("400 Failed register - should return error if email is already registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "testing@mail.com",
          username: "testingGilang",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email already registered");
          return done();
        });
    }, 30000);
    test("400 Failed register - should return error if Username is already registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "testing5@mail.com",
          username: "testingGilang",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username already registered");
          return done();
        });
    }, 30000);
  });

  describe("POST /login - user login", () => {
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
    test("400 Failed login - should return error wrong password", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "gilang@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid email/password");
          return done();
        });
    });
    test("400 Failed login - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: null,
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is required");
          return done();
        });
    });
    test("400 Failed login - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "gilang@mail.com",
          password: null,
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password is required");
          return done();
        });
    });
  });

  describe("GET /Users - All User", () => {
    test("200 Success Get User - should return USER", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          expect(body.length).toBeGreaterThan(0);
          return done();
        });
    });
  });

  describe("GET /Users/:userID - User By Id", () => {
    test("200 Success Get User - should return USER", (done) => {
      request(app)
        .get(`/users/${userId}`)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          return done();
        });
    });
    test("404 Failed Get User - should return User Not Found", (done) => {
      request(app)
        .get(`/users/sdklajdlkaaaaa`)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Data not found');
          return done();
        });
    });
  }, 500000);

  describe("PATCH /Users/:userID - User By Id", () => {
    test("200 Success PATCH User ", (done) => {
      request(app)
        .patch(`/users/${userId}`)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          return done();
        }, 50000);
    });
  });

  describe('POST /users/checkoutGem', () => {
    test('201 Success checkout gem', (done) => {
      request(app)
        .post(`/users/checkoutGem`)
        .set("access_token", validToken)
        .send({
          totalGem: 1000
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("token");
          expect(body).toHaveProperty("redirect_url");
          return done();
        }, 50000);
    });
  })

  describe('GET /users/leaderboard', () => {
    test('GET /users/leaderboard', (done) => {
      request(app)
        .get(`/users/leaderboard`)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          return done();
        }, 50000);
    })
  })

  describe('PATCH /users/updateGem', () => {
    test('PATCH /users/updateGem', (done) => {
      request(app)
        .patch(`/users/updateGem`)
        .set("access_token", validToken)
        .send({
          gem: 1000
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(Array.isArray(body));
          return done();
        }, 50000);
    })
  })
})
