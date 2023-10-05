/**
 * @author Arshdeep Singh
 **/

const express = require("express");
const JournalService = require("../services/service");

const router = express.Router();

/**
 * @author Arshdeep Singh
 * @description Get all journals
 * @params request, response
 * @return journals
 */
router.get("/", (req, res) => {
  JournalService.getAllJournals()
    .then((journals) => {
      if (journals.length > 0) {
        res.status(200).json({
          message: "Journals retrieved",
          success: true,
          journals: journals,
        });
      } else {
        res.status(404).json({
          message: "No journal found",
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
 * @description Get journal with given id
 * @params request, response
 * @return journal
 */
router.get("/:journalId", (req, res) => {
  JournalService.getJournal(req.params.journalId)
    .then((journal) => {
      if (journal) {
        return res.status(200).json({
          success: true,
          message: "Journal fetched",
          journal: journal,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Journal with given id not found",
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
 * @description Delete journal with given id
 * @params request, response
 * @return result
 */
router.delete("/:journalId", (req, res) => {
  JournalService.deleteJournal(req.params.journalId)
    .then((deleteResult) => {
      if (deleteResult.deletedCount) {
        res.status(200).json({
          message: "Journal deleted",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Journal not found",
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
 * @description Update journal with given id
 * @params request, response
 * @return result
 */
router.put("/:journalId", (req, res) => {
  const journalId = req.params.journalId;
  const journal = req.body.journal;
  const newJournalEntry = { ...journal, dateModified: Date.now()}
  console.log("Inside update method -->", journalId);
  JournalService.updateJournal(journalId, newJournalEntry)
    .then((updateResult) => {
      console.log("Update Result --> ", updateResult);
      if (updateResult.acknowledged) {
        res.status(200).json({
          message: "Journal updated",
          success: true,
          journal: newJournalEntry,
        });
      } else {
        res.status(404).json({
          message: "Journal not found",
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
 * @description Create a new journal
 * @params request, response
 * @return journal
 */
router.post("/", (req, res) => {
  const journal = req.body.journal;
  console.log("create journal-->", journal);
  if (journal) {
    JournalService.createNewJournal(journal)
      .then((newJournal) => {
        res.status(200).json({
          message: "Journal added",
          success: true,
          journal: { ...newJournal },
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
      message: "Invalid Input - Unable to add journal",
      success: false,
    });
  }
});

module.exports = router;
