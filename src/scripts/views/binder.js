import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import { User } from '../models/models'

const BinderRendering = React.createClass({

  render:function(){
    console.log("what is passed through props",this.props.cardColl);
    return(
      <div>
      {this.props.cardColl.map((modl)=>{
        console.log(modl.get('cardName'))
        return(
          <div key={modl.cid}>
            <h6>{modl.get('cardName')}</h6>
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
    console.log('some information hopefully', this.state.binder)
    return(
      <div className="binder" >
      <Header />
      <BinderRendering cardColl={this.state.binder} />
      </div>
    )
  }
})


export default BinderView
