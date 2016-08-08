import React from 'react'
import  toastr  from 'toastr'
import ACTIONS from '../actions'

const ModalWindow = React.createClass({
  _closeModal: function(){
    toastr.success('hell yah get it')
    ACTIONS.toggleModal(false)
  },
  render: function(){
    console.log("the state of the modal window", this.props.isVis);
    return(
      <div
      className={this.props.isVis ? "modalContainer showing":"modalContainer"}>
        <div className="contents-centered">
        <div className="modalWindow">
          <h2>Message For User</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p>
          <button className="btn" onClick={this._closeModal}>close</button>
        </div>

        </div>
      </div>
    )
  }
})

export default ModalWindow
