import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './navbar'
import { User } from '../models/models'

/*
cardOwner: {type: String, required: true},
cardName: {type: String, required: true},
cardValue: {type: Number, default: 0},
cardID: {type: String, required: true}
*/
const AutoComplete = React.createClass({

  _handleCards: function(modl){
    if(!User.getCurrentUser()){
      alert('please log in to add cards to your binder')
    } else {
      ACTIONS.saveCard({
        cardImage: modl.get('editions')[0].image_url,
        cardOwner: User.getCurrentUser()._id,
        cardName: modl.get('name'),
        cardID: modl.get('id'),
        cardLocation: User.getCurrentUser().location
      })
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
    STORE.on('updateContent', ()=>{
      this.setState(STORE.getData())
    })
  },
  componentWillUnmount: function() {
		STORE.off('updateContent')
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
      <div className="row">
      <Header />
      <h2>Search & Add Cards to your binder!</h2>
      <SearchView />
      </div>
    )
  }
})

export default HomeView
