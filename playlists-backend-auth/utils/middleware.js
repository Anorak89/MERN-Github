// middleware/middleware.js
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request URL: ${req.url}`);
  const modifiedBody = req.body.password ? { ...req.body, password: "**" } : req.body;
  logger.log("Request body:", modifiedBody);
  logger.log("------------");
  next();
};
const errorHandler = (error, req, res, next) => {
  logger.error("error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }
  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};
const tokenPayloadExtractor = (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  next();
};
const userIdentifier = async (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
      if (!decodedToken.id) return res.status(401).json({ error: "Invalid token" });
      req.user = await User.findById(decodedToken.id);
    } catch (error) {
      return res.status(401).json({ error: "Token verification failed" });
    }
  }
  next();
};
module.exports = { requestLogger, errorHandler, unknownEndpoint, tokenPayloadExtractor, userIdentifier };
