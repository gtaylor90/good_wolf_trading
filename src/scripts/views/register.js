import React from 'react'
import ACTIONS from '../actions'
import Header from './navbar'
import  toastr  from 'toastr'

const RegisterView = React.createClass({
  render: function(){
    return(
      <div className="registerView" >
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
            name: evt.currentTarget.userName.value,
            location: evt.currentTarget.location.value,
            // twitterHandle: evt.currentTarget.twitterHandle.value
        })
    },

    render: function() {
        return (
            <div className="loginBox register">
                <form onSubmit={this._handleRegister} >
                    <h3>Register</h3>
                    <div>
                    <input type="text" name = 'userName'
                    placeholder = 'please enter your name' />
                    <input type="email" name="email"
                    placeholder="enter your email" />
                    <input type="password" name="password"
                    placeholder="enter a password" />
                    </div>
                    <div>
                      {/* <input type="text" name = 'twitterHandle'
                      placeholder = 'please enter your twitter @' /> */}
                      <select name="location">
                        <option value="spring">Spring</option>
                        <option value="tomball">Tomball</option>
                        <option value="cypress">Cypress</option>
                        <option value="other">Other</option>
                        <option value="innerLoop">Inner Loop</option>
                      </select>
                    </div>
                    <button type="submit">sign up!</button>
                </form>
            </div>
            )
    }
})

export default RegisterView
