import gererateId from '../common/generateId'
import TodoListStore from './todoListStore'

const prefix = 'todo-study';
const divisor = 'b-wr-bw-uyvg';

function getTimestamp (uniqueId) {
  let split = uniqueId.split(divisor);
  if(split.length >= 4){
    return +split[3];
  }
  return 0;
}

export function hasCategory () {
  let _list = [];
  for (let key in localStorage){
    if(key.startsWith(prefix)){
      let _tempObj = {};
      _tempObj.key = key;
      _tempObj.name = key.split(divisor)[1];
      _list.push(_tempObj);
    }
  }
  return _list;
}

export function create (name) {
  let _uniqueId = `${prefix}-${divisor}${name}${divisor}-${gererateId()}-${divisor}${Date.now()}`;
  let _store = new TodoListStore(_uniqueId);
  return _uniqueId;
}

export function getName (uniqueId) {
  return uniqueId.split(divisor)[1];
}

export function getAllName () {
  let _list = [];
  for (let key in localStorage){
    if(key.startsWith(prefix)){
      let _tempObj = {};
      _tempObj.key = key;
      _tempObj.name = key.split(divisor)[1];
      _tempObj.timestamp = getTimestamp(key);
      _list.push(_tempObj);
    }
  }

  return _list.sort((a,b) => {
    return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
  });
}
