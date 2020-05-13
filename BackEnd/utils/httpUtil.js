exports.successResponse = (listData = null) => {
  return {
    status: 200,
    code: 'Success',
    payload: listData,
  };
};

exports.appErrorResponse = (error) => {
  return {
    status: error.name === 'ValidationError' ? 400 : 500,
    code: error.name === 'ValidationError' ? 'ERR-APP' : 'ERR-INTERNAL',
    message:
      error.name === 'ValidationError'
        ? error.message.replace(/[^a-zA-Z ]/g, '')
        : 'Internal Server Error',
  };
};

exports.routeNotFoundResponse = (status = 404, message = 'Not Found') => {
  return {
    status: 404,
    code: 'ERR-ROUTE',
    message: 'Not Found',
  };
};
