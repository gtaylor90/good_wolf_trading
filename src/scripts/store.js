import Backbone from 'backbone'
import _ from 'underscore'
import { CardList } from './models/models'


const STORE = _.extend(Backbone.Events, {
  emitChange: function(){
    this.trigger('fonz')
  },
  getData: function(){
    return this.data
  },
  data:{
    cardColl: new CardList
  }
})

export default STORE
