"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("end-point", () => {
  let name = 'test1';
  let email = 'test@testingusers.com';
  let password = 'password';
  test("signup users", async () => {
    const response = await (0, _supertest.default)(_index.default).post("/api/v1/auth/signup").send({
      name,
      email,
      password
    });
    expect(response.status).toBe(200);
  });
  test("login users", async () => {
    const response = await (0, _supertest.default)(_index.default).post("/api/v1/auth/login").send({
      email,
      password
    });
    expect(response.status).toBe(200);
    expect(response.cookie).toBeUndefined();
  });
  test("Fail to get all countries without token", async () => {
    const response = await (0, _supertest.default)(_index.default).get("/api/v1/countries/search-all");
    expect(response.status).toBe(401);
  });
  test("Fail to get one countries without token", async () => {
    const response = await (0, _supertest.default)(_index.default).get("/api/v1/countries/search-one");
    expect(response.status).toBe(401);
  });
});