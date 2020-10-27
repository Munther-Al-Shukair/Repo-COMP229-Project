let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birthday: String,
},
{
    collection: "contacts"
});
// create a user class

module.exports = mongoose.model('Contact', contactModel);