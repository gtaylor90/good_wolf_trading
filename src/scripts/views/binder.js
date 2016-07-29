import React from 'react'


const BinderView = React.createClass({

  render: function(){
    console.log('some information hopefully', this.props.cardColl)
    return(
      <div className="binder" >
      </div>
    )
  }
})


export default BinderView
