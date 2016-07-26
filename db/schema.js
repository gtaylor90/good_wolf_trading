const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})
const collectionSchema = new Schema({
  collectionName: { type: String, required: true},
  collectionOwner: { type: String, required: true},
  collectionContents: { type: [Number] }
  //this needs to be the MUID from the API
})

module.exports = {
  User: createModel('User', usersSchema)
}
