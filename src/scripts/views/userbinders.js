import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import $ from 'jquery'
import { User } from '../models/models'

const UserBinder = React.createClass({
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
  render(){
    return(
      <div>
        <BinderRender uID={this.props.uID} />
      </div>
    )
  }
})

const UserBinderView = React.createClass({
  render(){
    return(
      <div>
        <Header />
        <BinderRender uID={this.props.uID} cardColl={this.state} />
      </div>
    )
  }
})

export default UserBinderView
