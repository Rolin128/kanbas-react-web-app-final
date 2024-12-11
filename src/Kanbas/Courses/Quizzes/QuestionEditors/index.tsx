import { useParams } from "react-router";
import { useEffect } from "react";
import FillInTheBlanksEditor from "./FillInTheBlanksEditor";
import { useState } from "react";
import MCEditor from "./MultipleChoiceEditor";
import TFEditor from "./TrueFalseEditor";
import { FaTrash } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import { setQuestions, addQuestion, editQuestion } from "./reducer";
import {
  findQuizById,
  findAllQuestionsByQuizId,
  updateQuiz,
  updateQuestion,
  createQuestion,
  deleteQuestion,
} from "../client";

interface Question {
  title: string;
  _id: string;
  text: string;
  points: number;
  description: string;
  type: "multiple-choice" | "fill-in-the-blank" | "true-false";
  options?: string[];
  answers: string[];
}

interface Quiz {
  _id: string;
  points: number;
}

export default function QuestionEditor() {
  const { cid } = useParams();
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [originalQuestions, setOriginalQuestions] = useState<any[]>([]); // For reverting edits

  // Calculate total points dynamically
  const totalPoints = questions.reduce((sum, question) => sum + (question.points || 0), 0);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!qid) return;

      try {
        const fetchedQuiz = await findQuizById(qid);
        setQuiz(fetchedQuiz);

        const fetchedQuestions = await findAllQuestionsByQuizId(qid);
        setQuestions(
          fetchedQuestions.map((q: any) => ({ ...q, isEditing: false })) // Add isEditing flag
        );
      } catch (error) {
        console.error("Error fetching quiz or questions:", error);
      }
    };

    fetchQuizData();
  }, [qid]);

  const handleAddQuestion = () => {
    const newQuestion = {
      title: "New Question",
      type: "multiple-choice",
      points: 0,
      text: "",
      options: ["Option 1", "Option 2"],
      answers: [],
      isEditing: true, // Start in edit mode
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSaveQuiz = async () => {
    console.log(qid!!!!!!!);
    console.log(quiz?._id!!!!!!!!!!!!!!!!!!!!);
    console.log("Saving quiz. Current quiz state:", quiz);
    try {
      if (!quiz) {
        throw new Error("Quiz object is not initialized.");
      }

      let savedQuiz;
      if (qid) {
        // Check if the quiz has a valid `_id` before updating
        if (!quiz._id) {
          throw new Error("Quiz ID is missing.");
        } else {
          savedQuiz = await updateQuiz(quiz);
          setQuiz(savedQuiz); // Update state with the new quiz
        }
      }

      const quizIdToUse = qid || savedQuiz._id;
      if (!quizIdToUse) {
        throw new Error("Quiz ID is missing after save.");
      }

      for (const question of questions) {
        if (question._id) {
          await updateQuestion(question._id, question);
        } else {
          await createQuestion(quizIdToUse, question);
        }
      }

      alert("Quiz and questions saved successfully!");
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert(`Failed to save quiz: ${error}`);
    }
  };

  const handleCancel = async () => {};

  // const handleCancelEdit = (index: number) => {
  //   // Revert to the original state and dismiss the editor
  //   const revertedQuestions = [...originalQuestions];
  //   revertedQuestions[index].isEditing = false; // Exit edit mode
  //   setQuestions(revertedQuestions);
  // };

  const handleCancelEdit = (index: number) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[index]._id) {
      updatedQuestions.splice(index, 1);
    } else {
      // Revert to the original state and dismiss the editor
      const revertedQuestions = originalQuestions[index];
      if (revertedQuestions) {
        updatedQuestions[index] = { ...revertedQuestions, isEditing: false };
      }
      // revertedQuestions[index].isEditing = false; // Exit edit mode
      // setQuestions(revertedQuestions);
      // }
    }
    setQuestions(updatedQuestions);
  };

  const handleEditClick = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = true;
    setOriginalQuestions([...questions]); // Save the original state
    setQuestions(updatedQuestions);
  };

  // const handleSaveChanges = async (index: number) => {
  //   try {
  //     const questionToSave = questions[index];

  //     let savedQuestion;
  //     if (questionToSave._id.startsWith('new')) {
  //       // Create a new question
  //       savedQuestion = await createQuestion(qid!, questionToSave);
  //     } else {
  //       // Update existing question
  //       savedQuestion = await updateQuestion(qid!, questionToSave);
  //     }

  //     // Update the question in the state with the saved version and exit editing mode
  //     const updatedQuestions = [...questions];
  //     updatedQuestions[index] = { ...savedQuestion, isEditing: false };
  //     setQuestions(updatedQuestions);

  //     alert('Question saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving question:', error);
  //     alert('Failed to save the question.');
  //   }
  // };

  const handleSaveChanges = async (index: number) => {
    try {
      const questionToSave = questions[index];
      let savedQuestion;
      if (!questionToSave._id) {
        // Create a new question
        savedQuestion = await createQuestion(qid!, questionToSave);
      } else {
        // Update existing question
        savedQuestion = await updateQuestion(questionToSave._id!, questionToSave);
      }

      // Update the question in the state with the saved version and exit editing mode
      const updatedQuestions = [...questions];
      // updatedQuestions[index] = { ...savedQuestion, isEditing: false };
      updatedQuestions[index] = { ...questions[index], ...savedQuestion, isEditing: false };
      setQuestions(updatedQuestions);

      alert("Question saved successfully!");
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save the question.");
    }
  };

  const handleDeleteClick = async (questionId: string | undefined) => {
    if (!questionId) {
      // If the question has no _id, it is unsaved; remove it locally
      setQuestions(questions.filter((q) => q._id !== questionId));
      return;
    }

    try {
      await deleteQuestion(questionId); // Backend call for saved questions
      setQuestions(questions.filter((q) => q._id !== questionId)); // Remove from state
      alert("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const renderPreview = (question: Question, index: number) => (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between">
        <h5>Question {index + 1}</h5>
        <span>{question.points} pts</span>
      </div>
      <div className="card-body">
        {/* Only display the title */}
        <h6>{question.title}</h6>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={() => handleEditClick(index)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => handleDeleteClick(question._id)}>
          Delete
        </button>
      </div>
    </div>
  );

  const editorHelper = (question: Question, index: number) => {
    const handleEditorChange = (updatedQuestion: Question) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    };

    switch (question.type) {
      case "multiple-choice":
        return <MCEditor question={question} onChange={handleEditorChange} />;
      case "true-false":
        return <TFEditor question={question} onChange={handleEditorChange} />;
      case "fill-in-the-blank":
        return <FillInTheBlanksEditor question={question} onChange={handleEditorChange} />;
      default:
        return <MCEditor question={question} onChange={handleEditorChange} />;
    }
  };

  const renderEditor = (question: Question, index: number) => {
    const handleFieldChange = (field: keyof Question, value: any) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      setQuestions(updatedQuestions);
    };

    return (
      <div className="card mb-3">
        <div className="card-header">
          <div className="card-header d-flex align-items-center justify-content-between">
            <div className="me-2 flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Question Title"
                value={question.title}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].title = e.target.value;
                  setQuestions(updatedQuestions);
                }}
              />
            </div>

            <div id="wd-css-styling-dropdowns" className="me-2">
              <select
                className="form-select"
                value={question.type}
                // onChange={(e) => {
                //   const updatedQuestions = [...questions];
                //   updatedQuestions[index].type = e.target.value as
                //     | 'multiple-choice'
                //     | 'fill-in-the-blank'
                //     | 'true-false';
                //   setQuestions(updatedQuestions);
                // }}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  const newType = e.target.value as "multiple-choice" | "fill-in-the-blank" | "true-false";

                  updatedQuestions[index] = {
                    ...updatedQuestions[index],
                    type: newType,
                    // Initialize type-specific fields
                    ...(newType === "multiple-choice" && {
                      options: ["Option 1", "Option 2"], // Default options
                      answers: [], // Default answers
                      description: "", // Default description
                    }),
                    ...(newType === "true-false" && {
                      text: "", // Default question text
                      answers: ["false"], // Default answer
                    }),
                    ...(newType === "fill-in-the-blank" && {
                      description: "", // Default description
                      answers: [""], // Default blank answer
                    }),
                  };

                  setQuestions(updatedQuestions);
                }}
              >
                <option value="multiple-choice">Multiple choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-the-blank">Fill in the blanks</option>
              </select>
            </div>

            <div className="d-flex align-items-center">
              <label htmlFor="points" className="form-label mb-0 me-2">
                <strong>pts:</strong>
              </label>
              <input
                id="question-point"
                type="number"
                className="form-control d-inline-block w-auto"
                placeholder="0"
                value={question.points}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].points = Number(e.target.value);
                  setQuestions(updatedQuestions);
                }}
                min="0"
                step="1"
              />
              <div className="ms-3">
                <FaTrash className="text-danger" onClick={() => handleDeleteClick(question._id)} />
              </div>
            </div>
          </div>
          <div className="card-body">{editorHelper(question, index)}</div>
        </div>
        <div className="card-footer d-flex justify-content-start">
          <button className="btn btn-secondary me-2" onClick={() => handleSaveChanges(index)}>
            Save
          </button>
          <button className="btn btn-danger me-2" onClick={() => handleDeleteClick(question._id)}>
            Delete
          </button>
          <button className="btn btn-light" onClick={() => handleCancelEdit(index)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quiz Questions</h3>
        <h5>Total Points: {totalPoints}</h5>
      </div>
      {questions.map((question, index) =>
        question.isEditing ? renderEditor(question, index) : renderPreview(question, index)
      )}
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={handleAddQuestion}>
          + New Question
        </button>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary me-2" onClick={() => {}}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSaveQuiz}>
          Save
        </button>
      </div>
    </div>
  );
}
