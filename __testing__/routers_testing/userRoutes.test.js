const request = require("supertest");
const app = require("../../app");
const db = require("../../database/db");

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
    db.end(done);
  });

  test("responds to wrong POST / serivce", (done) => {
    request(api).post("/users").expect(400, done);
  });

  test("responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });

  test("responds to GET /goats with status 200", (done) => {
    request(api).get("/users").expect(200, done);
  });

  test("responds to get / with status 200 for admin", (done) => {
    request(api).get("/users/1").expect(200, done);
  });
  //   test("responds to get / with status 200 for admin", (done) => {
  //     request(api).get("/users/name/admin").expect(200, done);
  //   });

  //   userRouter.route("/admin").get(userController.showAdmin);
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
