const app = require('../app');
const request = require('supertest');
const { sequelize, Post, Comment, Category } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');
const { axios } = require('axios');

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.ENI_woraRmxzHE8Ay0r1xqWVjpZiy_0W44RPHW59eAU';
let invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.';


describe("GET /categories", () => {
    test("should return 200 status code", (done) => {
        request(app)
            .get("/categories")
            .set('access_token', access_token)
            .then((response) => {
                const { body, status } = response;
                console.log(body, 'ini dia body si get categories');
                expect(status).toBe(200);
                expect(body[0]).toHaveProperty("id", expect.any(Number));
                expect(body[0]).toHaveProperty("name", expect.any(String));
                expect(body[0]).toHaveProperty("value", expect.any(Number));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 401 status code", (done) => {
        request(app)
            .get("/categories")
            .set('access_token', invalid_token)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });    
});

describe("GET /categories/:id", () => {
    test("should return 200 status code", (done) => {
        request(app)
            .get("/categories/1")
            .set('access_token', access_token)
            .then((response) => {
                const { body, status } = response;
                // console.log(body, 'Ini body');
                expect(status).toBe(200);
                expect(body.id).toBe("1");
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("value", expect.any(Number));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 401 status code", (done) => {
        request(app)
            .get("/categories/1")
            .set('access_token', invalid_token)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                expect(body.message).toEqual("Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 404 status code", (done) => {
        request(app)
            .get("/categories/999")
            .set('access_token', access_token)
            .then((response) => {
                const { body, status } = response;
                // console.log(body);
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

