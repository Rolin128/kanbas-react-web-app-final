import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./QizGreenCheckmark";
import { RiArrowDropDownFill } from "react-icons/ri";
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as db from "../../Database";
import { setQuizzes, addQuiz } from "./reducer";
import * as coursesClient from "../client";


import './SearchBar.css';
import './Elips.css';
import { VscRocket } from "react-icons/vsc";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
export default function Quizzes() {
    const router = useNavigate();
    const { cid } = useParams();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(
            cid as string
        );
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);
    const createQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = await coursesClient.createQuizForCourse(cid as string);
        dispatch(addQuiz(newQuiz));
    };
    const handleCreate = () => {
        createQuizForCourse();
    }
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const handleEditQuiz = (quizId: string) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
        setActiveMenu(null); // Close the menu
    };

    return (
        <div id="wd-quizzes">
            <div>
                <div className="mt-4 mb-4">
                    <div className="text-nowrap">
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="search-bar">
                                <FaSearch className="search-icon" />
                                <input className="search-input" type="text" placeholder="Search..." />
                            </div>
                            <button className="btn btn-lg btn-danger me-1 float-end" onClick={handleCreate} >
                                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                Quiz</button>
                            <button className="ev-btn btn-lg me-1 float-end">
                                <IoEllipsisVertical className="position-relative" />
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <ul id="wd-quizzes-content" className="list-group rounded-0">
                    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3" />
                                <RiArrowDropDownFill className="fs-3" />
                                Assignment Quizzes
                            </div>
                        </div>
                        <ul className="wd-lessons list-group rounded-0">
                            {quizzes.map((quiz: any) => (
                                <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3 text-secondary" />
                                            <VscRocket className="me-3 fs-4 text-success" />
                                            <div>
                                                {/* <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                                                    className="text-decoration-none"
                                                    style={{ color: 'black' }}>
                                                    {quiz.title}</Link> */}
                                                {/* fake link now */}
                                                {quiz.title}
                                                <div className="text-secondary" style={{ fontSize: '0.8rem' }}>
                                                    <span style={{ color: 'red' }}>Multiple Modules</span> ｜<b>Not available until</b> {quiz.available} | <b>Due</b> {quiz.due} | 100 pts
                                                </div>
                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <GreenCheckmark />
                                            {/* 单个作业最左端的三个竖着省略号按钮 */}
                                            <button className="btn btn-link me-1 float-end"
                                                onClick={() => setActiveMenu(activeMenu === quiz._id ? null : quiz._id)}>
                                                <IoEllipsisVertical className="fs-5 text-dark" />
                                            </button>
                                            {activeMenu === quiz._id && (
                                                <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
                                                    <button className="dropdown-item" onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                                                    <button className="dropdown-item" >Delete</button>
                                                    <button className="dropdown-item" >Publish

                                                    </button>
                                                </div>
                                            )}
                                            {/* {activeMenu === quiz._id && currentUser.role !== 'STUDENT' && (
                                                <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
                                                    <button className="dropdown-item" onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                                                    <button className="dropdown-item" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                                                    <button className="dropdown-item" onClick={() => handleTogglePublish(quiz)}>
                                                        {quiz.published ? 'Unpublish' : 'Publish'}
                                                    </button>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}