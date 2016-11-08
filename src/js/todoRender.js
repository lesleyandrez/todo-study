import Todo from './todo'

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class todoRender extends Todo {
  constructor ({
    elementBase,
    itens = [],
    startWithFocus = true
  } = {}) {
    super(itens);
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
      if(event.keyCode == ENTER_KEY){
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
      super.addItem(item);
      this.$list.insertAdjacentHTML('afterbegin', this.renderItem(item));
      this.$input.value = '';
      this.$input.focus();
    } catch (e) {
      console.error(e.message);
    }
  }
  removeItem (id) {
    try {
      super.removeItem(id);
      this.$list.querySelector(`[data-id="${id}"]`).remove();
    } catch (e) {
      console.error(e.message);
    }
  }
  renderItem (item) {
    return `<li data-id="${item.id}"> <div> <div> <input type="checkbox" /> </div> <div class="name-item"> ${item.name} </div> <button type="button" class="remove-item">x</button> </div> </li>`;
  }
  renderAllItens () {
    this.$list.innerHTML = this.itens.map(this.renderItem).join('');
  }
}
