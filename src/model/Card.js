const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      originalname: String,
      Buffer: Buffer,
    },
    attachments: [
      {
        originalname: String,
        Buffer: Buffer,
      },
    ],
    description: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  { timestamps: true }
);
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
