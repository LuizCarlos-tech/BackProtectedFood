const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/passport/config').jwtSecret;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).json({ error: 'No admin tokens provided'});

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).json({ error: 'Admin Token Error'});

    const [ schema, token ] = parts;

  if( !/^Bearer$/i.test(schema))
    return res.status(401).json({ error: 'Badly formatted admin token'});

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid admin token' });
  });
  
  return next();
}