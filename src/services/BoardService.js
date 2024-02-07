const Board = require("../model/Board")

class BoardService {
    create = async (dataBoard) => {
        try {
            const board = new Board(dataBoard);
            await board.save();
            return board;d
        } catch (error) {
            throw error
        }
    }
    getAll = async () => {
        try {
            // const boards = await Board.find().populate('lists');
            // return boards
            
             // Find all boards and populate the 'lists' field with details
             const boards = await Board.find().populate({
                path: 'lists',
                populate: { path: 'cards' } // Assuming 'cards' is a field in your List model
            });     

            // Ensure 'lists' field contains objects
            const boardsWithLists = boards.map(board => {
                const boardObj = board.toObject(); // Convert Mongoose document to plain JavaScript object
                boardObj.lists = boardObj.lists || []; // Ensure 'lists' field is defined
                return boardObj;
            });

            return boardsWithLists;
        } catch (error) {
            throw error
        }
    }

    updateBoard = async (data) => {
        // console.log(data);
        try {
            await Board.updateOne(data);
            return await Board.findById(data.id);
        } catch (error) {
            throw error
        }
    }
    delete = async (id) => {
        try {
            //Xu lý các nghiệp vụ liên quan
            //gọi đến tầng model
            return await Board.deleteOne({ _id: id });
            return true
        } catch (error) {
            throw error
        }
    }

}
module.exports = new BoardService();
