const app = require('../app');
const request = require('supertest');
const { sequelize, Post, Comment, Category } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');
const { axios } = require('axios');

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNWQ25nT0RIMmhtVmJ6UmFtc0pOIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3OTM3MDQ1fQ.7k9P3r7_8jvXHkxw7sFkq5edr-4lkFQb0zzU_uq309E';
let invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.';
// let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.ENI_woraRmxzHE8Ay0r1xqWVjpZiy_0W44RPHW59eAU';
// let invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.';

afterAll((done) => {
    Comment.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
});

describe("POST /Comments", () => {
    test("should return 201 status code success create", (done) => {
        request(app)
            .post("/comments")
            .set('access_token', access_token)
            .send({
                description: "ini berhasil di buat"
            })
            .then((response) => {
                const { body, status } = response;
                // console.log(body);
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("description", expect.any(String));
                expect(body).toHaveProperty("PostId", expect.any(Number));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 400 status code fail add Comment", (done) => {
        request(app)
            .post("/comments")
            .set('access_token', access_token)
            .send({
                description: null
            })
            .then((response) => {
                const { body, status } = response;
                console.log(body, 'ini dari add comment');
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(Array));
                expect(body.message[0]).toBe("Comment is required");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 401 status code fail add", (done) => {
        request(app)
            .post("/comments")
            .set('access_token', invalid_token)
            .send({
                description: "ini berhasil di buat"
            })
            .then((response) => {
                const { body, status } = response;
                console.log(body, 'ini dari fail add comment');
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                expect(body.message).toBe("Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("PUT /Comments", () => {
    test("should return 200 status code success edit", (done) => {
        request(app)
            .put("/comments/1")
            .set('access_token', access_token)
            .send({
                description: "ini berhasil di edit yang baru dibuat"
            })
            .then((response) => {
                const { body, status } = response;
                // console.log(body);
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", expect.any(String));
                expect(body.message).toBe("Comment with id 1 has been edited");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

     test("should return 401 status code fail edit", (done) => {
        request(app)
            .put("/comments/1")
            .set('access_token', invalid_token)
            .send({
                description: "ini berhasil di edit yang baru dibuat"
            })
            .then((response) => {
                const { body, status } = response;
                // console.log(body);
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                expect(body.message).toBe("Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("DELETE /Comments", () => {
    test("should return 200 status code success delete", (done) => {
        request(app)
            .delete("/comments/1")
            .set('access_token', access_token)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("should return 404 status code fail delete", (done) => {
        request(app)
            .delete("/comments/999")
            .set('access_token', access_token)
            .then((response) => {
                const { body, status } = response;
                console.log(body, status, 'ini delete');
                expect(status).toBe(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
