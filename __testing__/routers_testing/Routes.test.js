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
});
