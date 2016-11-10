const store = localStorage;

export default class TodoListStore {

  constructor (idStore) {
    this.idStore = idStore;
    if(store.getItem(this.idStore) == null){
      store.setItem(this.idStore, '[]');
    }
  }

  getStore () {
    return JSON.parse(store.getItem(this.idStore));
  }

  updateStore (itens) {
    store.setItem(this.idStore, JSON.stringify(itens));
  }

  clearStore () {
    store.setItem(this.idStore, '');
  }
}
