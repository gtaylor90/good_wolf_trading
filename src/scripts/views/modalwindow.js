import React from 'react'
import  toastr  from 'toastr'
import ACTIONS from '../actions'

/*
messageFor: {type: String, required: true},
messageFrom: {type: String, required: true},
messageSubj: {type: String},
messageCont: {type: String, required: true},
cardLink: {type: String}
*/

const ModalWindow = React.createClass({
  _sendMessage: function(event){
    console.log(
      "messageFor:",  this.props.dataForModal.payload.get('cardOwner'),
      "messageFrom:",  User.getCurrentUser(),
      "messageSubj:", event.currentTarget.subject.value,
      "messageCont:", event.currentTarget.cont.value,
      "cardLink:", this.props.dataForModal.payload.get('cardName')
    )
    ACTIONS.sendMessage({
      messageFor: this.props.dataForModal.payload.get('cardOwner'),
      messageFrom: User.getCurrentUser(),
      messageSubj: event.currentTarget.subject.value,
      messageCont: event.currentTarget.cont.value,
      cardLink: this.props.dataForModal.payload.get('cardName')
    }).then(this._closeModal)
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
    console.log("the payload", this.props.dataForModal.payload);
    console.log("the state of the modal window",
    this.props.dataForModal.modalIsShowing);

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
          <button className="btn" onClick={this._closeModal}>X</button>
          <h2>Message For User</h2>
          <form className="form-group grid-container" onSubmit={this.sendMessage}>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Owner</label>
              <h3>{this.props.dataForModal.payload.get('cardOwner')}</h3>
            </div>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Subj.</label>
              <input name="subject" type="text"></input>
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

export default ModalWindow
