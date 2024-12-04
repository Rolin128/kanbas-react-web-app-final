import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
export default function PeopleDetails() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editingname, seteditingName] = useState(false);
    const [editingemail, seteditingEmail] = useState(false);
    const [editingrole, seteditingRole] = useState(false);
    const navigate = useNavigate();
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName, email, role };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        seteditingName(false);
        seteditingEmail(false);
        seteditingRole(false);
        navigate(-1);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
            <div className="text-danger fs-4 mb-2 wd-name">
                {!editingname && (
                    <FaPencil onClick={() => seteditingName(true)}
                        className="float-end fs-5 mt-2 wd-edit" />)}
                {editingname && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" />)}
                {!editingname && (
                    <div className="wd-name"
                        onClick={() => seteditingName(true)}>{user.firstName} {user.lastName} </div>)}
                {user && editingname && (
                    <input className="form-control w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />)}
            </div>
            <div className="ms-1"><b>Roles:</b>
                {editingrole && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" />)}
                {!editingrole && (
                    <FaPencil onClick={() => seteditingRole(true)}
                        className="float-end fs-5 wd-edit" />)}
                {!editingrole && (
                    <span onClick={() => seteditingRole(true)}
                        className="wd-roles">{user.role}</span>)}
                {user && editingrole && (
                    <select className="form-select w-50 wd-select-role"
                        defaultValue={`${user.role}`}
                        onChange={(e) => setRole(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { saveUser(); } }}>
                        <option value="STUDENT">Students</option>
                        {/* <option value="TA">Assistants</option> */}
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Administrators</option>
                    </select>
                )}</div>


            <div className="ms-1"><b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span></div>
            <div className="ms-1"><b>Email:</b>
                {editingemail && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" />)}
                {!editingemail && (
                    <span onClick={() => seteditingEmail(true)}
                        className="wd-name">{user.email}</span>)}
                {!editingemail && (
                    <FaPencil onClick={() => seteditingEmail(true)}
                        className="float-end fs-5 wd-edit" />)}
                {user && editingemail && (
                    <input className="form-control w-50 wd-edit-name"
                        defaultValue={`${user.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />)}</div>
            <div className="ms-1"><b>Section:</b> <span className="wd-section"> {user.section} </span></div>
            <div className="ms-1"><b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span></div>
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
        </div>
    );
}