const List = require("../model/List");
const Board = require("../model/Board");

class ListService {
  // create = async (dataList, boardId) => {
  //   try {
  //     const newList = new List(dataList, boardId);
  //     const savedList = await newList.save();
  //     // Thêm Id của list mới vào mảng lists trong Board
  //     await Board.findByIdAndUpdate(boardId, {
  //       $push: {
  //         lists: savedList._id,
  //       },
  //     });
  //     return savedList;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  create = async (dataList, boardId) => {
    try {
      const existingBoard = await Board.findById(boardId);
      if (!existingBoard) {
        const error = new Error(boardId);
        console.error(error);
        return { error: "truong boardId khong ton tai trong csdl" };
      }
      const newList = new List(dataList, boardId);
      const savedList = await newList.save();
      await Board.findByIdAndUpdate(boardId, {
        $push: { lists: savedList._id },
      });
      return savedList;
    } catch (error) {
      throw error;
    }
  };
  getAll = async (sortBy = "asc") => {
    try {
      const lists = await List.find()
        .populate("cards")
        .sort({
          position: sortBy == "asc" ? 1 : -1,
        });
      return lists;
    } catch (error) {
      throw error;
    }
  };
  updateList = async (data) => {
    // console.log(data);
    try {
      await List.findOneAndUpdate({ _id: data.id }, data);
      return await List.findById(data.id);
      // return data;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id) => {
    try {
      // Find the board containing the list
      const board = await Board.findOne({ lists: id });
      if (!board) {
        return "Board not found for the specified list";
      }
      // Remove the list from the database
      const deletedList = await List.findByIdAndDelete(id);
      // Remove the list from the associated board's lists array
      await Board.findByIdAndUpdate(board._id, {
        $pull: {
          lists: id,
        },
      });
      return deletedList;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ListService();
