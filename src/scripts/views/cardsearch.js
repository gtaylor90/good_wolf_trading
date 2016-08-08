import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import Notifications, {notify} from 'react-notify-toast'
import  toastr  from 'toastr'
import Messenger from './messenger'
import ModalWindow from './modalwindow'
/*

*/
// toastr.options = {
//   "closeButton": false,
//   "debug": false,
//   "newestOnTop": false,
//   "progressBar": false,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "5000",
//   "extendedTimeOut": "1000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }
const AutoComplete = React.createClass({
  // componentWillMount: function(){
  //
  // },
  _handleOffer: function(modl){
    ACTIONS.toggleModal(true)
  },
  render: function(){
    return(
    <div className="autoComplete two-thirds column" >
      <ul>
        {this.props.searchResults.map((modl)=>{
          return(
            <div  id={modl.get('cardName')} className="acList" key={modl.cid}>
              <div className="row">
                <div className="row">
                <h6 className="one-third column cardName" >
                {modl.get('cardName')}</h6>
                </div>
                <input className="btn  primary"
                type="submit" value="+"
                onClick={()=>this._handleOffer(modl)}/>
              </div>
            </div>
          )
        })}
      </ul>
    </div>
    )
  }
})

const SearchView = React.createClass({
  // componentWillUpdate(nextProps, nextState) {
  //   STORE.off('updateContent')
  // },
  componentWillMount() {
    if(!User.getCurrentUser()){
      location.hash="login"
    }
    else {
      ACTIONS.fetchLocals()
      STORE.on('updateContent', ()=>{
        this.setState(STORE.getData())
      })
    }
  },
  componentWillUnmount(){
    STORE.off('updateContent')
  },
  getInitialState() {
    return STORE.getData()
  },
  _handleSearch: function(evt){
    let cl = evt.currentTarget.location.value

    evt.preventDefault()
    ACTIONS.searchForLocalCards({
      cardLocation: cl ? cl : undefined,
      // cardName: JSON.stringify(
  // { $regex : "^" + evt.currentTarget.cardSearch.value })
      cardName: "^" + evt.currentTarget.cardSearch.value
    })

  },
  render() {
    console.log('rendering')
    console.log(this.state.locals)
    return (
      <div className="row" >
        <form onSubmit={this._handleSearch} >
        <input name="cardSearch" className="two-thirds column" type="text" />
        <select name="location">
          <option value="">All</option>
          <option value="spring">Spring</option>
          <option value="tomball">Tomball</option>
          <option value="cypress">Cypress</option>
          <option value="other">Other</option>
          <option value="innerLoop">Inner Loop</option>
        </select>
        <input className="button-primary"
        type="submit" value="Search!"/>
        </form>
        <AutoComplete searchResults={this.state.locals} />
      </div>
    );
  }

});

const CardSearchView = React.createClass({
  getInitialState() {
    return STORE.getData()
  },
  componentWillMount() {
    STORE.on('updateContent', ()=> this.setState( STORE.getData() ) )
  },
  componentWillUnmount(){
    STORE.off('updateContent')
  },
  render: function(){
    return(
      <div className="row">
      <Notifications />
      <Header />
      <h2>Search Available Cards</h2>
      <SearchView />
      <ModalWindow isVis={this.state.modalIsShowing} />
      {/* <Messenger /> */}
      </div>
    )
  }
})

export default CardSearchView
