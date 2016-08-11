//COPIED FROM MONGO MESSAGES

import React from 'react'
import ACTIONS from '../actions'
import { User } from '../models/models'
import  toastr  from 'toastr'

const Header = React.createClass({
    render: function() {
        return (
            <div id="headerContainer">
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    getName: function(){
      if(!User.getCurrentUser()){
        return "guest"
      } else {
        return User.getCurrentUser().name
      }
    },
    render: function() {
        return (
            <div id="navBar"> {/*made a few edits here so that is makes sense for this app*/}
            <h1 className="goodWolfTrading" style={{marginBottom: "0",
                        marginLeft: "3rem"
                }}>GoodWolfTrading</h1>
                <h3 className="names">welcome, {this.getName()}</h3>
              <nav className="nav-bar">
              <input type="checkbox" className="hamburger-toggler"/>

              <div className="hamburger-menu">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </div>

                <div className="nav-list">
                <a href="#" onClick={ACTIONS.logUserOut}>Log Out</a>
                <a href="#inbox">Inbox</a>
                <a href="#cardSearch">Card Search</a>
                <a href="#myBinder">My Binder</a>
                <a href="#binderBuilder">Binder Builder</a>
                <a href="#login">Log In</a>
                </div>
              </nav>
            </div>
            )
    }
})

export default Header
