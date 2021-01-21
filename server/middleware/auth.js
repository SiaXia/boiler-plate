const { User } = require("../models/User");

let auth = (req, res, next) => {
  // authorizing

  // get token from client cookie
  let token = req.cookies.x_auth;

  // decoding the token, find user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });

  // is there user, authorized

  // if not, failed
};

module.exports = { auth };
