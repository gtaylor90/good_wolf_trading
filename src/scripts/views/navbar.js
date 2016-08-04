//COPIED FROM MONGO MESSAGES

import React from 'react'
import ACTIONS from '../actions'
import { User } from '../models/models'

const Header = React.createClass({
    render: function() {
        return (
            <div id="headerContainer">
                <h1>GoodWolfTrading</h1>
                <h6>welcome, {()=>{
                  if(!User.getCurrentUser().name){
                    return "guest"
                  } else {
                    return User.getCurrentUser().name
                  }
                }
                }</h6>
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    render: function() {
        return (
            <div id="navBar"> {/*made a few edits here so that is makes sense for this app*/}
                <a className="button" href="#login">Log In</a>
                <a className="button" href="#binderBuilder">Binder Builder</a>
                <a className="button" href="#binders">My Binder</a>
                <a className="button" href="#cardSearch">Card Search</a>
                <a className="button" href="#"
                onClick={ACTIONS.logUserOut}>Log Out</a>
            </div>
            )
    }
})

export default Header
