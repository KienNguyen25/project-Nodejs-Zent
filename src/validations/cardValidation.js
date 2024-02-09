const Joi = require("joi");

const cardValidationSchema = Joi.object({
  title: Joi.string().required(),
  cover: Joi.object({
    originalname: Joi.string(),
    Buffer: Joi.binary(),
  }),
  attachments: Joi.array().items(
    Joi.object({
      originalname: Joi.string().regex(/\.(jpg|jpeg|png)$/i),
      Buffer: Joi.binary(),
    })
  ),
  description: Joi.string().allow("").optional(),
  dueDate: Joi.date().iso().optional(),
  member: Joi.array().items(Joi.string()).required(), // Phải là một mảng
}).options({ stripUnknown: true });

const validateCardData = (req, res, next) => {
  const { error, value } = cardValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }
  req.body = value;
  next();
};

module.exports = validateCardData;
