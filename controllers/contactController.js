const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Create contacts
//@route POST /api/contacts
//@access private

const createContacts = asyncHandler(async (req, res) => {
  console.log("This is new Couse:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id : req.user.id
  });

  res.status(201).json(contact);
});

//@desc Update all contacts
//@route PUT /api/contacts/:id
//@access private

const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});

//@desc Delete all contacts
//@route Delete /api/contacts
//@access private

const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//@access private

const getContactbyId = asyncHandler(async (req, res) => {


  try {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
      if (contact) {
        res.status(200).json(contact);
      } else {
  
        res.status(404).json({ message: "No data found" });
      }
    
  } catch (error) {
    res.status(404).json({ message: error.message});
  }

});

module.exports = {
  getContacts,
  createContacts,
  updateContacts,
  deleteContacts,
  getContactbyId,
};
