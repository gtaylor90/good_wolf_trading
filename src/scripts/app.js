import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeview'
import { CardList } from './models/models'
import { SingleCard } from './models/models'



const app = function() {
  const Router = Backbone.Router.extend({

    routes: {
      "card/:mID": "handleSingleCard",
      "home": "handleDashboard",
      "*catchall": "redirect"
      // routes
    },

    handleDashboard: function(){
      var cardColl = new CardList
      ReactDOM.render(<HomeView cardColl={cardColl}/>,
        document.querySelector('.container'))
    },
    handleSingleCard: function(mID){
      var singleCard = new SingleCard(mID)
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
