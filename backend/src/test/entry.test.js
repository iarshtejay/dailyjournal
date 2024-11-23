const app = require("../../index");
const supertest = require("supertest");
const requestWithSuperTest = supertest(app);
const mockingoose = require("mockingoose");
const Entry = require("../api/entries/models/Entry");

require("dotenv").config();

const mockedEntries = [
  {
    _id: "648e0f4b5f9b34777a9d0c1a",
    detail: "Reflecting on personal growth this year.",
    dateCreated: "2024-11-20T10:00:00.000Z",
    dateModified: "2024-11-20T12:00:00.000Z",
  },
  {
    _id: "648e0f4b5f9b34777a9d0c1b",
    detail: "Notes from a productive meeting with the team.",
    dateCreated: "2024-11-21T09:30:00.000Z",
    dateModified: "2024-11-21T11:45:00.000Z",
  },
  {
    _id: "648e0f4b5f9b34777a9d0c1c",
    detail: "Brainstorming ideas for a new project launch.",
    dateCreated: "2024-11-22T08:15:00.000Z",
    dateModified: "2024-11-22T10:30:00.000Z",
  },
  {
    _id: "648e0f4b5f9b34777a9d0c1d",
    detail: "Reflections after a challenging but rewarding day.",
    dateCreated: "2024-11-22T14:00:00.000Z",
    dateModified: "2024-11-22T16:00:00.000Z",
  },
  {
    _id: "648e0f4b5f9b34777a9d0c1e",
    detail: "Grateful for small moments of joy today.",
    dateCreated: "2024-11-23T07:00:00.000Z",
    dateModified: "2024-11-23T09:00:00.000Z",
  },
];

const mockedEntryById = {
  _id: "648e0f4b5f9b34777a9d0c1a",
  detail: "Reflecting on personal growth this year.",
  dateCreated: "2024-11-20T10:00:00.000Z",
  dateModified: "2024-11-20T12:00:00.000Z",
};

const newMockedEntry = {
  _id: "648e0f4b5f9b34777a9d0c1b",
  detail: "Notes from a productive meeting with the team.",
  dateCreated: "2024-11-21T09:30:00.000Z",
  dateModified: "2024-11-21T11:45:00.000Z",
};

const newMockedEntryPOST =   {
  detail: "Cooking tips from mom",
  dateCreated: "2024-11-21T09:30:00.000Z",
  dateModified: "2024-11-21T11:45:00.000Z",
};

describe("Entries CRUD API", () => {
  it("GET /api/entries should show all entries", async () => {
    mockingoose(Entry).toReturn(mockedEntries);

    const resp = await requestWithSuperTest.get("/api/entries/");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Entries retrieved");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("entries", mockedEntries);
  });

  it("GET /api/entries/:id should show entry with id", async () => {
    mockingoose(Entry).toReturn(mockedEntryById, "findOne");

    const resp = await requestWithSuperTest.get(
      "/api/entries/648e0f4b5f9b34777a9d0c1a"
    );

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Entry fetched");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("entry", mockedEntryById);
  });

  it("POST /api/entries/ should add a new entry", async () => {
    mockingoose(Entry).toReturn(newMockedEntry, "save");

    const resp = await requestWithSuperTest
      .post("/api/entries")
      .send({ entry: newMockedEntryPOST });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toHaveProperty("message", "Entry added");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("entry._doc", newMockedEntry);
  });

  it("PUT /api/entries/:id should update the entry with id", async () => {
    const updatedPutEntry = { ...newMockedEntry, detail: "Cooking tips from dad" };
    mockingoose(Entry).toReturn({ acknowledged: true }, "updateOne");

    const resp = await requestWithSuperTest
      .put("/api/entries/648e0f4b5f9b34777a9d0c1b")
      .send({ entry: updatedPutEntry });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Entry updated");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("entry.detail", "Cooking tips from dad");
  });

  it("DELETE /api/entries/:id should delete the entry with id", async () => {
    const updatedPutEntry = { ...newMockedEntry, name: "Project Ideas2" };
    mockingoose(Entry).toReturn(
      { acknowledged: true, deletedCount: 1 },
      "deleteOne"
    );

    const resp = await requestWithSuperTest.delete(
      "/api/entries/64c88013212d4f5e8d9a1c4f"
    );

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Entry deleted");
    expect(resp.body).toHaveProperty("success", true);
  });
});
