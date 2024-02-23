const { number } = require("joi");
const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    position: {
      type: Number,
      require: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);
const List = mongoose.model("List", listSchema);
module.exports = List;
