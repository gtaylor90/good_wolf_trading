import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'

/*

*/
const AutoComplete = React.createClass({

  _handleOffer: function(modl){
    console.log("offered")

  },
  render: function(){
    return(
    <div className="autoComplete two-thirds column" >
      <ul>
        {this.props.searchResults.map((modl)=>{
          return(
            <div  id={modl.get('name')} className="acList" key={modl.cid}>
              <div className="row">
                <div className="row">
                <h6 className="one-third column cardName" >
                {modl.get('name')}</h6>
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
    STORE.on('fonz', ()=>{
      this.setState(STORE.getData())
    })
  },
  getInitialState() {
    return STORE.getData()
  },
  _handleSearch: function(evt){
    evt.preventDefault()

  },
  render() {
    console.log('rendering')
    console.log(this.state.cardColl.models.length)
    return (
      <div className="row" >
        <form onSubmit={this._handleSearch} >
        <input name="cardSearch" className="two-thirds column" type="text" />
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
