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
const cardSchema = new Schema({
  cardOwner: {type: String, required: true},
  cardID: {type: String, required: true}
})
const collectionSchema = new Schema({
  collectionOwner: { type: String, required: true},
  collectionContents: { type: [String] },
  lastUpdate: { type: Date, default: Date.now }
})

module.exports = {
  User: createModel('User', usersSchema),
  Card: createModel('Card', cardSchema)
}
