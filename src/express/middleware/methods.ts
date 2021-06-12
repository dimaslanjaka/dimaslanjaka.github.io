const methods =
  (methods = ["GET"]) =>
  (req, res, next) => {
    if (methods.includes(req.method)) return next();
    res.error(405, `The ${req.method} method for the "${req.originalUrl}" route is not supported.`);
  };

export default methods;
