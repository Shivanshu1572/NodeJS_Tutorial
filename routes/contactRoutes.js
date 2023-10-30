const express = require("express");
const router = express.Router();
const { getContacts } = require("../controllers/contactController")
const { createContacts } = require("../controllers/contactController")
const { updateContacts } = require("../controllers/contactController")
const { deleteContacts } = require("../controllers/contactController")
const { getContactbyId } = require("../controllers/contactController");
const validateToken = require("../controllers/middleware/validationTokenHandler");


router.use(validateToken)
router.route("/").get(getContacts).post(createContacts);

router.route("/:id").put(updateContacts).delete(deleteContacts).get(getContactbyId);


module.exports = router;