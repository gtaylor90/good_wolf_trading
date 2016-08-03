import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'

/*

*/
const AutoComplete = React.createClass({
  componentWillMount: function(){
    if(!User.getCurrentUser()){
      location.hash="login"
    }
    else {
      ACTIONS.fetchLocals({
        cardLocation: User.getCurrentUser().location
      })
      STORE.on('updateContent', ()=>{
        this.setState(STORE.getData())
      })
    }
  },
  _handleOffer: function(modl){
    console.log("offered")

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
                <input className="button-primary row"
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
  componentWillMount() {
    STORE.on('updateContent', ()=>{
      this.setState(STORE.getData())
    })
  },
  getInitialState() {
    return STORE.getData()
  },
  _handleSearch: function(evt){
    evt.preventDefault()
    ACTIONS.searchForLocalCards({
      cardLocation: evt.currentTarget.location.value,
      // cardName: JSON.stringify(
  // { $regex : "^" + evt.currentTarget.cardSearch.value })
      cardName: "^" + evt.currentTarget.cardSearch.value
    })

  },
  render() {
    console.log('rendering')
    console.log(this.state.locals.models.length)
    return (
      <div className="row" >
        <form onSubmit={this._handleSearch} >
        <input name="cardSearch" className="two-thirds column" type="text" />
        <select name="location">
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
  render: function(){
    return(
      <div className="row">
      <Header />
      <h2>Search Available Cards</h2>
      <SearchView />
      </div>
    )
  }
})

export default CardSearchView
