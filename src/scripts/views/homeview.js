import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'



const AutoComplete = React.createClass({
  _handleCards: function(theCollectionModel){
    console.log("handleCards", this.props.searchResults.models);
  },
  render: function(){
    console.log();
    return(
    <div className="autoComplete two-thirds column" >
      <ul>
        {this._handleCards(STORE.data)}
      </ul>
    </div>
    )
  }
})

const HomeView = React.createClass({
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
    return (
      <div className="row" >
        <form onSubmit={this._handleSearch} >
        <input name="cardSearch" className="two-thirds column" type="text" />
        <input className="button-primary"
        type="submit" value="Search!"/>
        </form>
        <AutoComplete searchResults={STORE.data} />
      </div>
    );
  }

});

export default HomeView
