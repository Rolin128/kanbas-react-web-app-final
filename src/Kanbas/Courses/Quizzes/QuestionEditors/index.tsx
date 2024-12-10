import { useParams } from 'react-router';
import { useEffect } from 'react';
import FillInTheBlanksEditor from './FillInTheBlanksEditor';
import { useState } from 'react';
import MCEditor from './MultipleChoiceEditor';
import TFEditor from './TrueFalseEditor';
import { FaTrash } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import {findQuizById, findAllQuestionsByQuizId, updateQuiz, createQuiz, updateQuestion, createQuestion, deleteQuestion}  from "../client";

interface Question {
  title: string;
  _id: string;
  text: string;
  points: number;
  description: string;
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
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
  // const [questions, setQuestions] = useState<Question[]>(
    const [question, setQuestion] = useState<Question>({
      title: 'string',
      _id: 'string',
      text: 'string',
      points: 100,
      description: 'string',
      type: 'multiple-choice', // 使用其中一个允许的类型值
      answers: [] // 初始化为空数组
      // options 是可选的，所以可以不设置
  });



  const [quiz, setQuiz] = useState<Quiz | null>(null);

    // Fetch quiz and questions on component mount
    useEffect(() => {
      const fetchQuizData = async () => {
        if (!qid) return;
    
        try {
          console.log('Fetching quiz data...');
          const fetchedQuiz = await findQuizById(qid);
          console.log('Fetched quiz:', fetchedQuiz);
          setQuiz(fetchedQuiz);
    
          const fetchedQuestions = await findAllQuestionsByQuizId(qid);
          console.log('Fetched questions:', fetchedQuestions);
          setQuestions(fetchedQuestions);
        } catch (error) {
          console.error('Error fetching quiz or questions:', error);
        }
      };
    
      fetchQuizData();
    }, [qid]);


  const renderEditor = (question: Question, index: number) => {
    const handleEditorChange = (updatedQuestion: Question) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    };

    switch (question.type) {
      case 'multiple-choice':
        return <MCEditor question={question} onChange={handleEditorChange} />;
      case 'true-false':
        return <TFEditor question={question} onChange={handleEditorChange} />;
      case 'fill-in-the-blank':
        return (
          <FillInTheBlanksEditor
            question={question}
            onChange={handleEditorChange}
          />
        );
      default:
        return <MCEditor question={question} onChange={handleEditorChange} />;
    }
  };

  // TODO: 下面这些还需要补充完成才能传输数据
  const handleSaveChanges = async (questionId: string) => {
    try {
      // Find the specific question by its _id
      const questionToUpdate = questions.find((q) => q._id === questionId);
  
      if (!questionToUpdate) {
        alert("Question not found");
        return;
      }
  
      // Update the question in the backend
      
  
      // Optional: Refresh the questions list by re-fetching
      const updatedQuestions = await updateQuestion(questionId, questionToUpdate); 
      setQuestion(updatedQuestions);
  
      alert("Question updated successfully!");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question. Please try again.");
    }
  };


  

//   const handleSaveQuiz = async () => {
//     try {
//         let savedQuiz;
//         if (qid) {
//             savedQuiz = await updateQuiz(quiz);
//         } else {
//             savedQuiz = await createQuiz(cid!);
//         }

//         const quizIdToUse = qid || savedQuiz._id;

//         // Save or update each question
//         for (const question of questions) {
//             if (question._id) {
//                 await updateQuestion(quizIdToUse, question._id, question);
//             } else {
//                 await createQuestion(quizIdToUse, question);
//             }
//         }

//         alert('Quiz and questions saved successfully!');
//     } catch (error) {
//         console.error('Error saving quiz:', error);
//         alert('Failed to save quiz');
//     }
// };

const handleSaveQuiz = async () => {
  console.log(qid !!!!!!!);
    console.log(quiz?._id !!!!!!!!!!!!!!!!!!!!);
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
      }
      savedQuiz = await updateQuiz(quiz);
    } else {
      savedQuiz = await createQuiz(cid!);
      setQuiz(savedQuiz); // Update state with the new quiz
    }

    const quizIdToUse = qid || savedQuiz._id;
    if (!quizIdToUse) {
      throw new Error("Quiz ID is missing after save.");
    }

    for (const question of questions) {
      if (question._id) {
        await updateQuestion(quizIdToUse,  question);
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


  // const handleDeleteClick = async (questionId: string) => {};

  const handleDeleteClick = async (questionId: string) => {
    try {
      if (questionId) {
        await deleteQuestion(questionId);
      }
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error('Error in deleting the question:', error);
      alert('Failed to delete question. Please try again.');
    }
  }



  const handleAddQuestion = () => {
    const newQuestion = {
      title: 'New Question ',
      type: 'MULTIPLE_CHOICE',
      points: 0,
      questionText: '',
      choices: [{ text: '', isCorrect: false }],
    };
    setQuestions([...questions, newQuestion]);
  };

  console.log("Quiz ID (qid):", qid); // Debug for quzi not found 
  console.log("Course ID (cid):", cid);

  return (
    <div>
      <h1>Quiz Question Editor</h1>
      <hr />
      {questions.map((question, index) => (
        <div key={index} className='card mb-3'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <div className='me-2 flex-grow-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Question Title'
                value={question.title}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].title = e.target.value;
                  setQuestions(updatedQuestions);
                }}
              />
            </div>

            <div id='wd-css-styling-dropdowns' className='me-2'>
              <select
                className='form-select'
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
                  const newType = e.target.value as 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
                
                  updatedQuestions[index] = {
                    ...updatedQuestions[index],
                    type: newType,
                    // Initialize type-specific fields
                    ...(newType === 'multiple-choice' && {
                      options: ['Option 1', 'Option 2'], // Default options
                      answers: [], // Default answers
                      description: '', // Default description
                    }),
                    ...(newType === 'true-false' && {
                      text: '', // Default question text
                      answers: ['false'], // Default answer
                    }),
                    ...(newType === 'fill-in-the-blank' && {
                      description: '', // Default description
                      answers: [''], // Default blank answer
                    }),
                  };
                
                  setQuestions(updatedQuestions);
                }}
                
              >
                <option value='multiple-choice'>Multiple choice</option>
                <option value='true-false'>True/False</option>
                <option value='fill-in-the-blank'>Fill in the blanks</option>
              </select>
            </div>

            <div className='d-flex align-items-center'>
              <label htmlFor='points' className='form-label mb-0 me-2'>
                <strong>pts:</strong>
              </label>
              <input
                id='question-point'
                type='number'
                className='form-control d-inline-block w-auto'
                placeholder='0'
                value={question.points}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].points = Number(e.target.value);
                  setQuestions(updatedQuestions);
                }}
                min='0'
                step='1'
              />
              <div className='ms-3'>
                <FaTrash
                  className='text-danger'
                  onClick={() => handleDeleteClick(question._id)}
                />
              </div>
            </div>
          </div>
          <div className='card-body'>{renderEditor(question, index)}</div>
          <div className='d-flex justify-content-start m-3'>
            <button type='button' className='btn btn-secondary me-2'>
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => handleSaveChanges(question._id)} 
            >
              Update Question
            </button>
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-secondary me-2'
          onClick={handleAddQuestion}
        >
          + New Question
        </button>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button className='btn btn-secondary me-2' onClick={handleCancel}>
          Cancel
        </button>
        <button className='btn btn-danger' onClick={handleSaveQuiz}>
          Save
        </button>
      </div>
    </div>
  );
}


