/**
 * @author Arshdeep Singh
 **/

const { journalNames } = require("../models/Journal");
const Journal = require("../models/Journal");

const getJournal = (journalId) => {
  return Journal.findOne({_id:journalId});
};

const getAllJournals = () => {
  return Journal.find({});
};

const createNewJournal = async (journal) => {
  const newJournal = new Journal(journal);
  return newJournal.save();
};

const deleteJournal = (journalId) => {
  return Journal.deleteOne({ _id: journalId });
};

const updateJournal = (journalId, journal) => {
  return Journal.updateOne({ _id: journalId }, journal);
};

module.exports = {
  getJournal,
  getAllJournals,
  createNewJournal,
  updateJournal,
  deleteJournal,
};
