import React from 'react'
import Header from './navbar'
import STORE from '../store'
import ACTIONS from '../actions'
import $ from 'jquery'
import { User } from '../models/models'
import Notifications, {notify} from 'react-notify-toast';
import  toastr  from 'toastr'


const BinderRendering = React.createClass({

  _deleteCard: function(modl){
    modl.destroy().then(()=>toastr.info("card deleted!"))
  },
  render:function(){
    return(
      <div className="grid-container">
      {this.props.cardColl.map((modl)=>{
        return(
          <div key={modl.cid} className="sm-6-x-12 md-4-x-12 lg-4-x-12">
            <figure id={modl.get('cardID')} className="tn-card">
              <div className="card-image" style={{padding: "1rem"}}>
                <img src={modl.get('cardImage')} />
              </div>
              <figcaption>
              <h6>{modl.get('cardName')}</h6>
              <input className="button-primary row"
              type="submit" value="X"
              id={modl.get('id')}
              onClick={()=>this._deleteCard(modl)}/>
              </figcaption>

            </figure>
          </div>
      )
      })}
      </div>
    )

  }
})

const BinderView = React.createClass({
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
