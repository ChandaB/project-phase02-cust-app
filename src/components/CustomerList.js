import React, { useEffect, useState } from 'react';
import './CustomerList.css';

function log(message) { console.log(message); }

export function CustomerList(props) {

    const [formObject, setFormObject] = useState(props.blankCustomer);

    const handleListClick = function (item) {
        log("in handleListClick()");
        if (props.formObject.id === item.id) {
            // If the clicked item is already selected, deselect it
            setFormObject(props.blankCustomer);
        } else {
            setFormObject(item);
        }
    }

    let onCancelClick = function () {
        log("in onCancelClick()");
        setFormObject(props.blankCustomer);
    }

    return (
        <table id="customer-list">
            <tbody>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Pass</th>
                    </tr>
                </thead>
                {props.customers.map(
                    (item, index) => {
                        return (<tr key={item.id}
                            className={(item.id === formObject.id) ? 'selected' : 'not-selected'}
                            onClick={() => handleListClick(item)}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                        </tr>);
                    }
                )}
            </tbody>
        </table>

    )

}

