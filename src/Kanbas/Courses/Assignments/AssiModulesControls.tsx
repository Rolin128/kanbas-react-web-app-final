import { FaPlus } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import ProtectedContent from "../../Account/ProtectedContent";


export default function ModulesControls({ cid }: { cid: string }) {
    return (
        <div id="Assignment-top-buttons" className="text-nowrap">
            <div className="d-flex justify-content-end align-items-center">
                <div id="wd-search-assignment" className="search-bar">
                    <FaSearch className="search-icon" />
                    <input className="search-input" type="text" placeholder="Search..." />
                </div>
                <ProtectedContent
                    facultyContent={<>
                        <button id="wd-add-assignment-group" className="btn btn-lg wd-btn-secondary me-1 float-end">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Group</button>
                        <Link id="wd-add-assignment" to={`/Kanbas/Courses/${cid}/Assignments/addNewAss`} className="btn btn-lg btn-danger me-1 float-end">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Assignment</Link>
                    </>} studentContent={undefined} />
            </div>
        </div>
    );
}
