const User = require("../../models/User");
const { getOneById } = require("../../controllers/usersController");
describe("User Model", () => {
  test("is described", () => {
    expect(User).toBeDefined();
  });

  test("user.all exist", () => {
    const user = User.getAll;
    expect(user).toBeDefined();
  });
  test("user.all exist", () => {
    const user = User.getOneById;
    console.log(user.value);
    expect(user.value).toBe(0).expect("Unable to locate user by ID.");
  });
});
