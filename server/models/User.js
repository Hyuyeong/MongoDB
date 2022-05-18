const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  Role: {
    type: String,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainpassword, callback) {
  bcrypt.compare(plainpassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
userSchema.methods.generateToken = function (callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;

  user.save(function (err, userInfo) {
    if (err) return callback(err);
    callback(null, userInfo);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  let user = this;
  //user._id + "" = token;
  //decoding token
  jwt.verify(token, 'secretToken', function (err, decoded) {
    //using userId, check token in client and DB
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

// userSchema.methods.comparePassword = function (plainPassword, cb) {
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// userSchema.methods.generateToken = function (cb) {
//   let user = this;

//   // generate token using jsonwebToken
//   let token = jwt.sign(user._id.toHexString(), 'secretToken');

//   user.token = token;
//   user.save(function (err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

const User = mongoose.model('User', userSchema);
module.exports = { User };
