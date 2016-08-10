import React from 'react'
import ACTIONS from '../actions'
import Header from './navbar'
import RegisterView from './register'
import  toastr  from 'toastr'

const LoginView = React.createClass({
    render: function() {
        return (
            <div className="loginView">
                <Header />
                <LoginBox />
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
            <div className="register">
                <form className="form-group" onSubmit={this._handleRegister} >
                    <h3>Register</h3>
                    <div className="form-field">
                      <label>User Name</label>
                      <input type="text" name = 'userName'
                      placeholder = 'please enter your name' />
                    </div>
                    <div className="form-field">
                      <label>Email Address</label>
                      <input type="email" name="email"
                      placeholder="enter your email" />
                    </div>
                    <div className="form-field">
                      <label>Password</label>
                      <input type="password" name="password"
                      placeholder="enter a password" />
                    </div>
                    <button className="btn" type="submit">sign up!</button>
                </form>
                <div>
                </div>
            </div>
            )
    }
})

const LoginBox = React.createClass({
    _handleLogin: function(evt) {
        evt.preventDefault()
        ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
    },

    render: function() {
        return (
            <div className="loginBox login">
                <form className="form-group grid-container"
                onSubmit={this._handleLogin} >
                    <h3>Log in</h3>
                    <div className="form-field sm-12-x-12 md-6-x-12 lg-3-x-12">
                      <label>Email</label>
                      <input type="email" name="email"
                      placeholder="enter your email" />
                    </div>
                    <div className="form-field sm-12-x-12 md-6-x-12 lg-3-x-12">
                      <label>Password</label>
                      <input type="password" name="password"
                      placeholder="enter a password" />
                    </div>
                    <div className="form-field sm-6-x-12 md-2-x-12 lg-4-x-12">
                      <button type="submit">log in!</button>
                    </div>
                </form>
                <div>
                <RegisterView />
                {/* <a className="button" href="#register">Register!</a> */}
                </div>
            </div>
            )
    }
})
export default LoginView
