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
  createdAt: { type: Date, default: Date.now },
  location: { type: String, default: "other"},
  twitterHandle: { type: String, required: false }

})

const messageSchema = new Schema({
  messageFor: {type: String, required: true},
  forEmail: {type: String, required: true},
  messageFrom: {type: String, required: true},
  senderEmail: {type: String, required: true},
  messageSubj: {type: String},
  messageCont: {type: String, required: true},
  cardLink: {type: String}
})

const cardSchema = new Schema({
  cardImage: {type:String,
    default:"https://image.deckbrew.com/mtg/multiverseid/0.jpg"},
  cardOwner: {type: String, required: true},
  email: {type: String, required: true},
  cardName: {type: String, required: true},
  cardValue: {type: Number, default: 0},
  cardID: {type: String, required: true},
  cardLocation: {type: String, required: true}
})

module.exports = {
  User: createModel('User', usersSchema),
  Card: createModel('Card', cardSchema),
  MsgModel: createModel('MsgModel', messageSchema)
}
