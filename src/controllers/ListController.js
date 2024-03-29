const ListService = require("../services/ListService");

class ListController {
  createList = async (req, res) => {
    try {
      const { title, description, position, boardId } = req.body;
      console.log("create list success!");
      // console.log(req.body);
      let dataList = {
        title: title,
        description: description,
        position: position,
      };
      const list = await ListService.create(dataList, boardId);
      res.status(200).json({
        list,
      });
    } catch (error) {
      throw error;
    }
  };
  getAllList = async (req, res, next) => {
    try {
      let { sortBy } = req.query;
      // console.log(sortBy);
      const lists = await ListService.getAll(sortBy);
      res.status(200).json({
        lists,
      });
    } catch (error) {
      throw error;
    }
  };

  update = async (req, res, next) => {
    try {
      const { title, description, position } = req.body;
      const { id } = req.params;
      console.log("updated board is success!");
      let data = {
        title: title,
        id: id,
        description: description,
        position: position,
      };
      const result = await ListService.updateList(data);
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
      const { listId } = req.params;
      const result = await ListService.delete(listId);
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
module.exports = new ListController();
