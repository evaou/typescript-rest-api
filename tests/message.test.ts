import { expect } from "chai";
import app from "../lib/app";
import { agent as request } from "supertest";

describe("Message Tests", () => {
  it("should POST /message", async function () {
    const res = await request(app).post("/message");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("The POST request is being processed!");
  });
});
