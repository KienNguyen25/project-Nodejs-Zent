const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/VerifyToken');
const CardController = require('../../controllers/CardController');
const validateCardData = require('../../validations/cardValidation');

router.post('/create',verifyToken, validateCardData,CardController.createCard);
router.get('/', verifyToken,CardController.getAllCard);
router.get('/:id', verifyToken,CardController.getCardById);
router.get('/cardInList/:listId',verifyToken, CardController.getCardInList);
router.put('/update/:cardId', verifyToken,validateCardData,CardController.update);
router.delete('/delete/:cardId',verifyToken, CardController.delete);


module.exports = router;