import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeview'
import BinderView from './views/binder'
import { CardList } from './models/models'
import { SingleCard } from './models/models'



const app = function() {
  const Router = Backbone.Router.extend({

    routes: {
      "myBinders": "handleBinders",
      "myBinders/:bID": "handleSingleBinder",
      "card/:mID": "handleSingleCard",
      "home": "handleDashboard",
      "*catchall": "redirect"
      // routes
    },
    handleBinders: function(){
      let cardColl = new CardList
      ReactDOM.render(<BinderView cardColl={cardColl} />,
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
