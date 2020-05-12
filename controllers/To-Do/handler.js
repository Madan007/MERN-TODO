const connection = require('../../utils/db');
const validation = require('./validation');
var ObjectId = require('mongodb').ObjectId;
const { successResponse } = require('../../utils/httpUtil');

exports.getList = async (req, res, next) => {
  const collection = connection.get().db('todos').collection('TODO');

  const listData = await collection.find().toArray();
  return res.json(successResponse(listData));
};

exports.getListById = async (req, res, next) => {
  const { id } = req.params;
  const collection = connection.get().db('todos').collection('TODO');
  const listData = await collection.find({ _id: new ObjectId(id) }).toArray();
  return res.json(successResponse(listData));
};

exports.saveList = async (req, res, next) => {
  const collection = connection.get().db('todos').collection('TODO');
  const response = await collection.insertMany(req.body);
  return res.json(successResponse(response));
};

exports.updateList = async (req, res, next) => {
  const { id } = req.params;
  const collection = connection.get().db('todos').collection('TODO');
  const response = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  return res.json(successResponse(response));
};

exports.deleteList = async (req, res, next) => {
  const { id } = req.params;
  const collection = connection.get().db('todos').collection('TODO');
  const response = await collection.deleteOne({ _id: new ObjectId(id) });
  return res.json(successResponse(response));
};
