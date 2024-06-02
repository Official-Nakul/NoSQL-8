const express = require("express");
const { jwtAuth } = require("../jwt/jwt");
const {
  getAllContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../Controllers/contactController");
const router = express.Router();

// Route to get all contacts
router.route("/").get(jwtAuth, getAllContact);

// Route to create a new contact
router.route("/create").post(jwtAuth, createContact);

// Route to update an existing contact by ID
router.route("/update/:id").put(jwtAuth, updateContact);

// Route to delete an existing contact by ID
router.route("/delete/:id").delete(jwtAuth, deleteContact);

module.exports = router;
