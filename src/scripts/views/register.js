import React from 'react'
import ACTIONS from '../actions'
import Header from './navbar'

const RegisterView = React.createClass({
  render: function(){
    return(
      <div className="registerView" >
        <Header />
        <RegisterBox />
      </div>
    )
  }
})

const RegisterBox = React.createClass({

    _handleRegister: function(evt) {
        evt.preventDefault()
        ACTIONS.registerUser({
            email: evt.currentTarget.email.value,
            password: evt.currentTarget.password.value,
            name: evt.currentTarget.userName.value
        })
    },

    render: function() {
        return (
            <div className="loginBox register">
                <form onSubmit={this._handleRegister} >
                    <h3>Register</h3>
                    <input type="text" name = 'userName'
                    placeholder = 'please enter your name' />
                    <input type="email" name="email"
                    placeholder="enter your email" />
                    <input type="password" name="password"
                    placeholder="enter a password" />
                    <button type="submit">sign up!</button>
                </form>
            </div>
            )
    }
})

export default RegisterView
