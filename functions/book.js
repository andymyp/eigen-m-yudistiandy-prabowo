const Joi = require('joi');

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    book_code: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required(),
  });

  return schema.validate(req_body);
};

exports.validateUpdate = async (req_body) => {
  const schema = Joi.object({
    book_code: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required(),
  });

  return schema.validate(req_body);
};

exports.validateDelete = async (req_body) => {
  const schema = Joi.object({
    book_code: Joi.string().required(),
  });

  return schema.validate(req_body);
};