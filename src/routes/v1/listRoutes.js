const express = require('express');
const router = express.Router();
const ListController = require("../../controllers/ListController")

router.post('/create', ListController.createList)
router.get('/', ListController.getAllList)
router.put('/update', ListController.update)
router.delete('/delete/:listId', ListController.delete)
module.exports = router;
