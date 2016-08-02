import { User, CardList, Card, Binder } from './models/models'
import STORE from './store'

const ACTIONS = {
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
    console.log(loc);
    console.log("STORE.data.cardColl from ACTIONS.searchForCards",
    STORE.data.binders);
    STORE.data.locals.fetch({
      data: {

      }
    }).then(function() {
      STORE.emitChange()
    })
  },
  registerUser: function(userObj){
    User.register(userObj).then(()=>this.logUserIn(userObj.email,
      userObj.password),
      (err)=>{
        alert('FAILURE to register')
        console.log(err)
      }
    )
  },
  logUserIn: function(email, password){
    User.login(email, password).then(
      (resp)=> {
        alert(`user ${email} logged in!`)
        console.log(resp)
        location.hash= "home"
      },
      (err)=>{
        alert('FAILURE logging in')
        console.log(err)
      })
  },
  logUserOut: function(){
    User.logout().then(
      ()=> location.hash="login"
    )
  },
  saveCard: function(cardObj){
    var card = new Card(cardObj)
    card.save().then(
      (res)=>{
        alert('card saved!')
        console.log(res)
      },
      (err)=>{
        alert('ya done goofed')
        console.log(err);
      }
    )
  }
}

export default ACTIONS
