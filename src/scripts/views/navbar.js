//COPIED FROM MONGO MESSAGES

import React from 'react'
import ACTIONS from '../actions'
import { User } from '../models/models'
import  toastr  from 'toastr'

const Header = React.createClass({
    getName: function(){
      if(!User.getCurrentUser()){
        return "guest"
      } else {
        return User.getCurrentUser().name
      }
    },
    render: function() {
        return (
            <div id="headerContainer">
                <h1>GoodWolfTrading</h1>
                <h6>welcome, {this.getName()}</h6>
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    render: function() {
        return (
            <div id="navBar"> {/*made a few edits here so that is makes sense for this app*/}
              <nav className="nav-bar">
                <div className="hamburger-menu">
                  <span className="line"></span>
                </div>
                <div className="nav-list">
                <a href="#" onClick={ACTIONS.logUserOut}>Log Out</a>
                <a href="#inbox">Inbox</a>
                <a href="#binderBuilder">Binder Builder</a>
                <a href="#myBinder">My Binder</a>
                <a href="#cardSearch">Card Search</a>
                <a href="#login">Log In</a>
                </div>
              </nav>
            </div>
            )
    }
})

export default Header
