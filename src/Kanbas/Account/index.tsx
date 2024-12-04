import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signup from "./Signup";
import Signin from "./Signin";
import Users from "./Users";
import { useSelector } from "react-redux";
export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen" className="d-flex gap-4">
            <div className="d-none d-md-block">
                <AccountNavigation />
            </div>
            <div className="row">
                <Routes>
                    <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Users/:uid" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}