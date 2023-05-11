const { userRouter } = require("../../routers/usersRoutes");
const app = require("../../app.js");
describe("api server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(3000, () => {
      console.log("test server pn port 3000");
    });
  });

  afterAll((done) => {
    console.log("stopping test server");
    api.close(done);
  });

  test("responds to get / with status 200", (done) => {
    userRouter(api).get("/").expect(500, done);
  });
});
