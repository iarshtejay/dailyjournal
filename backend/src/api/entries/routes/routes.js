/**
 * @author Arshdeep Singh
 **/

const express = require("express");
const EntryService = require("../services/service");

const router = express.Router();

/**
 * @author Arshdeep Singh
 * @description Get all entries
 * @params request, response
 * @return entries
 */
router.get("/", (req, res) => {
  EntryService.getAllEntries()
    .then((entries) => {
      if (entries.length > 0) {
        res.status(200).json({
          message: "Entries retrieved",
          success: true,
          entries: entries,
        });
      } else {
        res.status(404).json({
          message: "No entry found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

/**
 * @author Arshdeep Singh
 * @description Get entry with given id
 * @params request, response
 * @return entry
 */
router.get("/entry/:entryId", (req, res) => {
  EntryService.getEntry(req.params.entryId)
    .then((entry) => {
      if (entry) {
        return res.status(200).json({
          success: true,
          message: "Entry fetched",
          entry: entry,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Entry with given id not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
});

/**
 * @author Arshdeep Singh
 * @description Delete entry with given id
 * @params request, response
 * @return result
 */
router.delete("/entry/:entryId", (req, res) => {
  EntryService.deleteEntry(req.params.entryId)
    .then((deleteResult) => {
      if (deleteResult.deletedCount) {
        res.status(200).json({
          message: "Entry deleted",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Entry not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Something went wrong",
        success: false,
      });
    });
});

/**
 * @author Arshdeep Singh
 * @description Update entry with given id
 * @params request, response
 * @return result
 */
router.put("/entry/:entryId", (req, res) => {
  const entryId = req.params.entryId;
  const entry = req.body;
  console.log("Inside update method -->", entryId);
  EntryService.updateEntry(entryId, entry)
    .then((updateResult) => {
      console.log("Update Result --> ", updateResult);
      if (updateResult.acknowledged) {
        res.status(200).json({
          message: "Entry updated",
          success: true,
          entry: entry,
        });
      } else {
        res.status(404).json({
          message: "Entry not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    });
});

/**
 * @author Arshdeep Singh
 * @description Create a new entry
 * @params request, response
 * @return entry
 */
router.post("/", (req, res) => {
  const entry = req.body.entry;
  console.log("create entry-->", entry);
  if (entry) {
    EntryService.createNewEntry(entry)
      .then((newEntry) => {
        res.status(200).json({
          message: "Entry added",
          success: true,
          entry: { ...newEntry },
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
          success: false,
        });
      });
  } else {
    res.status(500).json({
      message: "Invalid Input - Unable to add entry",
      success: false,
    });
  }
});

module.exports = router;
