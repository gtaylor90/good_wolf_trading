import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import ModalWindow_msg from './modalwindowmsg'
import { User } from '../models/models'
import  toastr  from 'toastr'

const Msg = React.createClass({
  _reply: function(modl){
		console.log(modl);
		ACTIONS.toggleModal({
      modalIsShowing: true,
      payload: modl,
      modalType: "messageToCardOwner"
    })
  },
	_ignore: function(modl){
		let toBeDestroyed = STORE.data.msgColl.find({_id: modl.id})
		console.log("the model", toBeDestroyed);
		toBeDestroyed.destroy().then(toastr.info('message ignored'))
	},
	render: function() {
		return (
			<div className="sm-4-x-12 md-4-x-12">
				<figure className="tn-card">
					<figcaption >
						<h4>from: {this.props.record.get('messageFrom')}</h4>
						<p>Subject: {this.props.record.get('messageSubj')}</p>
						<p>Message: {this.props.record.get('messageCont')}</p>
						<div className="grid-container">
      				<button onClick={()=>this._ignore(this.props.record)} >ignore</button>
							<button onClick={()=>this._reply(this.props.record)} >reply</button>
      			</div>
     			</figcaption>
				</figure>
			</div>
			)
	}
})

const Inbox = React.createClass({
	_makeMsg: function(record) {
		return (
			<div key={record.id} className="sm-12-x-12 md-6-x-12 lg-4-x-12" >
			<Msg key={record.id} record={record} />
			</div>
		)
	},

	render: function() {
		return (
			<div className="grid-container">
				{this.props.coll.map((modl)=>this._makeMsg(modl))}
			</div>
			)
	}
})

const InboxView = React.createClass({

	getInitialState: function() {
    return STORE.getData()
	},

	componentWillMount: function() {
		if(!User.getCurrentUser()){
      location.hash="login"
    }
    else {
      ACTIONS.fetchMessages()
      STORE.on('updateContent',
      ()=> this.setState( STORE.getData() ) )
    }
	},

	componentWillUnmount(){
    STORE.off('updateContent')
  },

	render: function() {
		// console.log(this.state.msgColl);
		return (
			<div className="inboxView">
				<ModalWindow_msg dataForModal={this.state.dataForModal}/>
				<Header />
				<Inbox coll={this.state.msgColl} />
			</div>
			)
	}
})


export default InboxView
