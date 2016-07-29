import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeview'
import BinderView from './views/binder'
import LoginView from './views/login'
import CardSearchView from './views/cardSearch'
import { Binder } from './models/models'
import { User } from './models/models'
import { CardList } from './models/models'
import { Card } from './models/models'



const app = function() {
  const Router = Backbone.Router.extend({

    routes: {
      "cardSearch": "handleCardSearch",
      "binders": "handleBinders",
      "myBinders/:bID": "handleSingleBinder",
      "card/:mID": "handleSingleCard",
      "home": "handleDashboard",
      "login": "handleLogin",
      "*catchall": "redirect"
      // routes
    },
    handleCardSearch: function(){
      let cardColl = new CardList
      ReactDOM.render(<CardSearchView />, document.querySelector('.container'))
    },
    handleLogin: function(){
      let cardColl = new CardList
      ReactDOM.render(<LoginView cardColl={cardColl} />,
        document.querySelector('.container'))
    },
    handleBinders: function(){
      let binder = new Binder()
      binder.fetch().fail(function(err){
        console.log(err);
      })
      ReactDOM.render(<BinderView cardColl={binder} />,
        document.querySelector('.container'))
    },
    handleDashboard: function(){
      let cardColl = new CardList
      ReactDOM.render(<HomeView cardColl={cardColl}/>,
        document.querySelector('.container'))
    },
    handleSingleCard: function(mID){
      let singleCard = new SingleCard(mID)
      ReactDOM.render(<HomeView cardColl={cardColl}/>,
        document.querySelector('.container'))
    },
    redirect: function(){
      location.hash= "home"
    },

    initialize: function (args) {
      Backbone.history.start()
      this.on('route', function(hndlrName){
        if(!User.getCurrentUser()){
          location.hash= "login"
        }
      })
    },

    main: function () {
      // main
    }

  });
  new Router()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE.
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
