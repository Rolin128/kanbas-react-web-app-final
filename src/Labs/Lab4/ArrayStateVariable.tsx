import React, { useState } from "react";
import "./arraystate.css";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="add-button" onClick={addElement}>Add Element</button>
            <ul className="array-list">
                {array.map((item, index) => (
                    <li key={index} className="list-item">
                        <span>{item}</span>
                        <button onClick={() => deleteElement(index)}
                            className="delete-button"
                            id="wd-delete-element-click">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}