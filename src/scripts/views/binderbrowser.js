import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'



const BinderBrowserView = React.createClass({
  render(){
    return(
      <div>
        <Header />
        <BinderBrowser />
      </div>
    )
  }
})

export default BinderBrowserView
