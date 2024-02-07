const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: {
        type: String, require: true
    },
    cover: {
        originalname : String,
        Buffer: Buffer
      },
    lists: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'List'
    }],
    // description : {type: String},
    // status : {
    //   type: String,
    //   enum: ['todo','doing','done'],
    //   default: 'todo',
    // },
    // member : {type: String, require: true},
}, { timestamps: true });
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
