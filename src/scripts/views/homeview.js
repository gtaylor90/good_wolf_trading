import React from 'react'
import ReactDOM from 'react-dom'

const HomeView = React.createClass({
  render() {
    return (
      <div className="row">
        <input className="two-thirds column" type="text" />
        <input className="button-primary"
        type="button" value="Search!"/>
      </div>
    );
  }

});

export default HomeView
