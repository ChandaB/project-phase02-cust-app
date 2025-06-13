const baseURL = "http://localhost:4000/customers";

function log(message) { console.log(message); }

export function getAll() {
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
  let url = `${baseURL}/${id}`;
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
  return fetch(url, myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}

export function deleteById(id) {
  let url = `${baseURL}/${id}`;
  log("Deleting with URL: " + url + " and id type: " + typeof id);
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  var myInit = { method: 'DELETE', headers: myHeaders, mode: 'cors' };

  return fetch(url, myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

}

export function post(item) {
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  delete item.id; // Remove id from item to let the server assign it
  var myInit = { method: 'POST', body: JSON.stringify(item), headers: myHeaders, mode: 'cors' };

  log("Item passed into POST request: " + JSON.stringify(item));
  return fetch(baseURL, myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}

export function put(id, item) {
  let url = `${baseURL}/${id}`;
  log("PUT with URL: " + url + " and id type: " + typeof id);
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  var myInit = { method: 'PUT', body: JSON.stringify(item), headers: myHeaders, mode: 'cors' };
  log("ID passed into PUT request: " + id);

  return fetch(url, myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}