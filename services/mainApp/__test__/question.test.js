const app = require('../app');
const request = require('supertest');
const { sequelize, Post, Comment, Category } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');
const { axios } = require('axios');

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImxnNnd4MlQyOHZtd053SHdsZFphIiwiZW1haWwiOiJnaWxhbmdAbWFpbC5jb20iLCJpYXQiOjE2NzgyODA3MDZ9.iJF76HgqvgOt44jLD9u3bSNtTLA02wzc7u-ln6BWCJ4';
let invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.';
let null_token = null

describe("GET /questions", () => {
    test("should return 200 status code success get question data with categoryValue", (done) => {
        request(app)
            .get("/questions/9")
            .set('access_token', access_token)
            .then((response) => {
                // console.log(response);
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body[0]).toHaveProperty("category", expect.any(String));
                expect(body[0]).toHaveProperty("question", expect.any(String));
                expect(body[0]).toHaveProperty("correctAnswer", expect.any(String));
                expect(body[0]).toHaveProperty("incorrectAnswers", expect.any(Array));
                done();
            },10000)
            .catch((err) => {
                done(err);
            });
    });
 
    test("should return 401 status code fail because invalid access_token", (done) => {
        request(app)
            .get("/questions/9")
            .set('access_token', invalid_token)
            .then((response) => {
                // console.log(response);
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                expect(body.message).toBe("Invalid token");
                done();
            },10000)
            .catch((err) => {
                done(err);
            });
    });
});

