import { EventEmitter } from "events"
import dispatcher from "./dispatcher"

class ArticleStore extends EventEmitter {
  constructor() {
    super()
    this.data = {
      id: 10,
      title: 'Titre',
      content: 'Contenu'
    }
  }

  getData() {
    return this.data
  }

  handleActions(action) {
    switch(action.type) {
      case 'RECEIVE_ARTICLE': {
        this.data = action.data
        this.emit('change')
        break
      }
    }
  }

}

const articleStore = new ArticleStore
dispatcher.register(articleStore.handleActions.bind(articleStore))

export default articleStore
