import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'


const app = function() {
  Router = Backbone.Router.extend({

    routes: {
      "home": "handleDashboard",
      "*catchall": "redirect"
      // routes
    },
    redirect: function(){

    },

    initialize: function (args) {
      // super
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
