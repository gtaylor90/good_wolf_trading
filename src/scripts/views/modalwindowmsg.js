import React from 'react'
import  toastr  from 'toastr'
import ACTIONS from '../actions'
import { User } from '../models/models'

/*
messageFor: {type: String, required: true},
messageFrom: {type: String, required: true},
messageSubj: {type: String},
messageCont: {type: String, required: true},
cardLink: {type: String}
*/

const ModalWindow_msg = React.createClass({
  _sendMessage: function(event){
    // console.log("event", this.props.dataForModal)
    event.preventDefault()
    let mod = this.props.dataForModal.payload
    console.log("hopefully the model", mod);
    ACTIONS.sendMessage({
      messageFor: this.props.dataForModal.payload.get('messageFrom'),
      forEmail: this.props.dataForModal.payload.get('senderEmail'),
      messageFrom: User.getCurrentUser().name,
      senderEmail: User.getCurrentUser().email,
      messageSubj: "Re:" + this.props.dataForModal.payload.get('messageSubj'),
      messageCont: event.currentTarget.cont.value,
      cardLink: this.props.dataForModal.payload.get('cardLink')
    })

  },
  _closeModal: function(){
    toastr.success('hell yah get it')
    ACTIONS.toggleModal({
      modalIsShowing: false,
      payload: {},
      modalType: "default"
    })
  },
  render: function(){
    // console.log("the payload", this.props.dataForModal.payload);
    // console.log("the state of the modal window",
    // this.props.dataForModal.modalIsShowing);

    if(this.props.dataForModal.modalType === "default"){
      return(
        <div className={this.props.dataForModal.modalIsShowing ? "modalContainer showing":"modalContainer"}>
        </div>
      )
    } else {
    return(
      <div
      className={this.props.dataForModal.modalIsShowing ? "modalContainer showing":"modalContainer"}>
        <div className="contents-centered">
        <div className="modalWindow">
          <button className="modal-exit" onClick={this._closeModal}>X</button>
          {/* <label>Card Request</label> */}
          <form className="form-group grid-container" onSubmit={this._sendMessage}>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Owner</label>
              <h6>{this.props.dataForModal.payload.get('messageFrom')}</h6>
              <h6>{this.props.dataForModal.payload.get('senderEmail')}</h6>
            </div>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Subj.</label>
              <h6>Re: {this.props.dataForModal.payload.get('messageSubj')}</h6>
            </div>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Card</label>
              <h6>{this.props.dataForModal.payload.get('cardLink')}</h6>
            </div>
            <div className="form-field sm-12-x-12 md-12-x-12">
              <label>Message</label>
              <textarea name="cont" rows="6"></textarea>
            </div>
            <input type="submit" className="btn" value="SEND!"></input>
          </form>
        </div>
        </div>
      </div>
    )}
  }
})

export default ModalWindow_msg
