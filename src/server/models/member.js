var mongoose = require('mongoose');
require('mongoose-setter')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.Promise = require('bluebird');
