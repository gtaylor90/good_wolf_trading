import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import $ from 'jquery'
import { User } from '../models/models'

const BinderRendering = React.createClass({
  _handleOffer(){
    
  },
  render:function(){
    return(
      <div>
      {this.props.cardColl.map((modl)=>{
        return(
          <div key={modl.cid}>
            <h6>{modl.get('cardName')}</h6>
            <input className="button-primary row"
            type="submit" value="X"
            id={modl.get('id')}
            onClick={()=>this._handleOffer()}/>
          </div>
      )
      })}
      </div>
    )

  }
})


const UserBinder = React.createClass({
  componentWillMount() {
      ACTIONS.fetchBinder({
        cardOwner: this.props.uID
      })
      STORE.on('updateContent', ()=>{
        this.setState(STORE.getData())
      })
  },
  getInitialState() {
    return STORE.getData()
  },
  render(){
    return(
      <div>
        <BinderRender uID={this.props.uID} cardColl={this.state} />
      </div>
    )
  }
})

const UserBinderView = React.createClass({
  render(){
    return(
      <div>
        <Header />
        <BinderRender uID={this.props.uID} />
      </div>
    )
  }
})

export default UserBinderView
