import React, { useEffect, useState } from 'react';
import { getAll, post, put, deleteById } from './rest/restdb.js'
import './App.css';

function log(message) { console.log(message); }

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id !== -1) ? 'Update' : 'Add';

  useEffect(() => {
    log("in useEffect()");
    getCustomers().then((customerArray) => {
      log("in getCustomers() then(): " + JSON.stringify(customerArray));
      setCustomers(customerArray);
    });
  }, []);

  const getCustomers = function () {
    log("in getCustomers()");
    return getAll().then((customerArray) => {
      setCustomers(customerArray);
      return customerArray;
    });
  }

  const handleListClick = function (item) {
    log("in handleListClick()");
    if (formObject.id === item.id) {
      // If the clicked item is already selected, deselect it
      setFormObject({ ...blankCustomer });
    } else {
      log("Selected item: " + JSON.stringify(item));
      setFormObject(item);

    }
  }

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const { name, value } = event.target;
    let newFormObject = { ...formObject }
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    log("in onDeleteClick()");
    if (formObject.id != null && formObject.id !== -1) {
      deleteById(formObject.id);
      getCustomers();
      setFormObject({ ...blankCustomer });
    } else {
      setFormObject({ ...blankCustomer });
    }
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      if (formObject.name === '' || formObject.email === '' || formObject.password === '') {
        alert("Please fill in all fields.");
        return;
      }
      post(formObject).then(() => {
        log("Customer added successfully.");
        getCustomers();
        setFormObject({...blankCustomer});
      });
    }
    if (mode === 'Update') {
      log("Form object before update: " + JSON.stringify(formObject));
      put(formObject.id, formObject).then(() => {
        log("Customer updated successfully.");
        getCustomers();
        setFormObject({ ...blankCustomer });
      })
    }
  }

  return (
    <div>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id}
                  className={(item.id === formObject.id) ? 'selected' : 'not-selected'}
                  onClick={() => handleListClick(item)}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td id="masked-password">{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
      </div>
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form >
          <table id="customer-add-update" >
            <tbody>
              <tr>
                <td className={'label'} >Name:</td>
                <td><input
                  type="text"
                  name="name"
                  onChange={(e) => { handleInputChange(e) }}
                  value={formObject.name}
                  placeholder="Customer Name"
                  required /></td>
              </tr>
              <tr>
                <td className={'label'} >Email:</td>
                <td><input
                  type="email"
                  name="email"
                  onChange={(e) => { handleInputChange(e) }}
                  value={formObject.email}
                  placeholder="name@company.com" /></td>
              </tr>
              <tr>
                <td className={'label'} >Pass:</td>
                <td><input
                  type="password"
                  name="password"
                  onChange={(e) => { handleInputChange(e) }}
                  value={formObject.password}
                  placeholder="password" /></td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={onDeleteClick} />
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );

}
export default App;
