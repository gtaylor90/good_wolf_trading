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
/*

*/
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
          <div className="register">
              <form className="form-group grid-container"
              onSubmit={this._handleRegister} >
                  <h3>Register</h3>
                  <div className="form-field sm-12-x-12 md-6-x-12 lg-4-x-12">
                    <label>User Name</label>
                    <input type="text" name = 'userName'
                    placeholder = 'please enter your name' />
                  </div>
                  <div className="form-field sm-12-x-12 md-6-x-12 lg-4-x-12">
                    <label>Email Address</label>
                    <input type="email" name="email"
                    placeholder="enter your email" />
                  </div>
                  <div className="form-field sm-12-x-12 md-6-x-12 lg-4-x-12">
                    <label>Password</label>
                    <input type="password" name="password"
                    placeholder="enter a password" />
                  </div>
                  <div className="sm-0-x-12 md-6-x-12 lg-0-x-12"></div>
                  <div className="form-field sm-6-x-12 md-3-x-12 lg-3-x-12">
                    <select name="location">
                      <option value="spring">Spring</option>
                      <option value="tomball">Tomball</option>
                      <option value="cypress">Cypress</option>
                      <option value="other">Other</option>
                      <option value="innerLoop">Inner Loop</option>
                    </select>
                  </div>
                  <div className="form-field sm-6-x-12 md-3-x-12 lg-2-x-12">
                  <button className="btn " type="submit">sign up!</button>
                  </div>
              </form>
              <div>
              </div>
          </div>
            )
    }
})

export default RegisterView
