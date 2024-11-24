import React, { useState } from "react";
import './lab5.css';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary fix-lab-module-size-button" href={API}>
                Get Todos </a><hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <div className="d-flex">
                <input id="wd-todo-id" defaultValue={todo.id} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
                <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
                    Get Todo by ID
                </a>
            </div>
            <hr />
            <h3>Filtering Array Items</h3>
            <a className="btn btn-primary fix-lab-module-size-button"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />
            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-primary fix-lab-module-size-button"
                href={`${API}/create`}>
                Create Todo
            </a><hr />
            <h3>Deleting from an Array</h3>
            <div className="d-flex">
                <input defaultValue={todo.id} className="form-control me-3" style={{ width: '200px' }} onChange={(e) => setTodo({
                    ...todo, id: e.target.value
                })} />
                <a className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
                    Delete Todo with ID = {todo.id} </a>
            </div>
            <hr />
            <h3>Updating an Item in an Array</h3>
            <div className="d-flex" style={{ marginBottom: '8px' }}>
                <input defaultValue={todo.id} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
                <input defaultValue={todo.title} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
                    Update Todo</a>
            </div>
            <div className="d-flex" style={{ marginBottom: '8px' }}>
                <input defaultValue={todo.id} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
                <input className="form-check-input me-3 " type="checkbox" style={{ marginBottom: '5px' }}
                    checked={todo.completed} onChange={(e) =>
                        setTodo({ ...todo, completed: e.target.checked })} />
                <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end">
                    Complete Todo</a>
            </div>
            <div className="d-flex" style={{ marginBottom: '8px' }}>
                <input defaultValue={todo.id} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
                <input defaultValue={todo.description} className="form-control me-3" style={{ width: '200px' }}
                    onChange={(e) =>
                        setTodo({ ...todo, description: e.target.value })} />
                <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">
                    Description Todo</a>
            </div>
        </div>

    );
}