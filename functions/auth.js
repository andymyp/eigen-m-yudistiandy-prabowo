const Joi = require('joi');

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req_body);
};

exports.validateLogin = async (req_body) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(req_body);
};