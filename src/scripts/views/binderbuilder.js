import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'
import  toastr  from 'toastr'

/*
cardOwner: {type: String, required: true},
cardName: {type: String, required: true},
cardValue: {type: Number, default: 0},
cardID: {type: String, required: true}
*/
const AutoComplete = React.createClass({

  _handleCards: function(modl){
    if(!User.getCurrentUser()){
      toastr.error('please log in to add cards to your binder')
    } else {
      ACTIONS.saveCard({
        cardImage: modl.get('editions')[0].image_url,
        cardOwner: User.getCurrentUser().name,
        email: User.getCurrentUser().email,
        cardName: modl.get('name'),
        cardID: modl.get('id'),
        cardLocation: User.getCurrentUser().location
      })
    }
  },
  render: function(){
    return(
    <div className="grid-container" >
        {this.props.searchResults.map((modl)=>{
          return(
            <div  id={modl.get('name')}
            className="sm-6-x-12 md-4-x-12 lg-4-x-12" key={modl.cid}>
            <figure  id={modl.get('cardID')} className="tn-card">
                <div className="card-image" style={{padding: "1rem"}}>
                  <img src={modl.get('editions')[0].image_url} />
                </div>
                <figcaption>
                <h4 className="anything" >
                {modl.get('name')}</h4>
                <input className="btn  primary"
                type="submit" value="+"
                onClick={()=>this._handleCards(modl)}/>
                </figcaption>
            </figure>
            </div>
          )
        })}
    </div>
    )
  }
})
/*
<div className="row">

  <h6 className="one-third column cardName" >
  {modl.get('name')}</h6>
  <img className="two-thirds column acIMG"
  src={modl.get('editions')[0].image_url} />
  <input className="button-primary row"
  type="submit" value="+"
  onClick={()=>this._handleCards(modl)}/>
</div>
*/
const SearchView = React.createClass({
  componentWillMount() {
    let func = function(evt){
      ACTIONS.searchForCards(evt.target.value)
      // ACTIONS.searchForCards(evt.currentTarget.cardSearch.value)
    }
    this._debouncedSearch = _.debounce(func,500)
    STORE.on('updateContent', ()=>{
      this.setState(STORE.getData())
    })
  },
  componentWillUnmount: function() {
		STORE.off('updateContent')
	},

  _handleSearch: function(evt) {
    evt.persist()
    this._debouncedSearch(evt)
  },
  getInitialState() {
    return STORE.getData()
  },

  render() {
    console.log('rendering')
    console.log(this.state.cardColl.models.length)
    return (
      <div className="row" >
      <h2>Search & Add Cards to your binder!</h2>
        <form className="form-group grid-container">
        <div className="form-field sm-12-x-12 md-12-x-12 lg-6-x-12">
        <input onKeyDown={this._handleSearch}
        name="cardSearch" className="two-thirds column" type="text" />
        </div>
        </form>
        <AutoComplete searchResults={this.state.cardColl} />
      </div>
    );
  }

});

const BinderBuilderView = React.createClass({
  render: function(){
    return(
      <div className="row">
      <Header />
      <SearchView />
      </div>
    )
  }
})

export default BinderBuilderView





/*
/////////////////////////////////////////////////
OLD CODE DISREGARD PLS
/////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'


const AutoComplete = React.createClass({

  _handleCards: function(modl){
    console.log(`ya clicked ${modl.get('name')}`)
    console.log('current user ', User.getCurrentUser())
    console.log(`this is the ID of the card ${modl.get('id')}`);
    if(!User.getCurrentUser()){
      alert('please log in to add cards to your binder')
    }
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
                <img className="two-thirds column acIMG"
                src={modl.get('editions')[0].image_url} />
                </div>
                <input className="button-primary row"
                type="submit" value="+"
                onClick={()=>this._handleCards(modl)}/>
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
    ACTIONS.searchForCards(evt.currentTarget.cardSearch.value)
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
        <AutoComplete searchResults={this.state.cardColl} />
      </div>
    );
  }

});

const HomeView = React.createClass({
  render: function(){
    return(
      <div className="homeContainer">
      <Header />
      <SearchView />
      </div>
    )
  }
})

export default HomeView
*/
