import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import  toastr  from 'toastr'

const InboxView = React.createClass(){
  return(
    <div>
      <Header />
    </div>
  )
}

export default InboxView
