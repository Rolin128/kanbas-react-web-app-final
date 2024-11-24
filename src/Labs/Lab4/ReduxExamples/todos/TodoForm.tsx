import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="todo-list-group-item">
            <input
                value={todo.title}
                onChange={(e) =>
                    dispatch(setTodo({ ...todo, title: e.target.value }))
                }
            />
            <li className="todo-groups-item">
                <button className="todo-button" onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click">Update</button>
                <button className="todo-button" onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">Add</button>
            </li>
        </li>
    );
}