/**
 * @author Arshdeep Singh
 **/

const mongoose = require("mongoose");

const journal = mongoose.Schema({
  title: String,
  emoji: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  entries: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Entry",
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

const eventSchema = mongoose.model("Journals", journal);

module.exports = eventSchema;
