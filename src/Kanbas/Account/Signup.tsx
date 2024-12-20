import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2" placeholder="username" />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
                className="wd-password form-control mb-2" placeholder="password" />
            <select onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="form-control mb-2" >
                {/* <option value="ADMIN">Admin</option> */}
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
            </select>
            <button onClick={signup} className="btn btn-primary w-100"> Sign up </button>
            <Link to="/Kanbas/Account/Signin" >Sign in</Link>
        </div>
    );
}