// CORE COMPONENTS
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import ACTIONS from './actions'
import STORE from './store'
import toastr from 'toastr'
import Notifications, {notify} from 'react-notify-toast';

// VIEWS FROM THE 6
import BinderBuilderView from './views/binderbuilder'
import BinderView from './views/binder'
import HomeView from './views/homeview'
import LoginView from './views/login'
import InboxView from './views/inbox'
import CardSearchView from './views/cardSearch'
import RegisterView from './views/register'
import UserBinderView from './views/userbinders'
import BinderBrowserView from './views/binderbrowser'

// MODELS
import { Binder } from './models/models'
import { User } from './models/models'
import { CardList } from './models/models'
import { Card } from './models/models'



const app = function() {
  const Router = Backbone.Router.extend({

    routes: {
      "binderBuilder": "handleBinderBuilder",
      "register": "handleRegisterView",
      "cardSearch": "handleCardSearch",
      "myBinder": "handleBinders",
      "binders/:bID": "handleSingleBinder",
      "inbox": "handleInbox",
      "home": "handleDashboard",
      "login": "handleLogin",
      "*catchall": "redirect"
      // routes
    },
    handleSingleBinder: function(bID){
      <UserBinderView uID={bID} />
    },
    handleInbox: function(){
      ReactDOM.render(<InboxView />, document.querySelector('.container'))
    },
    handleRegisterView: function(){
      ReactDOM.render(<RegisterView />, document.querySelector('.container'))
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
      // let binder = new Binder()
      // console.log(binder.fetch());
      // binder.fetch({data:{
      //   cardOwner: User.getCurrentUser()
      // }}).fail(function(err){
      //   console.log(err);
      // })

      ReactDOM.render(<BinderView />,
        document.querySelector('.container'))
    },
    handleBinderBuilder: function(){
      let cardColl = new CardList
      ReactDOM.render(<BinderBuilderView cardColl={cardColl}/>,
        document.querySelector('.container'))
    },
    handleDashboard: function(){
      ReactDOM.render(<HomeView />,
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
