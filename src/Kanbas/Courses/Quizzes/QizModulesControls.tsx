import { FaPlus } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { IoEllipsisVertical } from "react-icons/io5";
export default function ModulesControls() {
    return (
        <div className="text-nowrap">
            <div className="d-flex justify-content-end align-items-center">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input className="search-input" type="text" placeholder="Search..." />
                </div>
                <button className="btn btn-lg btn-danger me-1 float-end">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz</button>   
                <button className="ev-btn btn-lg me-1 float-end">
                    <IoEllipsisVertical className="position-relative"/>
                    </button>  
            </div>    
        </div>
    );
}