import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import People from "./People/index";
import CoursesNavigation from "./Navigation";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuestionEditor from "./Quizzes/QuestionEditors";
import QuizPreview from "./Quizzes/QuizPreviewScreen";
import QuizResults from "./Quizzes/QuizResults";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  console.log("Course ID:", cid);
  const course = courses.find((course) => course._id === cid);
  console.log("Found Course:", course);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" /> {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <div className="d-flex gap-4">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            {/* <Route path="Modules/addNewModel" element={<Modules />} />
            <Route path="Modules/:mid/*" element={<Modules />} /> */}
            <Route path="Assignments" element={<Assignments />} />
            {/* TODO 这个类的作用 */}
            {/* <Route path="Assignments/addNewAss" element={<AssignmentEditor />} /> */}

            <Route path="Assignments/:aid/*" element={<AssignmentEditor />} />
            <Route path="People" element={<People />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/addNewQuiz" element={<QuestionEditor />} />
            <Route path="Quizzes/:qid" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/questions" element={<QuestionEditor />} />
            <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
            <Route path="/Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="/Quizzes/:qid/results" element={<QuizResults />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
