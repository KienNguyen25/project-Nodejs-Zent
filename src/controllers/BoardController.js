const BoardService = require("../services/BoardService");
// const Board = require("../model/Board");
class BoardController {
  getAll = async (req, res, next) => {
    try {
      const boards = await BoardService.getAll();
      res.status(200).json({
        boards,
      });
    } catch (error) {
      throw error;
    }
  };
  create = async (req, res, _next) => {
    try {
      const { title, cover } = req.body;
      console.log("create a Board");
      let data = {
        title: title,
        cover: {
          originalname: req.files[0].originalname,
          Buffer: req.files[0].buffer,
        },
      };
      const board = await BoardService.create(data);
      res.status(200).json({
        board,
      });
    } catch (error) {
      throw error;
    }
  };

  update = async (req, res, next) => {
    try {
      const { title, id,cover } = req.body;
      // const { id } = req.params;
      console.log("updated board is success!");
      let data = { title: title, id: id, cover:cover };
      const result = await BoardService.updateBoard(data);
      if (result) {
        res
          .status(200)
          .json({ msg: "updated board is success", extra: result });
      } else {
        // throw new Error('updated fail');
        res.status(403).json({
          msg: "update fail",
        });
      }
    } catch (error) {
      throw error;
    }
  };
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await BoardService.delete(id);
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
module.exports = new BoardController();
