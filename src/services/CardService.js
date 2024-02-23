const List = require("../model/List");
const Card = require("../model/Card");

class CardService {
  create = async (dataCard, listId) => {
    try {
      const newCard = new Card(dataCard, listId);
      const savedCard = await newCard.save();

      const existingList = await List.findById({ _id: listId });
      console.log(existingList);
      if (!existingList) {
        throw new Error("khon ton tai listId trong csdl");
      }
      // Thêm Id của card mới vào mảng cards trong list
      await List.findByIdAndUpdate(listId, {
        $push: {
          cards: savedCard._id,
        },
      });
      return savedCard;
    } catch (error) {
      throw error;
    }
  };
  getAll = async () => {
    try {
      const cards = await Card.find().populate("member");
      return cards;
    } catch (error) {
      throw error;
    }
  };

  getCardInList = async (listId) => {
    try {
      // Query the database based on the cardId and listId
      const cardInList = await List.find({ _id: listId }).populate("cards");
      if (!cardInList) {
        throw new Error("Card not found in the specified list");
      }
      return cardInList;
    } catch (error) {
      throw error;
    }
  };

  getCardById = async (id) => {
    try {
      const cards = await Card.findById({ _id: id });
      return cards;
    } catch (error) {
      throw error;
    }
  };

  updateCard = async (data) => {
    // console.log(data);
    try {
      await Card.findOneAndUpdate({ _id: data.id }, data);
      return await Card.findById(data.id);
      // return data;
    } catch (error) {
      throw error;
    }
  };

  // delete = async (id) => {
  //     try {
  //         const listId = await List.findOne({cards: {$in: [id]}}).populate('cards');
  //         console.log();
  //         // // Remove the list from the database
  //         const deletedCard = await Card.findOneAndDelete({ _id: id });
  //         await List.findByIdAndUpdate(
  //             {_id: listId._id.toString()}, // Assuming 'list' is the field containing the list ID in the Card model
  //             {
  //                 $pull: {
  //                     cards: id
  //                 }
  //             }
  //         );
  //         return deletedCard;
  //     } catch (error) {
  //         throw error;
  //     }
  // }

  delete = async (id) => {
    try {
      // Find the list that contains the card
      const list = await List.findOne({ cards: id });

      if (!list) {
        throw new Error("List not found for the specified card");
      }

      // Remove the card from the database
      const deletedCard = await Card.findOneAndDelete({ _id: id });

      // Remove the card from the associated list's cards array
      await List.findByIdAndUpdate(list._id, {
        $pull: {
          cards: id,
        },
      });

      return deletedCard;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new CardService();
