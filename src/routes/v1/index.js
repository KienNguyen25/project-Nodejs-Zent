const express = require('express');
const router =  express.Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const boardRoutes = require('./boardRoutes');
const listRoutes = require('./listRoutes');
const cardRoutes = require('./cardRoutes');


router.get('/status', (req, res)=>{
    res.status(200).json({msg :'API ready'});
})
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/board', boardRoutes);
router.use('/list', listRoutes);
router.use('/card', cardRoutes);

module.exports = router