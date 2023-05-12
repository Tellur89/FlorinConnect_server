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
  test("requesting for a request code of 200 when post route sends all the posts", async () => {
    await request(app).get("/posts").expect(200);
  });
  test("requesting for a request code of 200 when post route sends all the volunteer posts", async () => {
    await request(app).get("posts/category/Volunteer").expect(200);
  });
  test("requesting for a request code of 200 when post route sends all the posts that are open", async () => {
    await request(app).get("posts/status/open").expect(200);
  });
  test("requesting for a request code of 200 when post route sends all the posts that are completed", async () => {
    await request(app).get("posts/status/completed").expect(200);
  });

  test("requesting for a request code of 200 when post route sends all the posts that are accepted", async () => {
    await request(app).get("posts/status/accepted").expect(200);
  });

  test("requesting for a request code of 200 when post route sends all the posts that are on this day", async () => {
    await request(app).get("posts/date/12-05-2023").expect(200);
  });

  test("requesting for a request code of 200 when post route sends all the posts that are between 11/05/2023 and 12/05/2023", async () => {
    await request(app).get("posts/date/11-05-2023").expect(200);
  });
  test("requesting for a request code of 200 when post route sends all the posts that inclue the word Junior", async () => {
    await request(app).get("posts/word/Junior").expect(200);
  });
});
