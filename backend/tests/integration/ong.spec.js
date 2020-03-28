const request = require("supertest");
const app = require("../../src/app");
const connect = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connect.migrate.rollback();
    await connect.migrate.latest();
  });

  afterAll(async () => {
    await connect.destroy();
  });

  it("should be able to create a new ONG", async () => {
    await request(app)
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@email.com",
        whatsapp: "31982033070",
        city: "Curitiba",
        uf: "PR"
      })
      .then(res => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toHaveLength(8);
      });
  });
});
