import TodoListException from './todoListException'
import TodoListStore from './todoListStore'
import gererateId from '../common/generateId'

export default class TodoListBusiness {

  constructor (idTodoList) {
    this.todoListStore = new TodoListStore(idTodoList);
    this.itens = this.todoListStore.getStore();
  }

  addItem (item) {
    if (item.name == '') {
      throw new TodoListException("O item nao pode ser vazio!");
    }
    item.id = gererateId();
    item.checked = false;
    item.favorite = false;
    this.itens.unshift(item);
    this.todoListStore.updateStore(this.getAll());
  }

  updateOrder (itens) {
    this.todoListStore.updateStore(itens);
  }

  removeItem (id) {
    this.itens = this.itens.filter( currentItem => { return currentItem.id != id; });
    this.todoListStore.updateStore(this.getAll());
  }

  updateNameItem (item) {
    let index = this.itens.findIndex( currentItem => {
      return currentItem.id == item.id;
    });
    this.itens[index].name = item.name;
    this.todoListStore.updateStore(this.getAll());
  }

  checkItem (id) {
    let index = this.itens.findIndex( currentItem => {
      return currentItem.id == id;
    });
    this.itens[index].checked = true;
    this.todoListStore.updateStore(this.getAll());
  }

  unCheckItem (id) {
    let index = this.itens.findIndex( currentItem => {
      return currentItem.id == id;
    });
    this.itens[index].checked = false;
    this.todoListStore.updateStore(this.getAll());
  }

  getCheckeds () {
    return this.itens.filter( currentItem => { return currentItem.checked; });
  }

  getUnCheckeds () {
    return this.itens.filter( currentItem => { return !currentItem.checked; });
  }

  getAll () {
    return this.itens;
  }

}
