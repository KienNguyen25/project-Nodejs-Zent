const express = require('express');
const router = express.Router();
const BoardController = require('../../controllers/BoardController');
const verifyToken = require('../../middlewares/VerifyToken');
const validateBoardData = require('../../validations/boardValidation');


router.get('/',verifyToken, BoardController.getAll)
router.post('/create',verifyToken,validateBoardData, BoardController.create);
router.put('/update',verifyToken,validateBoardData, BoardController.update);
router.delete('/delete/:id',verifyToken, BoardController.delete)
module.exports = router;
