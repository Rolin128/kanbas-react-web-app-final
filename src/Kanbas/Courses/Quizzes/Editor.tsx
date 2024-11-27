import React, { useEffect, useState } from "react";
import ProtectedContent from "../../Account/ProtectedContent";
import { IoEllipsisVertical } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { MdPublishedWithChanges } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, addQuiz, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const router = useNavigate();
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [haveTimeLimit, setTimeLimit] = useState(false);

  const qidQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [quiz, setQuiz] = useState<any>({
    course: cid,
    title: "Default",
    description: "",
    published: false,

    points: 100,
    due: "",
    available: "",
    until: "",
    _id: "",
  });
  // TODO在哪里触发useEffect
  useEffect(() => {
    if (qidQuiz) {
      setQuiz({
        // TODO ...是什么意思
        ...qidQuiz,
        title: qidQuiz.title || "",
        description: qidQuiz.description || "",
        points: qidQuiz.points || 0,
        due: qidQuiz.due || "",
        available: qidQuiz.available || "",
        until: qidQuiz.until || "",
        published: qidQuiz.published || false,
      });
    }
  }, [qidQuiz]);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuiz((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createQuiz = async (quiz: any) => {
    if (!cid) return;
    const newQuiz = await coursesClient.createQuizForCourse(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };
  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const handleSaveQuiz = () => {
    if (quiz._id === qid) {
      saveQuiz(quiz);
      router(`/Kanbas/Courses/${cid}/quizzes`);
    } else {
      createQuiz({ ...quiz, _id: new Date().getTime().toString() });
      router(`/Kanbas/Courses/${cid}/quizzes`);
    }
  };

  const handleCancelQuiz = () => {
    router(`/Kanbas/Courses/${cid}/quizzes`);
  };
  const handleTogglePublish = async () => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
    setQuiz(updatedQuiz);
    if (!quiz.published) {
      router(`/Kanbas/Courses/${cid}/quizzes`);
    }
  };

  return (
    <div>
      <div className="quiz-editor p-4">
        <div className="">
          <IoEllipsisVertical className="d-flex float-end ms-3 fs-5 border-secondary border rounded-1 bg-secondary text-secondary" />
          <div className="d-flex float-end ms-3 ">
            {/* 是否publish后面还要修改 */}
            {!quiz.published && (
              <div className="d-flex">
                <FcCancel className="fs-5 text-secondary" />
                <span className="text-secondary ms-1">Not Published</span>
              </div>
            )}
            {quiz.published && (
              <div>
                <MdPublishedWithChanges className="fs-5 text-success " />
                <span className="ms-1">Published</span>
              </div>
            )}
          </div>
          <h5 className="d-flex float-end">Points {quiz.points}</h5>
        </div>
        <br />
        <hr />
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link text-dark ${activeTab === "details" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("details");
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/editor`);
                }}
              >
                Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-dark ${activeTab === "questions" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("questions");
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/questions`);
                }}
              >
                Questions
              </button>
            </li>
          </ul>
        </div>
        <div>
          {/* 
                <div className="mb-4">
                        <label htmlFor="wd-assignment-name-o" className="form-label">Assignment Name</label>
                        <input id="wd-assignment-name-o" className="form-control" name="title" value={assignment.title} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <textarea id="wd-assignment-description" className="form-control" rows={10} cols={60}
                            style={{ height: '400px' }} onChange={handleChange} name="description" value={assignment.description}>
                        </textarea>
                    </div> */}

          {activeTab === "details" && (
            <div>
              <label htmlFor="wd-assignment-name-o" className="form-label">
                Quiz Name
              </label>
              <input
                type="text"
                value={quiz.title}
                placeholder={quiz.title}
                className="form-control mb-2"
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
              <label htmlFor="wd-assignment-name-o" className="form-label">
                Description
              </label>
              {/* 是否用handleChange包裹？ */}
              {/* <input type="text" value={quiz.description} placeholder={quiz.description} className='form-control'  style={{ height: '400px' }}
                                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} /> */}
              <textarea
                id="wd-assignment-description"
                className="form-control"
                rows={10}
                cols={60}
                style={{ height: "400px" }}
                onChange={handleChange}
                name="description"
                value={quiz.description}
              ></textarea>
              <div id="wd-quiz-instructions" className="mb-2 mt-3">
                Quiz Instructions:
                <div id="wd-quiz-edit-tools">
                  <span></span>
                </div>
              </div>
              <div id="quiz-editors">
                <div className="row mb-4">
                  <div className="d-flex col-3 justify-content-end mb-4">Quiz Type</div>
                  <div className="col-7">
                    <select className="form-select" onChange={handleChange}>
                      <option value="GRADED_QUIZ" selected={quiz.type === "GRADED_QUIZ"}>
                        Graded Quiz
                      </option>
                      <option value="PRACTICE_QUIZ" selected={quiz.type === "PRACTICE_QUIZ"}>
                        Practice Quiz
                      </option>
                      <option value="GRADE_SURVEY" selected={quiz.type === "GRADE_SURVEY"}>
                        Graded Survey
                      </option>
                      <option value="UNGRADED_SURVEY" selected={quiz.type === "UNGRADED_SURVEY"}>
                        Ungraded Survey
                      </option>
                    </select>
                  </div>
                  <div className="row mb-2">
                    <div className="d-flex col-3 justify-content-end">Assignment Group</div>
                    <div className="col-8">
                      <select className="form-select" onChange={handleChange}>
                        <option value="Quizzes" selected={quiz.assignmentGroup === "Quizzes"}>
                          Quizzes
                        </option>
                        <option value="Exams" selected={quiz.assignmentGroup === "Exams"}>
                          Exams
                        </option>
                        <option value="Assignments" selected={quiz.assignmentGroup === "Assignments"}>
                          Assignments
                        </option>
                        <option value="Project" selected={quiz.assignmentGroup === "Project"}>
                          Project
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2 mt-4">
                    <div className="col-3"></div>
                    <div className="col-7">
                      <span className="fw-bold mb-2">Options</span>
                      <br />
                      <input
                        type="checkbox"
                        id="shuffle"
                        checked={quiz.shuffleAnswers}
                        style={{ zoom: 1.25 }}
                        onChange={handleChange}
                      />
                      <label htmlFor="shuffle" className="p-2 mb-3">
                        Shuffle Answers
                      </label>{" "}
                      <br />
                      <div className="row mb-2">
                        <div className="col d-flex">
                          <input
                            type="checkbox"
                            id="time-limit"
                            checked={quiz.timeLimit > 0}
                            style={{ zoom: 1.25 }}
                            onChange={(e) => {
                              !e.target.checked && setQuiz({ ...quiz, timeLimit: 0 });
                              setTimeLimit(!haveTimeLimit);
                            }}
                          />
                          <label htmlFor="time-limit" className="ms-2 pb-2">
                            Time Limit
                          </label>
                        </div>
                        {haveTimeLimit && (
                          <div className="col d-flex">
                            <input
                              type="number"
                              className="form-control"
                              id="minutes"
                              placeholder={quiz.timeLimit}
                              min={0}
                              onChange={(e) => haveTimeLimit && setQuiz({ ...quiz, timeLimit: e.target.value })}
                            />
                            <label htmlFor="minutes" className="p-2">
                              Minutes
                            </label>
                          </div>
                        )}
                      </div>
                      <div className="form-control">
                        <input
                          type="checkbox"
                          id="attempts"
                          checked={quiz.multipleAttempts}
                          style={{ zoom: 1.25 }}
                          className="mt-3"
                          onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                        />
                        <label htmlFor="attempts" className="p-1 ms-2">
                          Allow Multiple Attempts
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="lockQuestionsAfterAnswering"
                          checked={quiz.lockQuestionsAfterAnswering}
                          style={{ zoom: 1.25 }}
                          className="mt-3"
                          onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                        />
                        <label htmlFor="lockQuestionsAfterAnswering" className="p-1 ms-2">
                          Lock Questions After Answering
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="oneQuestionAtATime"
                          checked={quiz.oneQuestionAtATime}
                          style={{ zoom: 1.25 }}
                          className="mt-3"
                          onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                        />
                        <label htmlFor="oneQuestionAtATime" className="p-1 ms-2">
                          One Question at a Time
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="showCorrectAnswers"
                          checked={quiz.showCorrectAnswers}
                          style={{ zoom: 1.25 }}
                          className="mt-3"
                          onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                        />
                        <label htmlFor="showCorrectAnswers" className="p-1 ms-2">
                          Show Correct Answers
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="d-flex col-3 justify-content-end">Assign</div>
                    <div className="col-7">
                      <div className="form-control">
                        <div className="mb-2 mt-2">
                          <label htmlFor="wd-assign-to" className="form-label fw-bold">
                            Assign to
                          </label>
                          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
                        </div>
                        <div id="wd-due-editor" className="mb-2 mt-2">
                          <span className="fw-bold">Due</span>
                          <br />

                          <div className="input-group">
                            <input
                              type="date"
                              className="form-control"
                              value={quiz.due}
                              onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
                            />
                            <span className="input-group-text fs-5"></span>
                          </div>
                        </div>
                        <div id="wd-dates-editor">
                          <div className="row mt-4">
                            <div className="col mb-4">
                              <span className="fw-bold">Available from</span>
                              <br />

                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={quiz.available}
                                  onChange={(e) => setQuiz({ ...quiz, available: e.target.value })}
                                />
                                <span className="input-group-text fs-5"></span>
                              </div>
                            </div>
                            <div className="col mb-4">
                              <span className="fw-bold">Until</span>
                              <br />

                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={quiz.until}
                                  onChange={(e) => setQuiz({ ...quiz, until: e.target.value })}
                                />
                                <span className="input-group-text fs-5"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3 d-flex justify-content-end">Requirements</div>
                    <div className="col-7">
                      <div className="form-control">
                        <input
                          type="checkbox"
                          id="webcamRequired"
                          checked={quiz.webcamRequired}
                          style={{ zoom: 1.25 }}
                          className="mt-3"
                          onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                        />
                        <label htmlFor="webcamRequired" className="p-1 ms-2">
                          Webcam Required
                        </label>
                        <br />

                        <div className="row mt-3">
                          <label htmlFor="access-code" className="col">
                            Access Code
                          </label>
                          <input
                            id="access-code"
                            type="text"
                            className="form-control col me-3"
                            placeholder={quiz.accessCode}
                            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  {/* <button className="btn btn-lg btn-secondary me-2 float-end" >Cancel</button>
                                    <button className="btn btn-lg btn-danger float-end" >Save</button> */}
                  <button className="btn btn-lg btn-secondary me-2" onClick={handleCancelQuiz}>
                    Cancel
                  </button>
                  <button className="btn btn-lg btn-danger me-2" onClick={handleSaveQuiz}>
                    Save
                  </button>
                  <button className="btn btn-lg btn-warning" onClick={handleTogglePublish}>
                    {quiz.published ? "Unpublish" : "Save and Publish"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
