/**
 * @author Arshdeep Singh
 **/

const { journalNames } = require("../models/Journal");
const Journal = require("../models/Journal");

const getJournal = (journalId) => {
  return Journal.findOne({id:journalId});
};

const getAllJournals = () => {
  return Journal.find({});
};

const createNewJournal = async (journal) => {
  const newJournal = new Journal(journal);
  return newJournal.save();
};

const deleteJournal = (journalId) => {
  return Journal.deleteOne({ id: journalId });
};

const updateJournal = (journalId, journal) => {
  console.log("Journalservice updateJournal --> ", journal, journalId);
  return Journal.updateOne({ id: journalId }, journal);
};

module.exports = {
  getJournal,
  getAllJournals,
  createNewJournal,
  updateJournal,
  deleteJournal,
};
