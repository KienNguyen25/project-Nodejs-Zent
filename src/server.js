const express = require('express');
//import body parser trong API
var bodyParser = require('body-parser');
const multer = require('multer')
require('dotenv').config()
const app = express();
const port = 3000;
// const taskRouter = require('./routes/v1/taskRouter'); 
const API_v1 = require('./routes/v1');
const errorHandle = require('./middlewares/errorHandler');
//connect db
const db = require('./configs/mongodb');
db.connect();
app.get('/', (req, res) => {
  res.send('<h1>Hello World!- ok 1234</h1>');
})
const upload = multer();
app.use(upload.any())

app.use('/uploads', express.static('upload'))
// app.use('/task',taskRouter);
//su dung bodyPaser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', API_v1);
app.use(errorHandle);


app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`);
})