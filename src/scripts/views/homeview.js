import React from 'react'
import ReactDOM from 'react-dom'
import ACTIONS from '../actions'
import STORE from '../store'



const AutoComplete = React.createClass({

  _handleCards: function(models){
  },
  render: function(){
    return(
    <div className="autoComplete two-thirds column" >
      <ul>
        {this.props.searchResults.map((modl)=>{
          return(
            <li key={modl.cid}>
              <h6>{modl.get('name')}</h6>
              <img className="acIMG" src={modl.get('editions')[0].image_url} />
            </li>
          )
        })}
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

export default HomeView
