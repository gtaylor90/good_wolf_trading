import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import $ from 'jquery'
import { User } from '../models/models'

const BinderRendering = React.createClass({

  _deleteCard: function(modl){
    console.log(this.);
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
            onClick={this._deleteCard}/>
          </div>
      )
      })}
      </div>
    )

  }
})

const BinderView = React.createClass({
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
  render: function(){
    return(
      <div className="binder" >
      <Header />
      <BinderRendering cardColl={this.state.binder} />
      </div>
    )
  }
})


export default BinderView
