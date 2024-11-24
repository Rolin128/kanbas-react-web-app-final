import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams,useLocation } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import CoursesNavigation from "./Navigation";
import EditorNew from "./Assignments/Editor";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    console.log("Course ID:", cid);
    const course = courses.find((course) => course._id === cid);
    console.log("Found Course:", course);
    const { pathname } = useLocation();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />  {course && course.name} &gt; {pathname.split("/")[4]} 
                </h2>
            <div className="d-flex gap-4">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill" >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/addNewAss" element={<EditorNew />} />
                        <Route path="Assignments/:aid/*/addNewAss" element={<EditorNew />} />
                        <Route path="Assignments/:aid/*" element={<EditorNew />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}