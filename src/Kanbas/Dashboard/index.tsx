import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
// import { addEnrollment, removeEnrollment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import ProtectedContent from "../Account/ProtectedContent";
import * as courseClient from "../Courses/client";
import * as accountClient from "../Account/client";
import * as enrollmentClient from "./client";
import * as userClient from "../Account/client"
import KanbasContent from "../index";
import { enrollCourse, unenrollCourse } from "./reducer";


export default function Dashboard(
    { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
        courses: any[];
        course: any;
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [localCourses, setLocalCourses] = useState<any[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [titleText, setTitleText] = useState('Enrolled Courses');
    const [loading, setLoading] = useState(false);


    //const [allCoursesList, setAllCoursesList] = useState(false);
    // const [titleText, setTitleText] = useState('Enrolled Courses');
    // const handleButtonClick = () => {
    //     setAllCoursesList(!allCoursesList);
    //     setTitleText(allCoursesList ? 'Enrolled Courses' : 'Published Courses');
    // };
    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const courses = await accountClient.findMyCourses();
            setEnrolledCourses(courses);
            setLocalCourses(courses);
        };
        fetchEnrolledCourses();
    }, [currentUser]);

    const handleEnroll = async (courseId: any) => {
        setLoading(true);
        try {
            await enrollmentClient.enrollCourse(currentUser._id, courseId);
            const updatedCourses = await accountClient.findMyCourses();
            setEnrolledCourses(updatedCourses);
            dispatch(enrollCourse({ userId: currentUser._id, courseId }));
        } catch (error) {
            console.error("Enrollment failed:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleUnenroll = async (courseId: string) => {
        try {
            await enrollmentClient.unenrollCourse(currentUser._id, courseId);
            const updatedCourses = await accountClient.findMyCourses();
            setLocalCourses(updatedCourses);
            setEnrolledCourses(updatedCourses);
            dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
        } catch (error) {
            console.error("Unenrollment failed:", error);
        }
    };
    const toggleCourseList = async () => {
        setShowAllCourses((prev) => !prev);
        if (!showAllCourses) {
            const allCourses = await courseClient.fetchAllCourses();
            setLocalCourses(allCourses);
        } else {
            setLocalCourses(enrolledCourses);
        }
    };
    const handleAddNewCourse = async () => {
        await addNewCourse();
        const updatedCourses = await userClient.findMyCourses();
        setLocalCourses(updatedCourses);
    };

    const handleDeleteCourse = async (courseId: string) => {
        await deleteCourse(courseId);
        const updatedCourses = await userClient.findMyCourses();
        setLocalCourses(updatedCourses);
      };

    const handleUpdateCourse = async () => {
        await updateCourse();
        const updatedCourses = await userClient.findMyCourses();
        setLocalCourses(updatedCourses);
      };


    // const enrolledCourses = enrollments
    //     .filter((enrollment: any) => enrollment.user === currentUser._id)
    //     .map((enrollment: any) => enrollment.course);

    // const coursesFilter = allCoursesList ? courses : courses.filter(course => enrolledCourses.includes(course._id));

    const renderFacultySection = () => (
        <><h1 id="wd-dashboard-title" className="wd-faculty-left-margin">
            Dashboard
        </h1>
            <hr />
            <h2 id="wd-dashboard-published" className="wd-faculty-left-margin">
                Published Courses ({localCourses.length})
            </h2>
            <hr />
            <h5 className="wd-faculty-left-margin">New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={
                        handleAddNewCourse
                    }>Add</button>
                <button className="btn btn-warning float-end me-2"
                    onClick={handleUpdateCourse} id="wd-update-course-click">
                    Update
                </button><br />
            </h5>
            <input value={course.name} className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
        </>
    );

    const renderStudentSection = () => (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 id="wd-dashboard-student-title">
                    Dashboard
                </h1>
                <button id="wd-st-click-enrollments-course-button" className="btn btn-primary me-2"
                    onClick={toggleCourseList}>
                    {showAllCourses ? 'Show Enrollments' : 'Show All Courses'}
                </button>
            </div>
            <hr />
            <h2 id="wd-dashboard-student-courses-condition">
                {titleText}({localCourses.length})
            </h2>
        </div>
    );

    const courseCards = localCourses.map((course) => {

        return (
            <div className="col " style={{ width: "300px" }} key={course._id}>
                <div className="card">
                    <img
                        src={course.image} className="card-img-top" alt={course.name}
                    />
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title text-primary">
                            {course.name}
                        </h5>
                        <p className="wd-dashboard-course-text card-text">
                            {course.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary ">
                                Go
                            </Link>
                            {currentUser.role === 'STUDENT' && (
                                (enrolledCourses.some((c) => c._id === course._id)) ? (
                                    <button id="wd-unenroll-course-button" className="btn btn-danger" onClick={(event) => {
                                        event.preventDefault()
                                        handleUnenroll(course._id);
                                    }}>
                                        Unenroll
                                    </button>
                                ) : (
                                    <button id="wd-enroll-course-button" className="btn btn-success" onClick={(event) => {
                                        event.preventDefault()
                                        handleEnroll(course._id);
                                    }}>
                                        Enroll
                                    </button>
                                )
                            )}
                            {currentUser.role === 'FACULTY' && (
                                <><button id="wd-edit-course-button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setCourse(course)
                                    }}
                                    className="btn btn-warning me-2" style={{ marginLeft: 'auto' }} >
                                    Edit
                                </button>
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        handleDeleteCourse(course._id);
                                    }} className="btn btn-danger" id="wd-delete-course-button">
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        );
    });

    return (
        <div>
            <ProtectedContent
                facultyContent={renderFacultySection()}
                studentContent={renderStudentSection()}
            />
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {courseCards}
            </div>
        </div>
    );
}
