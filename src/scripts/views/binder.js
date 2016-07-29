import React from 'react'
import Header from './navbar'
import STORE from '../store'

const BinderRendering = React.createClass({

  render:function(){
    console.log();
    return(
      <div>
      {this.props.cardColl.map((modl)=>{
        <h6>{modl.get('name')}</h6>
      })}
      </div>
    )

  }
})

const BinderView = React.createClass({
  componentWillMount() {
    STORE.on('fonz', ()=>{
      this.setState(STORE.getData())
    })
  },
  getInitialState() {
    return STORE.getData()
  },
  render: function(){
    console.log('some information hopefully', this.state.binder)
    return(
      <div className="binder" >
      <Header />
      <BinderRendering cardColl={this.state.binder} />
      </div>
    )
  }
})


export default BinderView
