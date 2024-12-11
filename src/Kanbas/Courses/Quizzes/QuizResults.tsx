// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import * as questionClient from './QuestionClient';
// import * as answerClient from './AnswerClient';
// import * as quizClient from './client';
// import './style.css';
// import { useSelector } from 'react-redux';
// import { createSelector } from 'reselect';

// interface Question {
//   title: string;
//   _id: string;
//   text: string;
//   points: number;
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
//   options?: string[];
//   answers: string[];
// }

// interface Answer {
//   questionId: string;
//   answer: string;
// }

// interface Quiz {
//   title: string;
// }

// const fetchAnswersForQuiz = async (userId: string, quizId: string) => {
//   const response = await answerClient.fetchAllAnswersForQuiz(userId, quizId);
//   return response;
// };

// // Memoized selector example
// const selectCurrentUser = createSelector(
//   (state: any) => state.accountReducer,
//   (accountReducer) => accountReducer.currentUser
// );

// export default function QuizResults() {
//   const { cid, qid } = useParams<{ cid: string; qid: string }>();
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
//   const [score, setScore] = useState<number>(0);
//   const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
//   const currentUser = useSelector(selectCurrentUser);

//   const fetchQuestions = async () => {
//     try {
//       const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
//         qid as string
//       );
//       setQuestions(fetchedQuestions);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const fetchQuizDetails = async () => {
//     try {
//       const fetchedQuizDetails = await quizClient.findQuiz(
//         cid as string,
//         qid as string
//       );
//       setQuizDetails(fetchedQuizDetails);
//     } catch (error) {
//       console.error('Error fetching quiz details:', error);
//     }
//   };

//   const fetchUserAnswers = async () => {
//     try {
//       const answers = await fetchAnswersForQuiz(currentUser?._id, qid as string);
//       setUserAnswers(answers);
//     } catch (error) {
//       console.error('Error fetching user answers:', error);
//     }
//   };

//   useEffect(() => {
//     console.log(qid + 'CID: ' + cid);
//     fetchQuestions();
//     fetchQuizDetails();
//     fetchUserAnswers();
//   }, [qid]);

//   useEffect(() => {
//     if (questions.length > 0 && userAnswers.length > 0) {
//       calculateScore();
//     }
//   }, [questions, userAnswers]);

//   const calculateScore = () => {
//     let newScore = 0;
//     questions.forEach((question: Question) => {
//       const userAnswer = userAnswers.find(
//         (answer: Answer) => answer.questionId === question._id
//       );
//       if (userAnswer && userAnswer.answer === question.answers[0]) {
//         newScore += question.points;
//       }
//     });
//     setScore(newScore);
//   };

//   return (
//     <div className='container'>
//       <h2 className='quiz-title'>{quizDetails?.title}</h2>
//       <h3 className='score'>Your Score: {score}</h3>
//       {questions.map((question: Question) => {
//         const userAnswer = userAnswers.find(
//           (answer: Answer) => answer.questionId === question._id
//         );
//         const isCorrect = userAnswer?.answer === question.answers[0];
//         return (
//           <div key={question._id} className='question'>
//             <h3>{question.title}</h3>
//             <p>{question.text}</p>
//             {question.type === 'multiple-choice' ? (
//               <ul>
//                 {question.options?.map(option => (
//                   <li key={option}>
//                     <label>
//                       <input
//                         type='radio'
//                         name={question._id}
//                         value={option}
//                         checked={userAnswer?.answer === option}
//                         readOnly
//                       />
//                       {option}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             ) : question.type === 'fill-in-the-blank' ? (
//               <input type='text' value={userAnswer?.answer || ''} readOnly />
//             ) : (
//               <ul>
//                 {['True', 'False'].map(option => (
//                   <li key={option}>
//                     <label>
//                       <input
//                         type='radio'
//                         name={question._id}
//                         value={option}
//                         checked={userAnswer?.answer === option}
//                         readOnly
//                       />
//                       {option}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <p className='answer-result'>
//               Your Answer: {userAnswer?.answer} <br />
//               {isCorrect
//                 ? 'Correct!'
//                 : `Correct Answer: ${question.answers[0]}`}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import * as questionClient from './QuestionClient'
// import * as answerClient from './AnswerClient'
// import * as quizClient from './client'
// import './style.css'
// import { useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

// interface Question {
//   title: string
//   _id: string
//   text: string
//   points: number
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
//   options?: string[]
//   answers: string[]
// }

// interface Answer {
//   questionId: string
//   answer: string
//   score: Number
// }

// interface Quiz {
//   title: string
// }

// const fetchAnswersForQuiz = async (userId: string, quizId: string) => {
//   const response = await answerClient.fetchAllAnswersForQuiz(userId, quizId)
//   return response
// }

// // Memoized selector example
// const selectCurrentUser = createSelector(
//   (state: any) => state.accountReducer,
//   accountReducer => accountReducer.currentUser
// )

// export default function QuizResults () {
//   const { cid, qid } = useParams<{ cid: string; qid: string }>()
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [userAnswers, setUserAnswers] = useState<Answer[]>([])
//   const [score, setScore] = useState<number>(0)
//   const [quizDetails, setQuizDetails] = useState<Quiz | null>(null)
//   const currentUser = useSelector(selectCurrentUser)

//   const fetchQuestions = async () => {
//     try {
//       const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
//         qid as string
//       )
//       setQuestions(fetchedQuestions)
//     } catch (error) {
//       console.error('Error fetching questions:', error)
//     }
//   }

//   const fetchQuizDetails = async () => {
//     try {
//       const fetchedQuizDetails = await quizClient.findQuiz(
//         cid as string,
//         qid as string
//       )
//       setQuizDetails(fetchedQuizDetails)
//     } catch (error) {
//       console.error('Error fetching quiz details:', error)
//     }
//   }

//   const fetchUserAnswers = async () => {
//     try {
//       const answers = await answerClient.fetchAllAnswersForQuiz(
//         currentUser?._id,
//         qid as string
//       )
//       console.log('ANS:' + answers[0])
//       setUserAnswers(answers)
//     } catch (error) {
//       console.error('Error fetching user answers:', error)
//     }
//   }

//   useEffect(() => {
//     console.log(qid + 'CID: ' + cid)
//     fetchQuestions()
//     fetchQuizDetails()
//     fetchUserAnswers()
//   }, [qid])

//   const calculateScore = () => {
//     let newScore = 0
//     questions.forEach((question: Question) => {
//       const userAnswer = userAnswers.find(
//         (answer: Answer) => answer.questionId === question._id
//       )
//       console.log("HS" + userAnswers[0].answer)
//       if (userAnswer && userAnswer.answer === question.answers[0]) {
//         newScore += question.points
//       }
//     })
//     setScore(newScore)
//   }
//   useEffect(() => {
//     if (questions.length > 0 && userAnswers.length > 0) {
//       calculateScore()
//     }
//   }, [questions, userAnswers])

//   return (
//     <div className='container mt-4'>
//       <h2 className='quiz-title text-center'>{quizDetails?.title}</h2>
//       <h3 className='score text-center'>Your Score: {score}</h3>
//       {questions.map((question: Question) => {
//         const userAnswer = userAnswers.find(
//           (answer: Answer) => answer.questionId === question._id
//         )
//         const isCorrect = userAnswer?.answer === question.answers[0]
//         return (
//           <div key={question._id} className='card my-3'>
//             <div className='card-header'>
//               <h3>{question.title}</h3>
//             </div>
//             <div className='card-body'>
//               <p>{question.text}</p>
//               {question.type === 'multiple-choice' ? (
//                 <ul className='list-group'>
//                   {question.options?.map(option => (
//                     <li key={option} className='list-group-item'>
//                       <label className='form-check-label'>
//                         <input
//                           type='radio'
//                           name={question._id}
//                           value={option}
//                           checked={userAnswer?.answer === option}
//                           readOnly
//                           className='form-check-input me-2'
//                         />
//                         {option}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               ) : question.type === 'fill-in-the-blank' ? (
//                 <input
//                   type='text'
//                   value={userAnswer?.answer || ''}
//                   readOnly
//                   className='form-control'
//                 />
//               ) : (
//                 <ul className='list-group'>
//                   {['True', 'False'].map(option => (
//                     <li key={option} className='list-group-item'>
//                       <label className='form-check-label'>
//                         <input
//                           type='radio'
//                           name={question._id}
//                           value={option}
//                           checked={userAnswer?.answer === option}
//                           readOnly
//                           className='form-check-input me-2'
//                         />
//                         {option}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <p className='mt-3'>
//                 Your Answer: {userAnswer?.answer} <br />
//                 {isCorrect ? (
//                   <span className='text-success'>Correct!</span>
//                 ) : (
//                   <span className='text-danger'>
//                     Correct Answer: {question.answers[0]}
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as questionClient from './QuestionClient'
import * as answerClient from './AnswerClient'
import * as quizClient from './client'
import './style.css'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

interface Question {
  title: string
  _id: string
  text: string
  points: number
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
  options?: string[]
  answers: string[]
}

interface Answer {
  questionId: string
  answers: string
  score: Number
  quizId: string
}

interface Quiz {
  title: string
}

const fetchAnswerForQuestion = async (userId: string, questionId: string) => {
  const response = await answerClient.fetchAnswer(userId, questionId)
  return response
}

// Memoized selector example
const selectCurrentUser = createSelector(
  (state: any) => state.accountReducer,
  accountReducer => accountReducer.currentUser
)

export default function QuizResults () {
  const { cid, qid } = useParams<{ cid: string; qid: string }>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState<number>(0)
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null)
  const currentUser = useSelector(selectCurrentUser)

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
        qid as string
      )
      setQuestions(fetchedQuestions)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  const fetchQuizDetails = async () => {
    try {
      const fetchedQuizDetails = await quizClient.findQuiz(
        cid as string,
        qid as string
      )
      setQuizDetails(fetchedQuizDetails)
    } catch (error) {
      console.error('Error fetching quiz details:', error)
    }
  }

  const fetchUserAnswers = async () => {
    try {
      const answers = await Promise.all(
        questions.map(async question => {
          const answer = await fetchAnswerForQuestion(
            currentUser?._id,
            question._id
          )
          console.log('in fetchUserAnswers ' + answer.answers)
          return { ...answer, questionId: question._id }
        })
      )
      setUserAnswers(answers)
    } catch (error) {
      console.error('Error fetching user answers:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchQuizDetails()
  }, [qid])

  useEffect(() => {
    if (questions.length > 0) {
      fetchUserAnswers()
    }
  }, [questions])

  const calculateScore = () => {
    let newScore = 0
    questions.forEach((question: Question) => {
      const userAnswer = userAnswers.find(
        (answer: Answer) => answer.questionId === question._id
      )
      if (userAnswer && userAnswer.answers === question.answers[0]) {
        newScore += question.points
      }
    })
    setScore(newScore)
  }

  useEffect(() => {
    if (questions.length > 0 && userAnswers.length > 0) {
      calculateScore()
    }
  }, [questions, userAnswers])

  return (
    <div className='container mt-4'>
      <h2 className='quiz-title text-center'>{quizDetails?.title}</h2>
      <h3 className='score text-center'>Your Score: {score}</h3>
      {questions.map((question: Question) => {
        const userAnswer = userAnswers.find(
          (answer: Answer) => answer.questionId === question._id
        )
        console.log('USERANSWER: ' + userAnswer?.answers)
        const isCorrect = userAnswer?.answers === question.answers[0]

        return (
          <div key={question._id} className='card my-3'>
            <div className='card-header'>
              <h3>{question.title}</h3>
            </div>
            <div className='card-body'>
              <p>{question.text}</p>
              {question.type === 'multiple-choice' ? (
                <ul className='list-group'>
                  {question.options?.map(option => (
                    <li key={option} className='list-group-item'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          name={question._id}
                          value={option}
                          checked={userAnswer?.answers === option}
                          readOnly
                          className='form-check-input me-2'
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : question.type === 'fill-in-the-blank' ? (
                <input
                  type='text'
                  value={userAnswer?.answers || ''}
                  readOnly
                  className='form-control'
                />
              ) : (
                <ul className='list-group'>
                  {['True', 'False'].map(option => (
                    <li key={option} className='list-group-item'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          name={question._id}
                          value={option}
                          checked={userAnswer?.answers === option}
                          readOnly
                          className='form-check-input me-2'
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <p className='mt-3'>
                Your Answer: {userAnswer?.answers} <br />
                {isCorrect ? (
                  <span className='text-success'>Correct!</span>
                ) : (
                  <span className='text-danger'>
                    Correct Answer: {question.answers[0]}
                  </span>
                )}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
