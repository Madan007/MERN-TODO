const express = require('express');
const router = express.Router();

const { saveUpdateToDoValidation } = require('./To-Do/validation');

const { asyncWrapper: _async } = require('../common');
const toDoHandler = require('./To-Do/handler');

router.use((req, res, next) => {
  console.log('invoked Controller....');
  next();
});

router.get('/', [_async(toDoHandler.getList)]);
router.get('/:id', [_async(toDoHandler.getListById)]);
router.post('/', [saveUpdateToDoValidation, _async(toDoHandler.saveList)]);
router.put('/:id', [saveUpdateToDoValidation, _async(toDoHandler.updateList)]);
router.delete('/:id', [_async(toDoHandler.deleteList)]);

module.exports = router;
