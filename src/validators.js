const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$")
    ) // Enforce password rules
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$")
    ) // Enforce password rules
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),
});

const createCategorySchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.base": "Category name must be a string",
    "string.min": "Category name must be at least 1 character long",
    "string.max": "Category name must be at most 100 characters long",
    "any.required": "Category name is required",
  }),

  parentCategory: Joi.string().optional().messages({
    "string.base": "Parent category must be a string",
  }),

  status: Joi.string().valid("active", "inactive").required().messages({
    "any.only": 'Status must be either "active" or "inactive"',
    "any.required": "Status is required",
  }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(1).max(100).optional().messages({
    "string.base": "Category name must be a string",
    "string.min": "Category name must be at least 1 character long",
    "string.max": "Category name must be at most 100 characters long",
  }),

});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  createCategorySchema,
  updateCategorySchema,
};
