const jwt = require("jsonwebtoken");
const asyncHandler =require('express-async-handler')
const User =require('../module/user')


exports.protect = asyncHandler(async (req, res, next) => {
  // get token //
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // decode the token //
    console.log(req.headers.authorization)
    try {
      token = req.headers.authorization.split(' ')[1];
      //console.log(req.user);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      const id = decoded.id;
      const user = await User.findById(id).select('-password');
      req.user = user;
      next();
    } catch (err) {
      console.error(err.message);
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized To Access This Route');
  }
});

// Grant access to specific roles //
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `User Role ${req.user.role} Is Not Authorized To Access This Route`
        )
      );
    }
    next();
  };
};


