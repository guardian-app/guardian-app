const express = require('express');
const router = express.Router();
const { createContact, getContactByParentId, editContact, removeContact } = require('../controllers/contact');
const { isAdmin, validateToken } = require('../middleware/users');
const { isParent } = require('../middleware/parents');

router.post('/createContact',validateToken, isParent, createContact)
router.get("/getContactByParentId", validateToken, isAdmin, getContactByParentId);
router.post('/editContact', validateToken, isParent, editContact);
router.post('/removeContact', validateToken, isParent, removeContact);

module.exports = router;