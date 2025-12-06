const jwt = require('jsonwebtoken');
function signJWT(payload){ return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' }); }
function verifyJWT(token){ return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret'); }
module.exports = { signJWT, verifyJWT };