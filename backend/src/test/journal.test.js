const app = require("../../index");
const supertest = require("supertest");
const requestWithSuperTest = supertest(app);
const mockingoose = require("mockingoose");
const Journal = require("../api/journals/models/Journal");

require("dotenv").config();

const mockedJournals = [
  //basic journal
  {
    _id: "64c87f29212d4f5e8d9a1c3e",
    title: "Daily Reflections",
    emoji: "📓",
    owner: "64c87f0b212d4f5e8d9a1b0d",
    entries: ["64c880ab212d4f5e8d9a1d1a", "64c880d3212d4f5e8d9a1d1b"],
    dateCreated: "2024-11-01T12:00:00.000Z",
    dateModified: "2024-11-15T18:00:00.000Z",
  },
  //journal with multiple entries
  {
    _id: "64c88013212d4f5e8d9a1c4f",
    title: "Workout Tracker",
    emoji: "🏋️",
    owner: "64c87f6c212d4f5e8d9a1b1e",
    entries: [
      "64c88131212d4f5e8d9a1d30",
      "64c8817a212d4f5e8d9a1d31",
      "64c881d8212d4f5e8d9a1d32",
    ],
    dateCreated: "2024-10-20T08:00:00.000Z",
    dateModified: "2024-11-10T14:30:00.000Z",
  },
  //empty journal
  {
    _id: "64c8809e212d4f5e8d9a1c5d",
    title: "Travel Plans",
    emoji: "✈️",
    owner: "64c87faa212d4f5e8d9a1b2c",
    entries: [],
    dateCreated: "2024-11-18T10:00:00.000Z",
    dateModified: "2024-11-18T10:00:00.000Z",
  },
  //journal with multiple entries
  {
    _id: "64c88112212d4f5e8d9a1c6a",
    title: "Project Ideas",
    emoji: "💡",
    owner: "64c87f2a212d4f5e8d9a1b09",
    entries: [
      "64c88232212d4f5e8d9a1d43",
      "64c88271212d4f5e8d9a1d44",
      "64c882a1212d4f5e8d9a1d45",
      "64c882d3212d4f5e8d9a1d46",
    ],
    dateCreated: "2024-09-15T15:45:00.000Z",
    dateModified: "2024-10-25T19:00:00.000Z",
  },
  //recently updated journal
  {
    _id: "64c88304212d4f5e8d9a1c7f",
    title: "Mood Tracker",
    emoji: "😊",
    owner: "64c87fde212d4f5e8d9a1b19",
    entries: ["64c88364212d4f5e8d9a1d55"],
    dateCreated: "2024-08-01T09:30:00.000Z",
    dateModified: "2024-11-18T11:45:00.000Z",
  },
  //edge case: missing entries and owner
  {
    _id: "64c883df212d4f5e8d9a1c8d",
    title: "Anonymous Thoughts",
    emoji: "🤔",
    owner: null,
    entries: [],
    dateCreated: "2024-11-18T12:00:00.000Z",
    dateModified: "2024-11-18T12:00:00.000Z",
  },
];

const mockedJournalById = {
  _id: "64c88013212d4f5e8d9a1c4f",
  title: "Workout Tracker",
  emoji: "🏋️",
  owner: "64c87f6c212d4f5e8d9a1b1e",
  entries: [
    "64c88131212d4f5e8d9a1d30",
    "64c8817a212d4f5e8d9a1d31",
    "64c881d8212d4f5e8d9a1d32",
  ],
  dateCreated: "2024-10-20T08:00:00.000Z",
  dateModified: "2024-11-10T14:30:00.000Z",
};

const newMockedJournal = {
  _id: "64c88013212d4f5e8d9a1c4f",
  title: "Project Ideas",
  emoji: "🤔",
  owner: "64c87f6c212d4f5e8d9a1b1e",
  entries: [],
  dateCreated: "2024-06-20T08:00:00.000Z",
  dateModified: "2024-06-10T14:30:00.000Z",
};

const newMockedJournalPOST = {
  title: "Project Ideas",
  emoji: "🤔",
  owner: "64c87f6c212d4f5e8d9a1b1e",
  entries: [],
  dateCreated: "2024-06-20T08:00:00.000Z",
  dateModified: "2024-06-10T14:30:00.000Z",
};

describe("Journals CRUD API", () => {
  it("GET /api/journals should show all journals", async () => {
    mockingoose(Journal).toReturn(mockedJournals);

    const resp = await requestWithSuperTest.get("/api/journals/");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Journals retrieved");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("journals", mockedJournals);
  });

  it("GET /api/journal/:id should show journal with id", async () => {
    mockingoose(Journal).toReturn(mockedJournalById, "findOne");

    const resp = await requestWithSuperTest.get(
      "/api/journals/64c87f29212d4f5e8d9a1c3e"
    );

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Journal fetched");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("journal", mockedJournalById);
  });

  it("POST /api/journals/ should add a new journal", async () => {
    mockingoose(Journal).toReturn(newMockedJournal, "save");

    const resp = await requestWithSuperTest
      .post("/api/journals")
      .send({ journal: newMockedJournalPOST });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toHaveProperty("message", "Journal added");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("journal._doc", newMockedJournal);
  });

  it("PUT /api/journals/:id should update the journal with id", async () => {
    const updatedPutJournal = { ...newMockedJournal, name: "Project Ideas2" };
    mockingoose(Journal).toReturn({ acknowledged: true }, "updateOne");

    const resp = await requestWithSuperTest
      .put("/api/journals/64c88013212d4f5e8d9a1c4f")
      .send({ journal: updatedPutJournal });

    console.log(resp.body);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Journal updated");
    expect(resp.body).toHaveProperty("success", true);
    expect(resp.body).toHaveProperty("journal.name", "Project Ideas2");
  });

  it("DELETE /api/journals/:id should delete the journal with id", async () => {
    const updatedPutJournal = { ...newMockedJournal, name: "Project Ideas2" };
    mockingoose(Journal).toReturn(
      { acknowledged: true, deletedCount: 1 },
      "deleteOne"
    );

    const resp = await requestWithSuperTest.delete(
      "/api/journals/64c88013212d4f5e8d9a1c4f"
    );

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty("message", "Journal deleted");
    expect(resp.body).toHaveProperty("success", true);
  });
});
