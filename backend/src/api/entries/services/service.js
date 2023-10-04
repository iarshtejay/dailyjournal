/**
 * @author Arshdeep Singh
 **/

const { entryNames } = require("../models/Entry");
const Entry = require("../models/Entry");

const getEntry = (entryId) => {
  return Entry.findById(entryId);
};

const getAllEntries = () => {
  return Entry.find({});
};

const createNewEntry = async (entry) => {
  const newEntry = new Entry(entry);
  return newEntry.save();
};

const deleteEntry = (entryId) => {
  return Entry.deleteOne({ _id: entryId });
};

const updateEntry = (entryId, entry) => {
  console.log("Entrieservice updateEntry --> ", entry, entryId);
  return Entry.updateOne({ _id: entryId }, entry);
};

module.exports = {
  getEntry,
  getAllEntries,
  createNewEntry,
  updateEntry,
  deleteEntry,
};
