const Contact = require("../Models/contactSchema");
const asynchandler = require("express-async-handler");

// Get all contacts
const getAllContact = asynchandler(async (req, res) => {
  const data = await Contact.find({ uID: req.userData.uid });
  if (data.length === 0) {
    return res.status(200).send("no contacts found");
  }
  res.status(200).json(data);
});

// Create a new contact
const createContact = asynchandler(async (req, res) => {
  const data = req.body;
  const contact = Contact(data);
  const { uid } = req.userData;
  contact.uID = uid;
  const response = await contact.save();
  res.status(200).send(response);
});

// Update an existing contact
const updateContact = asynchandler(async (req, res) => {
  const contactId = req.params.id;
  const updatedData = req.body;
  const { uid } = req.userData;

  // Find the contact and update it
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, uID: uid },
    updatedData,
    { new: true }
  );

  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  res.status(200).json(contact);
});

// Delete a contact
const deleteContact = asynchandler(async (req, res) => {
  const contactId = req.params.id;
  const { uid } = req.userData;

  // Find the contact and delete it
  const contact = await Contact.findOneAndDelete({ _id: contactId, uID: uid });

  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  res.status(200).send("Contact deleted successfully");
});

module.exports = { getAllContact, createContact, updateContact, deleteContact };
