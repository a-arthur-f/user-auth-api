const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    return res
      .status(409)
      .json({ errors: { [field]: `${field} already exists` } });
  }

  if (err.name === "ValidationError") {
    const errors = {};
    for (let field of Object.keys(err.errors)) {
      errors[field] = err.errors[field].message;
    }

    return res.status(404).json(errors);
  }

  if (err == "invalid username or password")
    return res.status(404).json({ err });

  return res.status(500).json({ err });
};

export default errorHandler;
