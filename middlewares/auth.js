import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const [type, token] = req.get("Authorization")
    ? req.get("Authorization").split(" ")
    : [];

  if (type !== "Bearer")
    return res.status(403).json({ errors: ["invalid authorization header"] });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ errors: [err] });

    req.decoded = decoded;
    next();
  });
};
