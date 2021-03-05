const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    User: ObjectId,
    Name: String,
    Password: String,
});

module.exports = {
    User : User,
}