import React from 'react'
import ReactDOM from 'react-dom'

const AutoComplete = React.createClass({

  render: function(){
    return (
    <div className="autoComplete" >
      <p>{this.props.cardsColl}</p>
    </div>
    )
  }
})

const HomeView = React.createClass({
  _handleSearch: function(){

  },
  render() {
    return (
      <div className="row" onSubmit={this._handleSearch} >
        <form>
        <input className="two-thirds column" type="text" />
        <input className="button-primary"
        type="submit" value="Search!"/>
        <AutoComplete cardsColl="test" />
        </form>
      </div>
    );
  }

});

export default HomeView
