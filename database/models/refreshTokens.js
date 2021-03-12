const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const refreshToken = new Schema({
    refreshTokenID: ObjectId,
    refreshToken: String
});

module.exports = refreshToken;