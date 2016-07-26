import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeview'
import { SingleCard } from './models/models'



const app = function() {
  const Router = Backbone.Router.extend({

    routes: {
      "home": "handleDashboard",
      "*catchall": "redirect"
      // routes
    },

    handleDashboard: function(){
      ReactDOM.render(<HomeView />, document.querySelector('.container'))
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
