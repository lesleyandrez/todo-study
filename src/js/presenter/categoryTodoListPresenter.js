import * as categoryTodoListBusiness from '../model/categoryTodoListBusiness'

function renderItemCategory (key, name) {
  return `<li><a href="/todo/${key}">${name}</a></li>`;
}

let $wrapCategories = document.getElementById('categorias');
let $list = $wrapCategories.querySelector('.itens');

export function listeners ({$form, $list} = {}) {
  $form.addEventListener('submit', (event)=>{
    create($form.querySelector('[name="name-list"]').value);
    $form.querySelector('[name="name-list"]').value = '';
    event.preventDefault();
  });
}

export function create (name) {
  let _key = categoryTodoListBusiness.create(name);
  $list.insertAdjacentHTML('beforeend', renderItemCategory(_key, name));
}

export function renderListCategories () {
  let _listStorage = categoryTodoListBusiness.getAllName();

  $list.innerHTML = _listStorage.map(itemStorage => {
    return renderItemCategory(itemStorage.key, itemStorage.name);
  }).join('');

}
