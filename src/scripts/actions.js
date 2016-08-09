import { User, CardList, Card, Binder, MsgModel, MsgCollection } from './models/models'
import STORE from './store'
import Notifications, {notify} from 'react-notify-toast';
import  toastr  from 'toastr'

const ACTIONS = {
  toggleModal: function(modalInfoObj){
    if(typeof modalInfoObj !== "object"){
      throw new Error("arg needs to be an obj")
    }
    if(typeof modalInfoObj.modalIsShowing === "undefined"
    || modalInfoObj.payload === "undefined"){
      throw new Error("object missing payload or modalIsShowing property")
    }
    STORE.set("dataForModal", modalInfoObj)
  },
  fetchBinder: function(queryObj){
    STORE.data.binder.fetch({
      data: queryObj
    })
  },
  fetchLocals: function(qobj){
    STORE.data.locals.fetch({
      data: qobj
    })
  },
  searchForCards: function(q){
    console.log(q);
    console.log("STORE.data.cardColl from ACTIONS.searchForCards",
    STORE.data.cardColl);
    STORE.data.cardColl.fetch({
      data: {
        q: q
      }
    }).then(function() {
      STORE.emitChange()
    })
  },
  searchForLocalCards: function(loc){
    let locals = new Binder
    locals.fetch({
      data: loc
    }).then(function() {
      STORE.set("locals", locals)
    })
  },
  registerUser: function(userObj){
    User.register(userObj).then(()=>this.logUserIn(userObj.email,
      userObj.password),
      (err)=>{
        toastr.error('FAILURE to register')
        console.log(err)
      }
    )
  },
  logUserIn: function(email, password){
    User.login(email, password).then(
      (resp)=> {
        toastr.success(`user ${email} logged in!`)
        console.log(resp)
        location.hash= "home"
      },
      (err)=>{
        toastr.error('FAILURE logging in')
        console.log(err)
      })
  },
  logUserOut: function(){
    User.logout().then(
      ()=> location.hash="login"
    )
  },
  sendMessage: function(cardObj){
    var msg = new MsgModel(cardObj)
    msg.save().then(
      (res)=>{
        toastr.success('Message Sent!')
        console.log(res)
        ACTIONS.toggleModal({
        modalIsShowing: false,
        payload: {},
        modalType: "default"})
      },
      (err)=>{
        toastr.error('ya done goofed')
        console.log(err);
      }
    )
  },
  saveCard: function(cardObj){
    var card = new Card(cardObj)
    card.save().then(
      (res)=>{
        toastr.success('card saved!')
        console.log(res)
      },
      (err)=>{
        toastr.error('ya done goofed')
        console.log(err);
      }
    )
  }
}

export default ACTIONS
// User.find({ username: {$regex : "^" + req.params.username}})
