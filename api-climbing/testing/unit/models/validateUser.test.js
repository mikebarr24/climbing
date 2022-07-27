const { validateUser } = require("../../../models/userModel");

describe("validateUser", () => {
  let user = {
    name: "user",
    email: "user@user.com",
    password: "userPassword",
  };
  it("should make sure new user sent to api is validated correctly", () => {
    const completedValidation = validateUser(user);
    expect(completedValidation.value).toEqual(user);
  });
  it("should return error if password is too short", () => {
    user.password = "1";
    const completedValidation = validateUser(user);
    expect(completedValidation).toHaveProperty("error");
  });
  it("should return error if name is too short", () => {
    user.name = "1";
    const completedValidation = validateUser(user);
    expect(completedValidation).toHaveProperty("error");
  });
  it("should return error if email is too short", () => {
    user.email = "1";
    const completedValidation = validateUser(user);
    expect(completedValidation).toHaveProperty("error");
  });
});
