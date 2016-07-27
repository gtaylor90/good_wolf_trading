import { User, CardList } from './models/models'
import STORE from './store'

const ACTIONS = {
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
  }
}

export default ACTIONS
