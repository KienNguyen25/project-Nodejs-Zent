const Joi = require("joi");

const boardValidationSchema = Joi.object({
    title: Joi.string().required(),
    cover: Joi.object({
        originalname: Joi.string(),
        Buffer: Joi.binary(),
    }),
    lists: Joi.array().items(Joi.string()),
});

// Middleware kiểm tra và xác thực dữ liệu
const validateBoardData = (req, res, next) => {
    // Loại bỏ trường id từ req.body
    const { id, ...dataWithoutId } = req.body;

    // Kiểm tra và xác thực dữ liệu đã loại bỏ trường id
    const { error, value } = boardValidationSchema.validate(dataWithoutId, { abortEarly: false });
    console.log(error);
    
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }

    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

module.exports = validateBoardData;
