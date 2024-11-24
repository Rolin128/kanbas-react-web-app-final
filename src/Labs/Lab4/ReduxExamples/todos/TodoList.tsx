import React, { useState } from "react";
import "./todos.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);

    return (
        <div className="todo-container">
            <hr />
            <h2>Todo List</h2>
            <ul className="todo-list-group">
                <TodoForm />
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
        </div>
    );
}
