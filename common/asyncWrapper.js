exports.asyncWrapper = (fun) => (req, res, next) =>
  fun(req, res, next).catch(next);
