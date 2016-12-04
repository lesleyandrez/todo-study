import TodoListBusiness from '../model/todoListBusiness'
import KEYS from '../common/keys'
import { getName } from '../model/categoryTodoListBusiness'
import templateTodoListItem from '../view/todoListItem.html'
import Slip from '../libs/slip'

function setCaretFinalString(elementEditable) {
    let el = elementEditable;
    let lengthInputElement = el.innerText.length;
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el.childNodes[0], lengthInputElement);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}


export default class todoListPresenter {

  /**
   * Recebe um objeto de configuração com as seguintes propriedades:
   * elementBase = elemento HTML que contenha um input com o name = item-lista e uma ul com class .itens
   */
  constructor ({
    elementBase,
    idTodoList,
    startWithFocus = false
  } = {}) {

    // atribui uma instancia de TodoList para a variável privada todo
    this.todoListBusiness = new TodoListBusiness(idTodoList);

    // associa os elementos HTML com as propriedades $element, #list e $input
    this.bindElements(elementBase);

    elementBase.querySelector('h2').innerText = getName(idTodoList);

    // se existem itens já gravados, monta o todoList com estes itens
    if (this.todoListBusiness.getAll().length > 0) { this.renderAllItens(); }

    // trás o foco para o $input se o paramentro startWithFocus = true
    this.startWithFocus(startWithFocus);

    // Associa eventos de click, keyUp, ...
    this.addEventListeners();

    // Adiciona comportamente de reordenação, com mouse e touch, com a lib Slip
    new Slip(this.$list);
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
      if(event.target.classList.contains('remove-item') || event.target.parentNode.classList.contains('remove-item')){
        this.removeItem(event.target.closest('[data-id]').dataset.id);
      }
    });

    this.$list.addEventListener('dblclick', event => {
      if(event.target.classList.contains('name-item')){
        let inputElement = event.target;
        inputElement.setAttribute('contenteditable', 'true');
        inputElement.focus();
        setCaretFinalString(inputElement);

        inputElement.addEventListener('blur', function once(event) {
          console.log(event.target.closest('[data-id]').dataset.id);
          console.log(event.target.innerText);
          let id = event.target.closest('[data-id]').dataset.id;
          let name = event.target.innerText;
          this.updateNameItem({ id, name });
          event.target.removeAttribute('contenteditable');
          inputElement.removeEventListener('blur', once);
        }.bind(this));
      }
    });

    this.$list.addEventListener('change', event => {
      if(event.target.classList.contains('checkbox-item')){
        if(!event.target.checked){
          this.unCheckItem(event.target.closest('[data-id]').dataset.id);
        } else {
          this.checkItem(event.target.closest('[data-id]').dataset.id);
        }
      }
    });

    this.$list.addEventListener('slip:reorder', event => {
      this.reorderTodoList(event.target, event.detail.insertBefore, event.detail.originalIndex, event.detail.spliceIndex);
    }, false);
  }

  reorderTodoList (elementMoved, insertBeforeElement, originalIndex, spliceIndex) {
    let todoList = this.todoListBusiness.getAll();
    let itemToReorder = todoList[originalIndex];
    let newTodoList = todoList.filter(item => itemToReorder.id != item.id);
    newTodoList.splice(spliceIndex, 0, itemToReorder);
    this.todoListBusiness.updateOrder(newTodoList);
    elementMoved.parentNode.insertBefore(elementMoved, insertBeforeElement);
  }

  addItem (item) {
    try {
      this.todoListBusiness.addItem(item);
      this.$list.insertAdjacentHTML('afterbegin', this.renderItem(item));
      this.$input.value = '';
      this.$input.focus();
    } catch (e) {
      console.error(e.message);
    }
  }

  updateNameItem (item) {
    try {
      this.todoListBusiness.updateNameItem(item);
    } catch (e) {
      console.error(e.message);
    }
  }

  checkItem (id) {
    try {
      this.todoListBusiness.checkItem(id);
      this.$list.querySelector(`[data-id="${id}"] .checkbox-item`).checked = true;
    } catch (e) {
      console.error(e.message);
    }
  }

  unCheckItem (id) {
    try {
      this.todoListBusiness.unCheckItem(id);
      this.$list.querySelector(`[data-id="${id}"] .checkbox-item`).checked = false;
    } catch (e) {
      console.error(e.message);
    }
  }

  removeItem (id) {
    try {
      this.todoListBusiness.removeItem(id);
      this.$list.querySelector(`[data-id="${id}"]`).remove();
    } catch (e) {
      console.error(e.message);
    }
  }

  renderItem (item) {
    if(item.checked){
      item.checked = 'checked';
    }
    return templateTodoListItem(item);
  }

  renderAllItens () {
    this.$list.innerHTML = this.todoListBusiness.getAll().map(this.renderItem).join('');
  }

}
