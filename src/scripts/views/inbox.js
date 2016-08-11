import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import  toastr  from 'toastr'

var InboxView = React.createClass({

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
				<Header />
				<Inbox coll={this.state.msgColl} />
			</div>
			)
	}
})

var Inbox = React.createClass({
	_makeMsg: function(record) {
		return <Msg key={record.id} record={record} />
	},

	render: function() {
		return (
			<div className="inbox">
				{this.props.coll.map(this._makeMsg)}
			</div>
			)
	}
})

var Msg = React.createClass({
  _reply: function(){
    toastr.success("message sent")
  },
	render: function() {
		return (
			<div className="">
				<figure className="tn-card">
					<figcaption >
						<p>to: {this.props.record.get('messageFor')}</p>
						<p>from: {this.props.record.get('messageFrom')}</p>
						<p>{this.props.record.get('messageSubj')}</p>
						<button onClick={this._reply} >X</button>
     			</figcaption>
				</figure>
			</div>
			)
	}
})


export default InboxView
