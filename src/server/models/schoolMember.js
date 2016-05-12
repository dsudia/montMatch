var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
require('mongoose-setter')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var validations = require('./validations');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.Promise = require('bluebird');

var SchoolMemberSchema = new Schema({
  active: { type: Boolean, default: true },
  admin: { type: Boolean, default: false },
  username: {
    type: String,
    required: true,
    minlength: 6,
    lowercase: true,
    unique: true,
    trim: true
  },
  name: String,
  description: String,
  avatar: { type: String },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    validate: [
      validations.validEmail,
      '{PATH} must be a valid email. Value: `{VALUE}`'
    ]
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  zip: {
    type: Number,
    minlength: 5,
    maxlength: 5
  },
  matchProfile: {
    training: {
      type: [{
        type: Number,
        min: 0,
        max: 4
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    locTypes: {
      type: [{
        type: Number,
        min: 0,
        max: 3
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    orgTypes: {
      type: [{
        type: Number,
        min: 0,
        max: 6
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    sizes: {
      type: [{
        type: Number,
        min: 0,
        max: 3
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    cals: {
      type: [{
        type: Number,
        min: 0,
        max: 1
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    states: {
      type: [{
        type: Number,
        min: 0,
        max: 49
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    traits: {
      type: [{
        type: Number,
        min: 0,
        max: 19
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    },
    ageRanges: {
      type: [{
        type: Number,
        min: 0,
        max: 5
      }],
      validate: [
        validations.uniqueVals,
        'Error, {PATH} must be unique values. Value: `{VALUE}`'
      ]
    }
  },
  _matches: [{
    type: ObjectId,
    ref: 'montMatch.teacherMembers'
  }],
  _staff: [{
    type: ObjectId,
    ref: 'montMatch.teacherMembers'
  }]
});

SchoolMemberSchema.path('names.firstName').trim().capitalize();
SchoolMemberSchema.path('names.lastName').trim().capitalize();
SchoolMemberSchema.plugin(uniqueValidator);

// hash the password before saving it to the db
SchoolMemberSchema.pre('save', function(next) {
  var user= this;
  // only hash if password is new or being modified
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    // override the plain-text password with new hashed/salted password
    user.password = hash;
    // go to next middleware
    next();
  });
});

SchoolMemberSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      return done(err);
    }
    done(err, match);
  });
};

var SchoolMember = mongoose.model('montMatch.teacherMembers,', SchoolMemberSchema);

module.exports = SchoolMember;