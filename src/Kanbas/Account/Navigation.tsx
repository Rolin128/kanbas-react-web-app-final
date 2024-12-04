import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
export default function SignNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    return (
        <div id="wd-sign-in-navigation" className="wd list-group fs-5 rounded-0 " >
            <NavLink
                to="/Kanbas/Account/Signin"
                id="wd-sign-in-link"
                className={({ isActive }) =>
                    `list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`
                }
            >
                Signin
            </NavLink>
            {currentUser && currentUser.role === "ADMIN" && (
                <NavLink to="/Kanbas/Account/Users"
                    className={({ isActive }) =>
                        `list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`
                    }
                >
                    Users
                </NavLink>)}

            <NavLink
                to="/Kanbas/Account/Signup"
                id="wd-sign-up-link"
                className={({ isActive }) =>
                    `list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`
                }
            >
                Signup
            </NavLink>

            <NavLink
                to="/Kanbas/Account/Profile"
                id="wd-profile-link"
                className={({ isActive }) =>
                    `list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`
                }
            >
                Profile
            </NavLink>
        </div>
    );
}