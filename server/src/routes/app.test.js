import supertest from 'supertest';
import app from '../index';

describe("end-point", () => {
  let name = 'test1';
  let email = 'test@testingusers.com';
  let password = 'password';

  test("signup users", async () => {
    const response = await supertest(app).post("/api/v1/auth/signup").send({
      name,
      email,
      password
    });

    expect(response.status).toBe(200);
  });

  test("login users", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      email,
      password
    });

    expect(response.status).toBe(200);
    expect(response.cookie).toBeUndefined();
  });

  test("Fail to get all countries without token", async () => {
    const response = await supertest(app).get("/api/v1/countries/search-all");

    expect(response.status).toBe(401);
  });

  test("Fail to get one countries without token", async () => {
    const response = await supertest(app).get("/api/v1/countries/search-one");

    expect(response.status).toBe(401);
  });
})


