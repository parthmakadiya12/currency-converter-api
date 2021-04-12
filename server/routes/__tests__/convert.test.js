import app from "../../app";

jest.mock("../../provider/conversionalRateProvider.js", () =>
  jest.fn(() => {
    return {
      EUR: 1,
      USD: 1.18,
      INR: 88,
    };
  })
);

const supertest = require("supertest");
const request = supertest(app);

describe("Convert API", () => {
  it("should throw Error for not valid country", async () => {
    const res = await request.get("/convert?from=WWW&to=INR&amount=100");
    expect(res.status).toBe(416);
    expect(res.body).toEqual({ error: "Given WWW value is not valid" });
  });

  it("should throw Error for not valid amount", async () => {
    const res = await request.get("/convert?from=USD&to=INR&amount=XW");
    expect(res.status).toBe(416);
    expect(res.body).toEqual({ error: "Given value is not a number XW" });
  });

  it("should return correct value for INR and USD", async () => {
    const res = await request.get("/convert?from=INR&to=USD&amount=74");
    expect(res.status).toBe(200);
    expect(res.body.amount).toEqual("74");
    expect(res.body.from).toEqual("INR");
    expect(res.body.total).toEqual(0.9922727272727272);
  });

  it("should return correct value for EUR and INR", async () => {
    const res = await request.get("/convert?from=EUR&to=INR&amount=74");
    expect(res.status).toBe(200);
    expect(res.body.amount).toEqual("74");
    expect(res.body.from).toEqual("EUR");
    expect(res.body.total).toEqual(6512);
  });

  it("should return correct value for INR and EUR", async () => {
    const res = await request.get("/convert?from=INR&to=EUR&amount=88.11");
    expect(res.status).toBe(200);
    expect(res.body.amount).toEqual("88.11");
    expect(res.body.from).toEqual("INR");
    expect(res.body.total).toEqual(1.00125);
  });
});
