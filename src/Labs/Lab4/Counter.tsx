import React, { useState } from "react";
export default function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);
    const buttonStyle = {
        padding: "10px 20px",
        margin: "5px",
        border: "none",
        borderRadius: "5px",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    };
    return (
        <div id="wd-counter-use-state">
            <h2>Counter: {count}</h2>
            <button
                onClick={() => { setCount(count + 1)}}
                style={{ ...buttonStyle, backgroundColor: "green" }}
                id="wd-counter-up-click">
                Up
            </button>
            <button
                onClick={() => { setCount(count - 1)}}
                style={{ ...buttonStyle, backgroundColor: "red" }}
                id="wd-counter-down-click">
                Down
            </button>
            <hr />
        </div>
    );
}