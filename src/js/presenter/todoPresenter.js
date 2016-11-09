import Todo from '../model/todoModel'
import KEYS from '../common/keys'

let todo;

export default class todoRender {

  constructor ({
    elementBase,
    itens = [],
    startWithFocus = false
  } = {}) {

    todo = new Todo(itens);
    this.bindElements(elementBase);
    this.renderAllItens();
    this.startWithFocus(startWithFocus);
    this.addEventListeners();
  }

  bindElements (elementBase) {
    this.$element = elementBase;
    this.$list = elementBase.querySelector('ul.itens');
    this.$input = elementBase.querySelector('[name="item-lista"]');
  }

  startWithFocus (startWithFocus) {
    if(startWithFocus){
      this.$input.focus();
    }
  }

  addEventListeners () {
    this.$input.addEventListener('keyup', event => {
      const input = event.target;
      if(event.keyCode == KEYS.ENTER){
        let name = input.value;
        this.addItem({name});
      }
    });
    this.$list.addEventListener('click', event => {
      if(event.target.classList.contains('remove-item')){
        this.removeItem(event.target.closest('[data-id]').dataset.id);
      }
    });
  }

  addItem (item) {
    try {
      todo.addItem(item);
      this.$list.insertAdjacentHTML('afterbegin', this.renderItem(item));
      this.$input.value = '';
      this.$input.focus();
    } catch (e) {
      console.error(e.message);
    }
  }

  removeItem (id) {
    try {
      todo.removeItem(id);
      this.$list.querySelector(`[data-id="${id}"]`).remove();
    } catch (e) {
      console.error(e.message);
    }
  }

  renderItem (item) {
    return `<li data-id="${item.id}"> <div> <div> <input type="checkbox" /> </div> <div class="name-item"> ${item.name} </div> <button type="button" class="remove-item">x</button> </div> </li>`;
  }

  renderAllItens () {
    this.$list.innerHTML = todo.getAll().map(this.renderItem).join('');
  }

}
