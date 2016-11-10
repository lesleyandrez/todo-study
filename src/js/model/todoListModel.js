import TodoException from './todoException'
import TodoListStore from './todoListStore'
import gererateId from '../common/generateId'

let todoListStore;

export default class TodoList {

  constructor (idStore) {
    todoListStore = new TodoListStore(idStore);
    this.itens = todoListStore.getStore();
  }

  addItem (item) {
    if (item.name == '') {
      throw new TodoException("O item nao pode ser vazio!");
    }
    item.id = gererateId();
    item.checked = false;
    item.favorite = false;
    this.itens.unshift(item);
    todoListStore.updateStore(this.getAll());
  }

  removeItem (id) {
    this.itens = this.itens.filter( currentItem => { return currentItem.id != id; });
  }

  updateItem (item) {
    this.itens = this.itens.map( currentItem => {
      if (currentItem.id == item.id){
        return item;
      } else {
        return currentItem;
      }
    });
  }

  checkItem (id) {
    let index = this.itens.findIndex( currentItem => {
      return currentItem.id == id;
    });
    this.itens[index].checked = true;
  }

  unCheckItem (id) {
    let index = this.itens.findIndex( currentItem => {
      return currentItem.id == id;
    });
    this.itens[index].checked = false;
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
