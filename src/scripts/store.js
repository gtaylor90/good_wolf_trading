import Backbone from 'backbone'
import _ from 'underscore'
import { CardList } from './models/models'
import { Binder } from './models/models'


const STORE = _.extend(Backbone.Events, {
  emitChange: function(){
    this.trigger('fonz')
  },
  getData: function(){
    return this.data
  },
  data:{
    cardColl: new CardList,
    binder: new Binder
  }

})


// const BINDER_STORE = _.extend(Backbone.Events, {
//   data: {
//     collection: new Binder()
//   },
//   emitChange: function(){
//     this.trigger('bonz')
//   },
//   getData: function(){
//     return _.clone(this.data)
//   },
//   initialize: function(){
//     this.data.collection.on('sync update', this._emitChange.bind(this))
//   }
// })


export default STORE
