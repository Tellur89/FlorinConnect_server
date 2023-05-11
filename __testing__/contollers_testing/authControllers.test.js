const { handleLogin } = require("../../controllers/authContollers");

test("test async function", async () => {
  const data = await handleLogin();
  expect(data).toBe(3);
});
