const baseURL = "http://localhost:4000/customers";
const items = [];

function log(message) { console.log(message); }

export function getAllCustomers(setCustomers) {
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
  return fetch(baseURL, myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}

export function get(id) {
  let result = null;
  for (let item of items) {
    if (item.id === id) {
      result = item;
    }
  }
  return result;
}

export function deleteById(id) {
  let arrayIndex = getArrayIndexForId(id);
  if (arrayIndex >= 0 && arrayIndex < items.length) {
    items.splice(arrayIndex, 1);
  }
}

export function post(item) {
  let nextid = getNextId();
  item.id = nextid;
  items[items.length] = item;
}

export function put(id, item) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i] = item;
      return;
    }
  }
}

function getArrayIndexForId(id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }
  return -1;
}


function getNextId() {
  let maxid = 0;
  for (let item of items) {
    maxid = (item.id > maxid) ? item.id : maxid;
  }
  return maxid + 1;
}


