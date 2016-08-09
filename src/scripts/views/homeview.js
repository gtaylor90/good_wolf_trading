import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import  toastr  from 'toastr'

const Hero = React.createClass({
  render(){
    return(
      <header class="hero">
        <h1>Welcome to GoodWolfTrading!</h1>
        <h2>Let's get Started!</h2>
        <a className="btn" href="#binderBuilder">Binder Builder</a>
      </header>
    )
  }
})

const HomeView = React.createClass({
  render(){
    return(
      <div>
        <Header />
        <Hero />
      </div>
    )
  }
})

export default HomeView
