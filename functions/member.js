const Joi = require('joi');

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    member_code: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(req_body);
};

exports.validateUpdate = async (req_body) => {
  const schema = Joi.object({
    member_code: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(req_body);
};

exports.validateDelete = async (req_body) => {
  const schema = Joi.object({
    member_code: Joi.string().required(),
  });

  return schema.validate(req_body);
};