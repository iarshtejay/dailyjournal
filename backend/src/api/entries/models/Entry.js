/**
 * @author Arshdeep Singh
 **/

const mongoose = require("mongoose");

const entry = mongoose.Schema({
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

const eventSchema = mongoose.model("Entries", entry);

module.exports = eventSchema;
