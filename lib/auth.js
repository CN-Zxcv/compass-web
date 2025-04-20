const base64 = require('base-64');
require('dotenv').config();

function _decodeCredentials(header) {
  const encode = header.trim().replace(/Basic\s+/i, '');
  const decode = base64.decode(encode);
  return decode.split(':');
}

function auth(req, res, next) {
  console.log('auth');
  const [username, password] = _decodeCredentials(
    req.headers.authorization || ''
  );
    console.log(process.env);
  if (process.env.COMPASS_USERNAME == undefined && process.env.COMPASS_PASSWORD == undefined) {
    return next();
  } else {
    if (
      username === process.env.COMPASS_USERNAME &&
      password === process.env.COMPASS_PASSWORD
    ) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Authentication required!');
  }
}

module.exports = {
  auth,
};
