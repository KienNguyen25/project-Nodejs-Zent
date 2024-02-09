// const Card = require("../model/Card");
const CardService = require("../services/CardService");

class CardController {
  createCard = async (req, res) => {
    try {
      const { title, description, dueDate, member } = req.body;
      console.log("create Card success!");
      // console.log(req.files);
      const cover = req.files
        .filter((file) => file.fieldname == "cover")
        .map((file) => ({
          originalname: file.originalname,
          Buffer: file.buffer,
        }))[0];
      const attachments = req.files
        .filter((file) => file.fieldname == "attachments")
        .map((file) => ({
          originalname: file.originalname,
          Buffer: file.buffer,
        }));
      const listId = req.body.listId;
      let dataCard = {
        title,
        description,
        dueDate,
        member,
        cover,
        attachments,
      };

      const card = await CardService.create(dataCard, listId);
      res.status(200).json({
        card,
      });
    } catch (error) {
      throw error;
    }
  };
  getAllCard = async (req, res, next) => {
    try {
      const cards = await CardService.getAll();
      res.status(200).json({
        cards,
      });
    } catch (error) {
      throw error;
    }
  };

  getCardInList = async (req, res, next) => {
    try {
      const { listId } = req.params; // Use req.query to get parameters from the query string
      const cardInList = await CardService.getCardInList(listId);
      res.status(200).json({
        card: cardInList,
      });
    } catch (error) {
      // Handle errors appropriately, e.g., return an error response
      res.status(500).json({
        error: error.message,
      });
    }
  };
  getCardById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await CardService.getCardById(id);
      return res.status(200).json({
        data,
      });
    } catch (error) {
      throw error;
    }
  };

  update = async (req, res, next) => {
    try {
      const { title, description, member, dueDate } = req.body;
      const { cardId } = req.params;
      // Extract cover information from request if available
      const cover = req.files
        .filter((file) => file.fieldname == "cover")
        .map((file) => ({
          originalname: file.originalname,
          Buffer: file.buffer,
        }))[0];
      const attachments = req.files
        .filter((file) => file.fieldname == "attachments")
        .map((file) => ({
          originalname: file.originalname,
          Buffer: file.buffer,
        }));
      console.log("updated board is success!");
      let data = {
        title: title,
        id: cardId,
        description: description,
        member: member,
        dueDate: dueDate,
        cover,
        attachments,
      };
      console.log("Updated card is successful!");
      const result = await CardService.updateCard(data);
      if (result) {
        res.status(200).json({ msg: "updated card is success", extra: result });
      } else {
        // throw new Error('updated fail');
        res.status(403).json({
          msg: "update card fail",
        });
      }
    } catch (error) {
      throw error;
    }
  };

  delete = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const result = await CardService.delete(cardId);
      if (result) {
        res.status(200).json({ msg: "Deleted success" });
      } else {
        throw new Error("Deleted fail");
      }
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new CardController();
