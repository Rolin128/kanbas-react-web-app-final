// import { useParams } from 'react-router';
// import FillInTheBlanksEditor from './FillInTheBlanksEditor';
// import { useState } from 'react';
// import MCEditor from './MultipleChoiceEditor';
// import TFEditor from './TrueFalseEditor';
// import { FaTrash } from 'react-icons/fa';
// import { Navigate } from 'react-router-dom';
// import {updateQuiz, createQuiz, updateQuestion, createQuestion, deleteQuestion}  from "../client";

// interface Question {
//   title: string;
//   _id: string;
//   text: string;
//   points: number;
//   description: string;
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
//   options?: string[];
//   answers: string[];
// }

// interface Quiz {
//   _id: string;
//   points: number;
// }

// export default function QuestionEditor() {
//   const { cid } = useParams();
//   const { qid } = useParams<{ qid: string }>();
//   const [questions, setQuestions] = useState<any[]>([]);
//   // const [questions, setQuestions] = useState<Question[]>(

//   const [quiz, setQuiz] = useState<Quiz | null>(null);

//   const renderEditor = (question: Question, index: number) => {
//     const handleEditorChange = (updatedQuestion: Question) => {
//       const updatedQuestions = [...questions];
//       updatedQuestions[index] = updatedQuestion;
//       setQuestions(updatedQuestions);
//     };

//     switch (question.type) {
//       case 'multiple-choice':
//         return <MCEditor question={question} onChange={handleEditorChange} />;
//       case 'true-false':
//         return <TFEditor question={question} onChange={handleEditorChange} />;
//       case 'fill-in-the-blank':
//         return (
//           <FillInTheBlanksEditor
//             question={question}
//             onChange={handleEditorChange}
//           />
//         );
//       default:
//         return <MCEditor question={question} onChange={handleEditorChange} />;
//     }
//   };

//   // TODO: 下面这些还需要补充完成才能传输数据
//   const handleSaveChanges = async () => {
//   };

// //   const handleSaveQuiz = async () => {
// //     try {
// //         let savedQuiz;
// //         if (qid) {
// //             savedQuiz = await updateQuiz(quiz);
// //         } else {
// //             savedQuiz = await createQuiz(cid!);
// //         }

// //         const quizIdToUse = qid || savedQuiz._id;

// //         // Save or update each question
// //         for (const question of questions) {
// //             if (question._id) {
// //                 await updateQuestion(quizIdToUse, question._id, question);
// //             } else {
// //                 await createQuestion(quizIdToUse, question);
// //             }
// //         }

// //         alert('Quiz and questions saved successfully!');
// //     } catch (error) {
// //         console.error('Error saving quiz:', error);
// //         alert('Failed to save quiz');
// //     }
// // };

// const handleSaveQuiz = async () => {
//   try {
//     if (!quiz) {
//       throw new Error("Quiz object is not initialized.");
//     }

//     let savedQuiz;
//     if (qid) {
//       // Check if the quiz has a valid `_id` before updating
//       if (!quiz._id) {
//         throw new Error("Quiz ID is missing.");
//       }
//       savedQuiz = await updateQuiz(quiz);
//     } else {
//       savedQuiz = await createQuiz(cid!);
//       setQuiz(savedQuiz); // Update state with the new quiz
//     }

//     const quizIdToUse = qid || savedQuiz._id;
//     if (!quizIdToUse) {
//       throw new Error("Quiz ID is missing after save.");
//     }

//     for (const question of questions) {
//       if (question._id) {
//         await updateQuestion(quizIdToUse, question._id, question);
//       } else {
//         await createQuestion(quizIdToUse, question);
//       }
//     }

//     alert("Quiz and questions saved successfully!");
//   } catch (error) {
//     console.error("Error saving quiz:", error);
//     alert(`Failed to save quiz: ${error}`);
//   }
// };


//   const handleCancel = async () => {};


//   // const handleDeleteClick = async (questionId: string) => {};

//   const handleDeleteClick = async (questionId: string) => {
//     try {
//       if (questionId) {
//         await deleteQuestion(questionId);
//       }
//       setQuestions(questions.filter(question => question._id !== questionId));
//     } catch (error) {
//       console.error('Error in deleting the question:', error);
//       alert('Failed to delete question. Please try again.');
//     }
//   }



//   const handleAddQuestion = () => {
//     const newQuestion = {
//       title: 'Unnamed Quiz',
//       type: 'MULTIPLE_CHOICE',
//       points: 0,
//       questionText: '',
//       choices: [{ text: '', isCorrect: false }],
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   return (
//     <div>
//       <h1>Quiz Question Editor</h1>
//       <hr />
//       {questions.map((question, index) => (
//         <div key={index} className='card mb-3'>
//           <div className='card-header d-flex align-items-center justify-content-between'>
//             <div className='me-2 flex-grow-1'>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Question Title'
//                 value={question.title}
//                 onChange={(e) => {
//                   const updatedQuestions = [...questions];
//                   updatedQuestions[index].title = e.target.value;
//                   setQuestions(updatedQuestions);
//                 }}
//               />
//             </div>

//             <div id='wd-css-styling-dropdowns' className='me-2'>
//               <select
//                 className='form-select'
//                 value={question.type}
//                 onChange={(e) => {
//                   const updatedQuestions = [...questions];
//                   updatedQuestions[index].type = e.target.value as
//                     | 'multiple-choice'
//                     | 'fill-in-the-blank'
//                     | 'true-false';
//                   setQuestions(updatedQuestions);
//                 }}
//               >
//                 <option value='multiple-choice'>Multiple choice</option>
//                 <option value='true-false'>True/False</option>
//                 <option value='fill-in-the-blank'>Fill in the blanks</option>
//               </select>
//             </div>

//             <div className='d-flex align-items-center'>
//               <label htmlFor='points' className='form-label mb-0 me-2'>
//                 <strong>pts:</strong>
//               </label>
//               <input
//                 id='question-point'
//                 type='number'
//                 className='form-control d-inline-block w-auto'
//                 placeholder='0'
//                 value={question.points}
//                 onChange={(e) => {
//                   const updatedQuestions = [...questions];
//                   updatedQuestions[index].points = Number(e.target.value);
//                   setQuestions(updatedQuestions);
//                 }}
//                 min='0'
//                 step='1'
//               />
//               <div className='ms-3'>
//                 <FaTrash
//                   className='text-danger'
//                   onClick={() => handleDeleteClick(question._id)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className='card-body'>{renderEditor(question, index)}</div>
//           <div className='d-flex justify-content-start m-3'>
//             <button type='button' className='btn btn-secondary me-2'>
//               Cancel
//             </button>
//             <button
//               type='button'
//               className='btn btn-danger'
//               onClick={handleSaveChanges}
//             >
//               Update Question
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-secondary me-2'
//           onClick={handleAddQuestion}
//         >
//           + New Question
//         </button>
//       </div>
//       <div className='d-flex justify-content-end mt-3'>
//         <button className='btn btn-secondary me-2' onClick={handleCancel}>
//           Cancel
//         </button>
//         <button className='btn btn-danger' onClick={handleSaveQuiz}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import FillInTheBlanksEditor from './FillInTheBlanksEditor';
import MCEditor from './MultipleChoiceEditor';
import TFEditor from './TrueFalseEditor';
import {findQuizById, updateQuiz, createQuiz, updateQuestion, createQuestion, deleteQuestion, findAllQuestionsByQuizId}  from "../client";
import { useParams } from 'react-router';
import { IoTrashOutline } from "react-icons/io5";

interface Que {
  title: string;
  _id: string;
  text: string;
  points: number;
  description: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank';
  options?: string[];
  answers: string[];
}

interface Quiz {
  _id: string;
  points: number;
}

export default function QuizQuestionEditor() {
  const { cid } = useParams();
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<Que[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  //   //   // 下面这堆question是用来看效果的，将来需要删掉
//   //   [
//   //     {
//   //       title: "Question 1",
//   //       _id: "q1",
//   //       text: "What is the capital of France?",
//   //       points: 10,
//   //       description: "A geography question",
//   //       type: "multiple-choice",
//   //       options: ["Paris", "London", "Berlin", "Madrid"],
//   //       answers: ["Paris"],
//   //     },
//   //     {
//   //       title: "Question 2",
//   //       _id: "q2",
//   //       text: "The earth is flat.",
//   //       points: 5,
//   //       description: "A true/false question",
//   //       type: "true-false",
//   //       answers: ["false"],
//   //     },
//   //     {
//   //       title: "Question 3",
//   //       _id: "q3",
//   //       text: "Fill in the blank: The sky is ___ during the day.",
//   //       points: 8,
//   //       description: "A fill-in-the-blank question",
//   //       type: "fill-in-the-blank",
//   //       answers: ["blue"],
//   //     },
//   //   ]
//   // );

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await findAllQuestionsByQuizId(
          qid as string);
        setQuestions(fetchedQuestion);
      } catch (error) {
        console.error('Error in fetching question:', error);
      }
    }


    // debug: quzi is not intialized
    const fetchQuiz = async () => {
      try {
        console.log(`Fetching quiz with ID: ${qid}`);
        const fetchedQuiz = await findQuizById(qid as string);
        console.log("Fetched quiz:", fetchedQuiz);
    
        if (!fetchedQuiz) {
          console.error("No quiz found, initializing a new quiz.");
          setQuiz({ _id: "", points: 0 }); // Initialize new quiz
        } else {
          setQuiz(fetchedQuiz);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setQuiz({ _id: "", points: 0 }); // Fallback to a new quiz
      }
    };
    
    fetchQuestion()
    fetchQuiz()
  }, [qid]);

  // Save Quzi

  const handleSaveQuiz = async () => {
    console.log(qid !!!!!!!);
    console.log(quiz?._id !!!!!!!!!!!!!!!!!!!!);
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
        await updateQuestion(quizIdToUse, question);
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

  const renderEditor = (question: Que, index: number) => {
    const handleEditorChange = (updatedQuestion: Que) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    }

    switch (question.type) {
      case 'multiple-choice':
        return < MCEditor question={question} onChange={handleEditorChange} />

      case 'fill-in-the-blank':
        return (
          <FillInTheBlanksEditor
            question={question}
            onChange={handleEditorChange} />)

      case 'true-false':
        return <TFEditor question={question} onChange={handleEditorChange} />

      default:
        return <MCEditor question={question} onChange={handleEditorChange} />
    }
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        _id: '',
        text: '',
        points: 0,
        description: '',
        type: 'multiple-choice',
        answers: []
      }])
  }

  const handleSaveChanges = async () => {
    const fetchedQuestion = await findAllQuestionsByQuizId(
      qid as string);
    setQuestions(fetchedQuestion);
    try {
      for (const question of questions) {
        if (question._id) {
          await updateQuestion(qid as string,  question);
        } else {
          await createQuestion(qid as string, question)
        }
      }

      const fetchedQuestion = await findAllQuestionsByQuizId(
        qid as string);
      setQuestions(fetchedQuestion);

      const totalPoints = questions.reduce(
        (acc, question) => acc + question.points, 0)
      if (quiz) {
        await updateQuiz({
          ...quiz,
          points: totalPoints
        });
      }
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error in saving the changes:', error);
    }
  }

  const handleDeleteClick = async (_id: string) => {
    try {
      if (_id) {
        await deleteQuestion(_id);
      }
      setQuestions(questions.filter(question => question._id !== _id));
    } catch (error) {
      console.error('Error in deleting the question:', error);
      alert('Failed to delete question. Please try again.');
    }
  }

  if (questions.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <button className='btn btn-danger mb-2' type='button'
          onClick={handleAddQuestion} >
          + Add Question </button>
      </div>)
  }
  console.log("Quiz ID (qid):", qid); // Debug for quzi not found 
  console.log("Course ID (cid):", cid);


  return (
    <div><br />
      <h1>Quiz Question Editor</h1>
      <hr /><br />
      {questions.map((question, index) => (
        <div key={index} className='card mb-4'>
          <div className='card-header align-items-center d-flex'>
            <div className=' flex-grow-1 me-4'>
              <input className='form-control' placeholder='Question Title'
                type='text' value={question.title}
                onChange={e => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].title = e.target.value;
                  setQuestions(updatedQuestions);
                }} />
            </div>

            <div id='wd-css-style-dropdowns' className='me-2'>
              <select className='form-select'
                value={question.type}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].type = e.target.value as
                    | 'multiple-choice'
                    | 'true-false'
                    | 'fill-in-the-blank'
                  setQuestions(updatedQuestions)
                }} >
                <option value='multiple-choice'>Multiple choice</option>
                <option value='fill-in-the-blank'>Fill in the blanks</option>
                <option value='true-false'>True/False</option>
              </select>
            </div>

            <div className=' d-flex align-items-center'>
              <label htmlFor='points' className='form-label me-2 mb-0 '>
                <h6>pts:</h6>  </label>

              <input style={{ height: '40px'  }} className='form-control w-auto d-inline-block' id='question-points'
                type='number' placeholder='0'
                value={question.points}
                onChange={e => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].points = Number(e.target.value);
                  setQuestions(updatedQuestions);
                }}
                min='0' step='1' />

              <div className='ms-3'
                style={{ padding: '20px 30px', fontSize: '1.4rem' }}>
                <IoTrashOutline
                  className='text-danger'
                  onClick={() => handleDeleteClick(question._id)} /> </div>
            </div>
          </div>

          <div className='card-body'>{renderEditor(question, index)}</div>
          <div className='d-flex justify-content-center m-3'>
            <button type='button' className='btn btn-secondary me-3'
              onClick={() => handleDeleteClick(question._id)} >
              Cancel </button>
            <button
              type='button' className='btn btn-primary'
              onClick={handleSaveChanges} >
              Save Question </button>
          </div>  </div>))}

      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-primary mb-2'
          onClick={handleAddQuestion} >
          + Add Question </button>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button className='btn btn-secondary me-2' onClick={handleCancel}>
          Cancel
        </button>
        <button className='btn btn-danger' onClick={handleSaveQuiz}>
          Save
        </button>
      </div>
    </div>   )
}