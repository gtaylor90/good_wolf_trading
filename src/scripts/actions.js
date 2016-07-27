import { User, CardList } from './models/models'
import STORE from './store'

const ACTIONS = {
  searchForCards: function(q){
    console.log(q);
    console.log("STORE.data.cardColl from ACTIONS.searchForCards",
    STORE.data.cardColl);
    STORE.data.cardColl.fetch({
      data: {
        q: q
      }
    }).then(function() {
      STORE.emitChange()
    })
  }
}

export default ACTIONS
