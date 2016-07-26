import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'

const AutoComplete = React.createClass({

  render: function(){
    return (
    <div className="autoComplete two-thirds column" >
      <p>{this.props.cardsColl}</p>
    </div>
    )
  }
})

const HomeView = React.createClass({
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
        <AutoComplete cardsColl="test" />
        </form>
      </div>
    );
  }

});

export default HomeView
