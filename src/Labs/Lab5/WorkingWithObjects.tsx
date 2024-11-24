import React, { useState } from "react";
import './lab5.css';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [module, setModule] = useState({
        id: "CS101",
        name: "Introduction to Computer Science",
        description: "An introductory course on computer science",
        course: "Computer Science",
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <div className="d-flex align-items-center" style={{ marginBottom: '5px' }}>
                <input className="form-control me-3 " id="wd-assignment-title" style={{ width: 'auto' }}
                    defaultValue={assignment.title} onChange={(e) =>
                        setAssignment({ ...assignment, title: e.target.value })}
                />
                <a id="wd-update-assignment-title"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title
                </a>
            </div>
            <div className="d-flex align-items-center">
                <input className="form-control me-3 " id="wd-assignment-score" type="number" style={{ width: 'auto', marginBottom: '5px' }}
                    defaultValue={assignment.score} onChange={(e) =>
                        setAssignment({ ...assignment, score: e.target.valueAsNumber })} />
                <a id="wd-update-assignment-score"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Score
                </a>
            </div>
            <div className="d-flex align-items-center">
                <input className="form-check-input me-3 " id="wd-assignment-completed" type="checkbox" style={{marginBottom: '5px' }}
                    checked={assignment.completed} onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })} />
                <a id="wd-update-assignment-completed"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completed
                </a>
            </div>
            <hr />
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary fix-lab-module-size-button" 
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary fix-lab-module-size-button"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <hr />
            <h4>Modifying Module Properties</h4>
            <div className="d-flex align-items-center">
                <input className="form-control me-3 " id="wd-module-name" style={{ width: 'auto' }}
                    defaultValue={module.name} onChange={(e) =>
                        setModule({ ...module, name: e.target.value })} />
                <a id="wd-update-module-name"
                    className="btn btn-primary float-end" style={{ marginBottom: '5px' }}
                    href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Module Name
                </a>
            </div>
            <div className="d-flex align-items-center">
                <input className="form-control me-3 " id="wd-module-description" style={{ width: 'auto' }}
                    defaultValue={module.description} onChange={(e) =>
                        setModule({ ...module, description: e.target.value })} />
                <a id="wd-update-module-description"
                    className="btn btn-primary float-end"
                    href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Module Description
                </a>
            </div><hr />
            <h4>Retrieving Module Objects</h4>
            <a id="wd-retrieve-module" className="btn btn-primary fix-lab-module-size-button"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a><hr />
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary fix-lab-module-size-button"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a><hr />
        </div>
    );
}
