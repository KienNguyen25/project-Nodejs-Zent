const express = require('express');
const router =  express.Router();
const userController = require('../../controllers/UserController');
const verifyToken = require('../../middlewares/VerifyToken');
const validateUserData = require('../../validations/userValidation');
const checkRole = require('../../middlewares/checkRole');
// const validationData = require('../../validations/taskValidation');
//su dung thu vien joi => xac thuc du lieu


// router.get('/:id', (req, res)=>{
//     let id = req.params.id;
//     console.log(id);
//     res.status(200).json({msg : `get id ${id}`})
// })
router.get('/',verifyToken,userController.getAll)
// router.post('/register',validateUserData,verifyToken ,userController.create)
router.post('/register',validateUserData,userController.register)
router.put('/update/:id', [verifyToken,validateUserData],userController.update)
router.delete('/delete/:id',[verifyToken,checkRole],userController.delete)

module.exports = router