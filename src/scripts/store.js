import Backbone from 'backbone'
import _ from 'underscore'
import { CardList } from './models/models'
import { Binder } from './models/models'


const STORE = _.extend(Backbone.Events, {
  emitChange: function(){
    this.trigger('updateContent')
  },
  getData: function(){
    return this.data
  },
  initialize: function(){
       this.data.cardColl.on('sync update', this.emitChange.bind(this))
  },
  data:{
    cardColl: new CardList,
    binder: new Binder
  }

})
STORE.initialize()

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
//
// })


export default STORE
