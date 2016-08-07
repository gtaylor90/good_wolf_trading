import Backbone from 'backbone'
import _ from 'underscore'
import { CardList } from './models/models'
import { Binder } from './models/models'
import Notifications, {notify} from 'react-notify-toast';


const STORE = _.extend(Backbone.Events, {
  removeModel: function(modl){
    console.log('model', modl.props.cardColl);
    console.log('binder', this.data.binder);
    console.log('locals', this.data.locals);
  },
  emitChange: function(){
    this.trigger('updateContent')
  },
  getData: function(){
    return _.clone(this.data)
  },
  initialize: function(){
       this.data.cardColl.on('sync update', this.emitChange.bind(this))
       this.data.binder.on('sync update', this.emitChange.bind(this))
       this.data.locals.on('sync update', this.emitChange.bind(this))
  },

  set: function(key,val) {
    this.data[key] = val
    this.emitChange()
  },
  data:{
    cardColl: new CardList,
    binder: new Binder,
    locals: new Binder
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
