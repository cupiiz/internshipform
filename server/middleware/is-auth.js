const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = 'Not authenticated.';
    const status = 401;
    return res.status(status).json({ message: error, code: status });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    const error = 'Unknow Error.';
    const status = 500;
    return res.status(status).json({ message: error, code: status });
  }
  if (!decodedToken) {
    const error = 'Not authenticated.';
    const status = 401;
    return res.status(status).json({ message: error, code: status });
  }

  req.userId = decodedToken.userId;
  next();
};
