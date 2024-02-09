const Joi = require("joi");

// Define the validation schema for the list
const listValidationSchema = Joi.object({
  title:  Joi.string().required().min(2).max(60).trim().strict().messages({
    'string.base': `"title" must be a string`,
    'string.empty': `"title" cannot be empty`,
    'string.min': `"title" must have at least {#limit} characters`,
    'string.max': `"title" must have at most {#limit} characters`,
    'any.required': `"title" is required`
  }),
  description: Joi.string().required().messages({
    'string.base': `"description" must be a string`,
    'string.empty': `"description" cannot be empty`,
    'any.required': `"description" is required`
  }),
  position: Joi.string().required().messages({
    'string.base': `"position" must be a string`,
    'string.empty': `"position" cannot be empty`,
    'any.required': `"position" is required`
  }),
}).options({stripUnknown: true});

// Middleware for validating list data
const validateListData = (req, res, next) => {
    const { error, value } = listValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
    
      // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
      req.body = value;
      next();
};

module.exports = validateListData;
