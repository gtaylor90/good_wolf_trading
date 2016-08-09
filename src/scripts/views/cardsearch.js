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
messageFor: {type: String, required: true},
messageFrom: {type: String, required: true},
messageSubj: {type: String},
messageCont: {type: String, required: true},
cardLink: {type: String}
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
  _closeOut: function(payload){
    ACTIONS.toggleModal({
      modalIsShowing: true,
      payload: payload,
      modalType: "messageToCardOwner"
    })
  },
  render: function(){
    return(
    <div className="grid-container" >

        {this.props.searchResults.map((modl)=>{
          return(
            <div key={modl.get('cid')} className="sm-12-x-12 md-6-x-12 lg-4-x-12">
            <figure  id={modl.get('cardID')} className="tn-card">
                <div className="card-image" style={{padding: "1rem"}}>
                  <img src={modl.get('cardImage')} />
                </div>
                <figcaption>
                <h4 className="anything" >
                {modl.get('cardName')}</h4>
                <input className="btn  primary"
                type="submit" value="+"
                onClick={()=>this._closeOut(modl)}/>
                </figcaption>
            </figure>
            </div>
          )
        })}
    </div>
    )
  }
})

const SearchView = React.createClass({
  // componentWillUpdate(nextProps, nextState) {
  //   STORE.off('updateContent')
  // },
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
    console.log(this.props.cardColl)
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
        <AutoComplete searchResults={this.props.cardColl} />
      </div>
    );
  }

});

const CardSearchView = React.createClass({
  getInitialState() {
    return STORE.getData()
  },
  componentWillMount() {
    if(!User.getCurrentUser()){
      location.hash="login"
    }
    else {
      ACTIONS.fetchLocals()
      STORE.on('updateContent',
      ()=> this.setState( STORE.getData() ) )
    }
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
      <SearchView cardColl={this.state.locals}/>
      <ModalWindow dataForModal={this.state.dataForModal} />
      {/* <Messenger /> */}
      </div>
    )
  }
})

export default CardSearchView
