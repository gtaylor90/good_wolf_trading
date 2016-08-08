import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import $ from 'jquery'
import { User } from '../models/models'
import  toastr  from 'toastr'

const MessengerForm = React.createClass({
  render(){
    return(
      <div>
        <h1>Messenger</h1>
      </div>
    )
  }
})

const Messenger = React.createClass({
  render(){
    return(
      <div className="messagingCont" >
        <MessengerForm />
      </div>

    )
  }
})


export default Messenger
