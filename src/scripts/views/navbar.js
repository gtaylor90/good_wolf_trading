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
                <a className="btn" href="#login">Log In</a>
                <a className="btn" href="#home">Home</a>
                <a className="btn" href="#inbox">Inbox</a>
                <a className="btn" href="#binderBuilder">Binder Builder</a>
                <a className="btn" href="#myBinder">My Binder</a>
                <a className="btn" href="#cardSearch">Card Search</a>
                <a className="btn" href="#"
                onClick={ACTIONS.logUserOut}>Log Out</a>
            </div>
            )
    }
})

export default Header
