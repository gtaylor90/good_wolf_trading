import { User, CardList } from './models/models'

const ACTIONS = {
  searchForCards: function(q){
    console.log(q);
    let cardColl = new CardList
    cardColl.fetch({
      data: {
        q: q
      }
    }).then((res)=> console.log(res))
  }
}

export default ACTIONS
