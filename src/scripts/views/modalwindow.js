import React from 'react'
import  toastr  from 'toastr'
import ACTIONS from '../actions'

const ModalWindow = React.createClass({
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
          <h2>Message For User</h2>
          <button className="btn" onClick={this._closeModal}>X</button>
          <form className="form-group grid-container">
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Owner</label>
              <h3>{this.props.dataForModal.payload.get('cardOwner')}</h3>
            </div>
            <div className="form-field sm-12-x-12 md-4-x-12">
              <label>Last</label>
              <input type="text"></input>
            </div>
            <div className="form-field sm-12-x-12 md-12-x-12">
              <label>Message</label>
              <textarea rows="6"></textarea>
            </div>
          </form>
        </div>

        </div>
      </div>
    )}
  }
})

export default ModalWindow
