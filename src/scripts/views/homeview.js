import React from 'react'
import ReactDOM from 'react-dom'

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
        </form>
      </div>
    );
  }

});

export default HomeView
