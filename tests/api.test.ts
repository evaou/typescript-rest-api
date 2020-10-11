import { expect } from "chai";
import app from "../lib/app";
import { agent as request } from "supertest";
import * as env from "env-var";

const SECRET_KEY: string = env.get("SECRET_KEY").required().asString();
var id: string;

describe("API Tests", () => {
  it("should POST /contact", async function () {
    const lastName: string = "wang";
    const phoneNumber: number = 886919111222;

    const res = await request(app).post("/contact").send({
      firstName: "angela",
      lastName: lastName,
      email: "angela.wang@gmail.com",
      phone: phoneNumber,
      company: "wang's company",
    });

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body._id).not.to.be.empty;
    expect(res.body.created_date).not.to.be.empty;
    expect(res.body.lastName).to.equal(lastName);
    expect(res.body.phone).to.equal(phoneNumber);

    id = res.body._id;
  });

  it("should not GET /contact without secret", async function () {
    const res = await request(app).get("/contact");

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("You shall not pass!");
  });

  it("should GET /contact with secret", async function () {
    const res = await request(app).get("/contact").query({ key: SECRET_KEY });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should PUT /contact/:id with new phone number", async function () {
    const newPhoneNumber: number = 886919333444;

    const res = await request(app)
      .put(`/contact/${id}`)
      .send({ phone: newPhoneNumber });

    expect(res.status).to.equal(200);
    expect(res.body._id).to.equal(id);
    expect(res.body.phone).to.equal(newPhoneNumber);
  });

  it("should DELETE /contact/:id", async function () {
    const res = await request(app).delete(`/contact/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Successfully deleted contact!");
  });
});
