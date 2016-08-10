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
      <header className="hero">
        <div className="container-narrow">
          <h1 className="title">Welcome to GoodWolfTrading!</h1>
          <h3 className="subtitle">Let's get Started!</h3>
          <div className="grid-container">
            <a className="btn sm-6-x-12 md-3-x-12 lg-2-x-12"
            href="#binderBuilder">Binder Builder</a>
            <a className="btn sm-6-x-12 md-3-x-12 lg-2-x-12"
            href="#myBinder">Your Binder</a>
          </div>
        </div>
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
