const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const authUser = require("../middleware/authUser");
const { body, validationResult } = require("express-validator");

// Get all notes using GET /api/notes/fetchallnotes . Login required
router.get("/fetchallnotes", authUser, async (req, res) => {
  try {
    const uid = req.user.id;
    const notes = await Notes.find({ uid });
    res.json({
      notes,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

// Add note using POST /api/notes/addnote . Login required
router.post(
  "/addnote",
  authUser,
  [
    body("title", "Title cannot be empty").exists(),
    body("description", "Description cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        uid: req.user.id,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Update a note using PUT /api/notes/updatenote . Login required
router.put("/updatenote/:id", authUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.uid.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

// Delete a note using DELETE /api/notes/deletenote . Login required
router.delete("/deletenote/:id", authUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.uid.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    await Notes.findByIdAndDelete(req.params.id);

    res.send("Note deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
