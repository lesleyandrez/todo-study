export default class TodoListStore {

  constructor (idTodoList) {
    this.idTodoList = idTodoList;
    if(localStorage.getItem(this.idTodoList) == null){
      localStorage.setItem(this.idTodoList, '[]');
    }
  }

  getStore () {
    return JSON.parse(localStorage.getItem(this.idTodoList));
  }

  updateStore (itens) {
    localStorage.setItem(this.idTodoList, JSON.stringify(itens));
  }

  clearStore () {
    localStorage.setItem(this.idTodoList, '');
  }
}
