const request = require("supertest");
const app = require("../../app");

describe("api server", () => {
  let api;
  beforeAll(() => {
    api = app.listen(3000, () => {
      console.log("Test server running on port 3000");
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  //GET tests

  test("responds to GET / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });

  //   test("responds to GET /users with status 200", async () => {
  //     request(api).get("/users").expect(200);
  //   });

  //   test("responds to GET /users/1 with status 200 for user with id of 1", async () => {
  //     request(api).get("/users/1").expect(200);
  //   });

  //   test("responds to GET /users/name/admin with status 200 for username of admin", async () => {
  //     request(api).get("/users/name/admin").expect(200);
  //   });

  //   test("responds to get /users/admin with status 200 for all admins", async () => {
  //     request(api).get("/users/admin").expect(200);
  //   });

  //   //wrong GET tests
  //   test("responds to unknown user_id with status of 404", async () => {
  //     request(api)
  //       .get("/users/123")
  //       .expect(404)
  //       .expect({ error: "Unable to locate user by ID." });
  //   });

  //   test("responds to unknown username with status of 404", async () => {
  //     request(api)
  //       .get("/users/admin1")
  //       .expect(404)
  //       .expect({ error: "Unable to locate user by username." });
  //   });

  //   //POST tests

  //   test("reponds to creating new user with status of x", async () => {
  //     const testData = {
  //       username: "dummyUsername",
  //       password: "dummyPassword",
  //     };
  //     request(api)
  //       .post("users")
  //       .send(testData)
  //       .set("Accept", "application/json")
  //       .expect(201)
  //       .expect({ ...testData, id: 4, admin: "false" });
  //   });

  //   //wrong POST tests
  //   test("responds to wrong POST / serivce", (done) => {
  //     request(api).post("/users").expect(400, done);
  //   });

  //   //PATCH tests
  //   test("reponds to updating  user with status of 200", async () => {
  //     const testData = {
  //       username: "dummyUsername",
  //       password: "dummyPassword",
  //     };
  //     request(api).patch("/users").send(testData).expect(404);
  //   });

  //   //DELETE tests
  //   test("responds to  deleting a user", (done) => {
  //     request(api).post("/users").expect(400, done);
  //   });
  //   userRouter.route("/login").post(userController.verifyLogin);

  //   userRouter
  //     .route("/:id")
  //     .get(userController.showById)
  //     .patch(userController.updateUser);
  //   userRouter
  //     .route("/name/:username")
  //     .get(userController.showByUsername)
  //     .delete(userController.destroyUser);
});
