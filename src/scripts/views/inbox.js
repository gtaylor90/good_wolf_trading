import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import  toastr  from 'toastr'

const InboxView = React.createClass(){
  componentWillUnmount(){
    STORE.off('updateContent')
  },
  componentWillMount() {
    if(!User.getCurrentUser()){
      location.hash="login"
    }
    else {
      ACTIONS.fetchBinder({
        cardOwner: User.getCurrentUser()._id
      })
      STORE.on('updateContent', ()=>{
        this.setState(STORE.getData())
      })
    }

  },
  getInitialState() {
    return STORE.getData()
  },
  render:function(){
  return(
    <div>
      <Header />
    </div>
  )
  }
}

export default InboxView
