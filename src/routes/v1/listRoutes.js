const express = require('express');
const router = express.Router();
const ListController = require("../../controllers/ListController")
const verifyToken = require('../../middlewares/VerifyToken');
const validateListData = require('../../validations/listValidation');

router.post('/create',verifyToken,validateListData, ListController.createList)
router.get('/',verifyToken,ListController.getAllList)
router.put('/update/:id', verifyToken,validateListData,ListController.update)
router.delete('/delete/:listId', verifyToken,validateListData,ListController.delete)
module.exports = router;
