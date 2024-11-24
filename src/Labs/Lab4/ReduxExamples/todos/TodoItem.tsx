import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo}: {
    todo: { id: string; title: string };
    }) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="todo-list-group-item">
            {todo.title}
            <li className="todo-groups-item">
            <button className="todo-button" onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">Edit</button>
                <button className="todo-button" onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click">Delete</button>
            </li>
        </li>
    );
}
