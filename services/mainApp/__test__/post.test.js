// const app = require('../app');
// const request = require('supertest');
// const { sequelize, Post, Comment, Category } = require('../models');
// const { queryInterface } = sequelize;
// const { signToken } = require('../helpers/jwt');
// const { axios } = require('axios');

// let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.ENI_woraRmxzHE8Ay0r1xqWVjpZiy_0W44RPHW59eAU';
// let invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoeGtkdnRwYVBwbUVLeGsyV1BhIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjc3ODMwNjAxfQ.';
// let null_token = null

// afterAll((done) => {
//     Post.destroy({ truncate: true, cascade: true, restartIdentity: true })
//         .then(() => {
//             done();
//         })
//         .catch((err) => {
//             done(err);
//         });
// });

// describe("POST /posts", () => {
//     test("should return 401 status code invalid token with both input is filled", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', invalid_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul",
//                 description: "ini berhasil di buat untuk deskripsi",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 400 status code description is null / empty", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', access_token)
//             .send({
//                 title: "null",
//                 description: null,
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(400);
//                 expect(body.message[0]).toBe("Description is required");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code description null / empty with invalid token", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', invalid_token)
//             .send({
//                 title: "null",
//                 description: null,
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code title null / empty with invalid token", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', invalid_token)
//             .send({
//                 title: null,
//                 description: "ini berhasil di buat untuk deskripsi",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 400 status code title is null / empty", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', access_token)
//             .send({
//                 title: null,
//                 description: "ini berhasil di buat untuk deskripsi",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(400);
//                 expect(body.message[0]).toBe("Title is required");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 201 status code success ", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', access_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul untuk di delete pada testing delete",
//                 description: "ini berhasil di buat untuk deskripsi untuk di pada testing delete",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(201);
//                 expect(body).toHaveProperty("id", expect.any(Number));
//                 expect(body).toHaveProperty("title", expect.any(String));
//                 expect(body).toHaveProperty("description", expect.any(String));
//                 expect(body).toHaveProperty("UserId", expect.any(Number));
//                 expect(body).toHaveProperty("CategoryId", expect.any(Number));
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 201 status code success created for delete it later ", (done) => {
//         request(app)
//             .post("/posts")
//             .set('access_token', access_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul",
//                 description: "ini berhasil di buat untuk deskripsi",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(201);
//                 expect(body).toHaveProperty("id", expect.any(Number));
//                 expect(body).toHaveProperty("title", expect.any(String));
//                 expect(body).toHaveProperty("description", expect.any(String));
//                 expect(body).toHaveProperty("UserId", expect.any(Number));
//                 expect(body).toHaveProperty("CategoryId", expect.any(Number));
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });
// });

// describe("GET /posts", () => {
//     test("should return 200 status code success get post data with categoryId", (done) => {
//         request(app)
//             .get("/posts/1")
//             .set('access_token', access_token)
//             .then((response) => {
//                 // console.log(response);
//                 const { body, status } = response;
//                 expect(status).toBe(200);
//                 expect(body[0]).toHaveProperty("id", expect.any(Number));
//                 expect(body[0]).toHaveProperty("title", expect.any(String));
//                 expect(body[0]).toHaveProperty("description", expect.any(String));
//                 expect(body[0]).toHaveProperty("UserId", expect.any(Number));
//                 expect(body[0]).toHaveProperty("CategoryId", expect.any(Number));
//                 expect(body[0]).toHaveProperty("Comments", expect.any(Array));
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 404 status code success get all data", (done) => {
//         request(app)
//             .get("/posts/999")
//             .set('access_token', access_token)
//             .then((response) => {
//                 // console.log(response);
//                 const { body, status } = response;
//                 expect(status).toBe(404);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Posts not found");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code invalid token", (done) => {
//         request(app)
//             .get("/posts/1")
//             .set('access_token', invalid_token)
//             .then((response) => {
//                 // console.log(response);
//                 const { body, status } = response;
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code null token", (done) => {
//         request(app)
//             .get("/posts/1")
//             .set('access_token', null_token)
//             .then((response) => {
//                 // console.log(response);
//                 const { body, status } = response;
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });
// });

// describe("PATCH /posts", () => {
//     test("should return 200 status code success edit post with categoryId", (done) => {
//         request(app)
//             .patch("/posts/1")
//             .set('access_token', access_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul yang kena patch",
//                 description: "ini berhasil di buat untuk deskripsi yang kena patch",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(200);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 404 status code failed update post with categoryId", (done) => {
//         request(app)
//             .patch("/posts/999")
//             .set('access_token', access_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul yang kena patch",
//                 description: "ini berhasil di buat untuk deskripsi yang kena patch",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(404);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Post not found");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code with invalid token", (done) => {
//         request(app)
//             .patch("/posts/1")
//             .set('access_token', invalid_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul yang kena patch",
//                 description: "ini berhasil di buat untuk deskripsi yang kena patch",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });

//     test("should return 401 status code with null token", (done) => {
//         request(app)
//             .patch("/posts/1")
//             .set('access_token', null_token)
//             .send({
//                 title: "ini berhasil di buat untuk judul yang kena patch",
//                 description: "ini berhasil di buat untuk deskripsi yang kena patch",
//             })
//             .then((response) => {
//                 const { body, status } = response;
//                 // console.log(body, 'ini response add post');
//                 expect(status).toBe(401);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Invalid token");
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });
// });

// describe("DELETE /posts", () => {
//     test("should return 404 status code not found", (done) => {
//         request(app)
//             .delete("/posts/999")
//             .set('access_token', access_token)
//             .then((response) => {
//                 const { body, status } = response
//                 expect(status).toBe(404);
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Post not found");
//                 done();
//             })
//     });

//     test("should return 200 status code success delete the created", (done) => {
//         request(app)
//             .delete("/posts/2")
//             .set('access_token',access_token)
//             .then((response) => {
//                 const {body, status} = response
//                 expect(status).toBe(200)
//                 expect(body).toHaveProperty("message", expect.any(String));
//                 expect(body.message).toBe("Post with id 2 has been deleted");
//                 done();
//             })
//     });
// });


