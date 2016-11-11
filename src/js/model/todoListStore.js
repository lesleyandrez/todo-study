export default class TodoListStore {

  constructor (idStore) {
    this.idStore = idStore;
    if(localStorage.getItem(this.idStore) == null){
      localStorage.setItem(this.idStore, '[]');
    }
  }

  getStore () {
    return JSON.parse(localStorage.getItem(this.idStore));
  }

  updateStore (itens) {
    localStorage.setItem(this.idStore, JSON.stringify(itens));
  }

  clearStore () {
    localStorage.setItem(this.idStore, '');
  }
}
