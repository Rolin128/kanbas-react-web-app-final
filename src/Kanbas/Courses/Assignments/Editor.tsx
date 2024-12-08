import { useLocation, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment, setAssignments } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import ProtectedContent from '../../Account/ProtectedContent';


export default function AssignmentEditor() {
    const dispatch = useDispatch();
    const router = useNavigate();
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const navigate = useNavigate();
    // const { pathname } = useLocation();

    const aidAssignment = assignments.find((assignment: any) => assignment._id === aid);

    const [assignment, setAssignment] = useState<any>({
        course: cid,
        title: 'Default',
        description: '',
        points: 100,
        due: '',
        available: '',
        until: '',
        _id: ''
    });

    useEffect(() => {
        if (aidAssignment) {
            setAssignment({
                ...aidAssignment,
                title: aidAssignment.title || "",
                description: aidAssignment.description || "",
                points: aidAssignment.points || 0,
                due: aidAssignment.due || "",
                available: aidAssignment.available || "",
                until: aidAssignment.until || "",
            });
        }
    }, [aidAssignment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAssignment((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createAssignment = async (assignment: any) => {
        if (!cid) return;
        const newAssignment = await coursesClient.createAssignmentForCourse(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
    };

    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
        navigate(0);
    };

    const handleSave = () => {
        if (assignment._id === aid) {
            saveAssignment(assignment);
            router(`/Kanbas/Courses/${cid}/assignments`);
        } else {
            createAssignment({ ...assignment, _id: new Date().getTime().toString() });
            router(`/Kanbas/Courses/${cid}/assignments`);
        }
    };

    const handleCancel = () => {
        router(`/Kanbas/Courses/${cid}/assignments`);
    };
    const location = useLocation();

    return (
        <ProtectedContent
            facultyContent={
                <div id="wd-assignments-editor" className="container mt-5">
                    {/* <p>Current Path: {location.pathname}</p>
                    <p>Current Path: {location.pathname}</p>
                    <p>Assignment ID (aid): {aid}</p>
                    <p>Wildcard: {wildcard}</p> */}
                    <div className="mb-4">
                        <label htmlFor="wd-assignment-name-o" className="form-label">Assignment Name</label>
                        <input id="wd-assignment-name-o" className="form-control" name="title" value={assignment.title} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <textarea id="wd-assignment-description" className="form-control" rows={10} cols={60}
                            style={{ height: '400px' }} onChange={handleChange} name="description" value={assignment.description}>
                        </textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-points" className="form-label float-md-end">Points</label>
                        </div>
                        <div className="col-md-6">
                            <input id="wd-points" className="form-control" onChange={handleChange} name="points" value={assignment.points} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-assi-group" className="form-label float-md-end">Assignment Group</label>
                        </div>
                        <div className="col-md-6">
                            <select id="wd-assi-group" className="form-select">
                                <option value="midterm">MIDTERM</option>
                                <option value="final">FINAL</option>
                                <option selected value="assignment">ASSIGNMENT</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <div className="col-md-6">
                            <label htmlFor="wd-display-grade" className="form-label float-md-end">Display Grade as</label>
                        </div>
                        <div className="col-md-6">
                            <select id="wd-display-grade" className="form-select">
                                <option value="point">Point</option>
                                <option value="gpa">GPA</option>
                                <option selected value="per">Percentage</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <div className="col-md-6">
                            <label className="form-label float-md-end">Submission Type</label>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <select id="sub-type" className="form-select mb-3">
                                        <option value="paper">On Paper</option>
                                        <option selected value="online">Online</option>
                                    </select>

                                    <div>
                                        <label className="form-label fw-bold">Online Entry Options</label>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                                            <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="wd-website-url" checked />
                                            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="wd-media-recording" />
                                            <label className="form-check-label" htmlFor="wd-media-recording">Media Recordings</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                                            <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="wd-file-uploads" />
                                            <label className="form-check-label" htmlFor="wd-file-uploads">File Uploads</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 ">
                        <div className="col-md-6">
                            <label className="form-label float-md-end">Assign</label>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
                                        <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="wd-due" className="form-label fw-bold">Due</label>
                                        <input type="date" id="wd-due" className="form-control" value={assignment.due} name="due" onChange={handleChange} />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                                            <input type="date" id="wd-available-from" className="form-control" value={assignment.available} name="available" onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="wd-until" className="form-label fw-bold">Until</label>
                                            <input type="date" id="wd-until" className="form-control" value={assignment.until} name="until" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-light me-2"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            studentContent={
                <div id="wd-assignments-editor" className="container mt-5">
                    <div className="mb-4">
                        <label htmlFor="wd-assignment-name-o" className="form-label">Assignment Name</label>
                        <input id="wd-assignment-name-o" className="form-control" name="title" value={assignment.title} readOnly />
                    </div>
                    <div className="mb-4">
                        <textarea id="wd-assignment-description" className="form-control" rows={10} cols={60}
                            style={{ height: '400px' }} name="description" value={assignment.description} readOnly>
                        </textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-points" className="form-label float-md-end">Points</label>
                        </div>
                        <div className="col-md-6">
                            <input id="wd-points" className="form-control" name="points" value={assignment.points} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-due" className="form-label float-md-end">Due</label>
                        </div>
                        <div className="col-md-6">
                            <input type="date" id="wd-due" className="form-control" value={assignment.due} name="due" readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-available-from" className="form-label float-md-end">Available from</label>
                        </div>
                        <div className="col-md-6">
                            <input type="date" id="wd-available-from" className="form-control" value={assignment.available} name="available" readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="wd-until" className="form-label float-md-end">Until</label>
                        </div>
                        <div className="col-md-6">
                            <input type="date" id="wd-until" className="form-control" name="until" value={assignment.until} readOnly />
                        </div>
                    </div>
                </div>
            }
        />
    );
}
