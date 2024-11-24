import ModulesControls from "./AssiModulesControls";
import LessonControlButtons from "./AssiHeadControlButtons";
import { BsGripVertical } from "react-icons/bs";
import AssiControlButtons from "./AssiControlButtons";
import { PiNotebookLight } from "react-icons/pi";
import { RiArrowDropDownFill } from "react-icons/ri";
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import './SearchBar.css';
import './Elips.css';
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";


import { Link } from "react-router-dom";
export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    // const cidAssignments = assignments.filter((assignment: any) => assignment.course === cid);

    const dispatch = useDispatch();
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(
            cid as string
        );
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);
    const removeAssignment = async (aid: string) => {
        await assignmentsClient.deleteAssignment(aid);
        dispatch(deleteAssignment(aid));
    };

    return (
        <div id="wd-assignments">
            <div>
                <div className="mt-4 mb-5">
                    <ModulesControls
                        cid={cid!}
                    />
                </div>
                <ul id="wd-assignments-content" className="list-group rounded-0">
                    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3" />
                                <RiArrowDropDownFill className="fs-3" />
                                ASSIGNMENTS
                            </div>
                            <div>
                                <LessonControlButtons />
                            </div>
                        </div>
                        <ul className="wd-lessons list-group rounded-0">
                            {assignments.map((assignments: any) => (
                                <li key={assignments._id} className="wd-lesson list-group-item p-3 ps-1">
                                    {/* 虽然在你当前的代码中，移除key属性后可能暂时看不到明显的区别，但建议始终为动态生成的列表项添加唯一的key属性。 */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3 text-secondary" />
                                            <PiNotebookLight className="me-2 fs-3 text-success" />
                                            <div>
                                                <Link to={`/Kanbas/Courses/${cid}/assignments/${assignments._id}`}
                                                    className="text-decoration-none"
                                                    style={{ color: 'black' }}>
                                                    {assignments.title}</Link>
                                                <div className="text-secondary" style={{ fontSize: '0.8rem' }}>
                                                    <span style={{ color: 'red' }}>Multiple Modules</span> ｜<b>Not available until</b> {assignments.available} | <b>Due</b> {assignments.due} | 100 pts
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <AssiControlButtons assignmentId={assignments._id}
                                                deleteAssignment={(assignmentId) => 
                                                    removeAssignment(assignmentId)
                                                } />
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