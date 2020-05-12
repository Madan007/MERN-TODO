const Joi = require('@hapi/joi');
const connection = require('../../utils/db');

exports.saveUpdateToDoValidation = async (req, res, next) => {
  const payloadData = req.body;
  const objectSchema = Joi.object().keys({
    description: Joi.string().allow(null),
    responsible: Joi.string().required(),
    priority: Joi.string().required(),
    completed: Joi.boolean().required(),
  });
  let schema = Joi.array().items(objectSchema);
  Joi.validate(payloadData, schema, { stripUnknown: true });
  next();
};

exports.idValidation = async (req, res, next) => {
  const { id } = req.params;
  if (!connection.isValid(id)) {
    throw { name: 'Validation Error', message: 'Invalid Id' };
  }
  next();
};
