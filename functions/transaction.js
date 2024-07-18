const Joi = require('joi');
const db = require('../config/database');

exports.validateBorrow = async (req_body) => {
  const schema = Joi.object({
    member_code: Joi.string().required(),
    book_code: Joi.string().required(),
  });

  return schema.validate(req_body);
};