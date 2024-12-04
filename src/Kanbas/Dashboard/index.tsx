import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";


export default function Dashboard(
    { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
        courses: any[];
        course: any;
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (course: any) => void;
        updateCourse: () => void;
        enrolling: boolean;
        setEnrolling: (enrolling: boolean) => void;
        updateEnrollment: (courseId: string, enrolled: boolean) => void;

    }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);


    return (
        <div>
            <h1 id="wd-dashboard-title" className="wd-faculty-left-margin">
                Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
            <hr />
            <h2 id="wd-dashboard-published" className="wd-faculty-left-margin">
                {enrolling ? "Published Courses" : "My Enrolled Courses"} ({courses.length})
            </h2>
            <hr />
            {currentUser.role === 'FACULTY' && (
                <>
                    <h5 className="wd-faculty-left-margin">New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={
                                addNewCourse
                            }>Add</button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button><br />
                    </h5>
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                </>
            )}
            <hr />
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {courses.map((course) => (
                    <div className="col " style={{ width: "300px" }} key={course._id}>
                        <div className="card">
                            <img
                                src={course.image} className="card-img-top" alt={course.name}
                            />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title text-primary">
                                    {enrolling && (
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                updateEnrollment(course._id, !course.enrolled);
                                            }}
                                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                            {course.enrolled ? "Unenroll" : "Enroll"}
                                        </button>
                                    )}
                                    {course.name}
                                </h5>
                                <p className="wd-dashboard-course-text card-text">
                                    {course.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary ">
                                        Go
                                    </Link>
                                    {currentUser.role === 'FACULTY' && (
                                        <>
                                            <button id="wd-edit-course-button"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course)
                                                }}
                                                className="btn btn-warning me-2" style={{ marginLeft: 'auto' }} >
                                                Edit
                                            </button>
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }} className="btn btn-danger" id="wd-delete-course-button">
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
