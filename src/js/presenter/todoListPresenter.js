import TodoList from '../model/todoListModel'
import KEYS from '../common/keys'

let todoList, $element, $input, $list;

export default class todoListPresenter {

  /**
   * Recebe um objeto de configuração com as seguintes propriedades:
   * elementBase = elemento HTML que contenha um input com o name = item-lista e uma ul com class .itens
   */
  constructor ({
    elementBase,
    itens = [],
    startWithFocus = false
  } = {}) {

    // atribui uma instancia de Todo para a variável privada todo
    todoList = new TodoList(itens);

    // associa os elementos HTML com as propriedades $element, #list e $input
    this.bindElements(elementBase);

    // se foi passada uma lista no constructor, monta o todoList com estes itens
    if (itens.length > 0) { this.renderAllItens(); }

    // trás o foco para o $input se o paramentro startWithFocus = true
    this.startWithFocus(startWithFocus);

    // Associa eventos de click, keyUp, ...
    this.addEventListeners();
  }

  bindElements (elementBase) {
    $element = elementBase;
    $list = elementBase.querySelector('ul.itens');
    $input = elementBase.querySelector('[name="item-lista"]');
  }

  startWithFocus (startWithFocus) {
    if(startWithFocus){
      $input.focus();
    }
  }

  addEventListeners () {
    $input.addEventListener('keyup', event => {
      const input = event.target;
      if(event.keyCode == KEYS.ENTER){
        let name = input.value;
        this.addItem({name});
      }
    });
    $list.addEventListener('click', event => {
      if(event.target.classList.contains('remove-item')){
        this.removeItem(event.target.closest('[data-id]').dataset.id);
      }
    });
  }

  addItem (item) {
    try {
      todoList.addItem(item);
      $list.insertAdjacentHTML('afterbegin', this.renderItem(item));
      $input.value = '';
      $input.focus();
    } catch (e) {
      console.error(e.message);
    }
  }

  removeItem (id) {
    try {
      todoList.removeItem(id);
      $list.querySelector(`[data-id="${id}"]`).remove();
    } catch (e) {
      console.error(e.message);
    }
  }

  renderItem (item) {
    return `<li data-id="${item.id}"> <div> <div> <input type="checkbox" /> </div> <div class="name-item"> ${item.name} </div> <button type="button" class="remove-item">x</button> </div> </li>`;
  }

  renderAllItens () {
    $list.innerHTML = todoList.getAll().map(this.renderItem).join('');
  }

}
