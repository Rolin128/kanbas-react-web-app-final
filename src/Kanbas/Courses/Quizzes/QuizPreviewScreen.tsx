import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as questionClient from "./QuestionClient";
import * as answerClient from "./AnswerClient";
import * as quizClient from "./client";
import { setQuestions as setQuestionsAction } from "./QuestionsReducer";
import { addAnswer, updateAnswer } from "./AnswerReducer";
import "./style.css";
import { RiH3 } from "react-icons/ri";

interface Question {
  title: string;
  _id: string;
  text: string;
  points: number;
  questionType: "multiple-choice" | "fill-in-the-blank" | "true-false";
  options?: string[];
  answers: string[];
}

interface Answers {
  [key: string]: string;
}

// interface Quiz {
//   title: string;
//   multipleAttempts: boolean;
//   maxAttempts: number;
//   attemptsLeft: number;
// }
interface Quiz {
  title: string;
  multipleAttempts: boolean;
  attempts: number;
}

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState<number | null>(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
  const [submitCount, setSubmitCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(660);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [highestScoreAnswers, setHighestScoreAnswers] = useState<Answers>({});
  const [incorrectAnswers, setIncorrectAnswers] = useState<{
    [key: string]: string;
  }>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const questions = useSelector((state: any) =>
    state.questionsReducer.questions.filter((question: any) => question.quiz === qid)
  );

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await questionClient.findAllQuestionsByQuizIdNoPtsMapping(qid as string);
      const questionsWithOptions = fetchedQuestions.map((question: Question) => {
        if (question.questionType === "true-false" && (!question.options || question.options.length === 0)) {
          return { ...question, options: ["True", "False"] };
        }
        return question;
      });
      dispatch(setQuestionsAction(questionsWithOptions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const fetchedQuizDetails = await quizClient.findQuiz(cid as string, qid as string);
      setQuizDetails(fetchedQuizDetails);
      if (fetchedQuizDetails.multipleAttempts) {
        const savedAttemptsLeft = localStorage.getItem(`quiz-${qid}-attemptsLeft`);
        setAttemptsLeft(savedAttemptsLeft ? parseInt(savedAttemptsLeft) : fetchedQuizDetails.attempts);
      } else {
        setAttemptsLeft(1);
        localStorage.setItem(`quiz-${qid}-attemptsLeft`, "1");
      }
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
  };

  // const fetchQuizDetails = async () => {
  //   try {
  //     const fetchedQuizDetails = await quizClient.findQuiz(cid as string, qid as string);
  //     setQuizDetails(fetchedQuizDetails);
  //     if (fetchedQuizDetails.multipleAttempts) {
  //       // TODO: ???
  //       // const savedAttemptsLeft: string | null = localStorage.getItem(`quiz-${qid}-attemptsLeft`);
  //       // const savedAttemptsLeftInt: number = parseInt(savedAttemptsLeft || "0");
  //       // const validAttemptsLeft = savedAttemptsLeftInt > 0 ? savedAttemptsLeftInt : 0;
  //       // console.log("savedAttemptsLeft int " + validAttemptsLeft);
  //       // const attemptsLeft = fetchedQuizDetails.attemptsLeft;
  //       // UNTIL HERE
  //       setAttemptsLeft(fetchedQuizDetails.attempts);
  //     } else {
  //       setAttemptsLeft(1);
  //       // localStorage.setItem(`quiz-${qid}-attemptsLeft`, "1");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching quiz details:", error);
  //   }
  // };

  useEffect(() => {
    fetchQuestions();
    fetchQuizDetails();
  }, [qid]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setTimer(timerInterval);
      return () => clearInterval(timerInterval);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    console.log(">>>123");
    let newScore = 0;
    const incorrect: string[] = [];
    const incorrectAns: { [key: string]: string } = {};
    const answerDataArray: any[] = [];
    console.log(">>>", questions);

    questions.forEach((question: Question) => {
      console.log(">>>>question points:" + question.points);
      if (answers[question._id] === question.answers[0]) {
        newScore += question.points;
      } else {
        incorrect.push(question._id);
        incorrectAns[question._id] = answers[question._id];
      }
      const answerData = {
        userId: currentUser?._id,
        quizId: qid as string,
        questionId: question._id,
        answer: answers[question._id],
        score: newScore,
        attemptNumber: submitCount + 1,
        submittedAt: new Date(),
      };
      console.log("Answer Data:", answerData);

      answerDataArray.push(answerData);
    });

    try {
      for (const answerData of answerDataArray) {
        try {
          const existingAnswer = await answerClient.fetchAnswer(answerData.userId, answerData.questionId);
          if (existingAnswer) {
            console.log("Updating answers: " + answerData);
            await answerClient.updateAnswer(answerData, answerData.questionId, currentUser._id);
            dispatch(updateAnswer(answerData));
          } else {
            await answerClient.createAnswer(answerData.questionId as string, answerData as any);
            dispatch(addAnswer(answerData));
          }
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            await answerClient.createAnswer(answerData.questionId as string, answerData as any);
            dispatch(addAnswer(answerData));
          } else {
            console.error("Error processing answer:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error storing answers:", error);
    }

    setScore(newScore);
    setScores([...scores, newScore]);
    setIncorrectQuestions(incorrect);
    setIncorrectAnswers(incorrectAns);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (newScore > highestScore) {
      setHighestScore(newScore);
      setHighestScoreAnswers(answers);
    }

    // if (quizDetails?.multipleAttempts) {
    //   // setAttemptsLeft((prev) => {
    //   //   const newAttemptsLeft = prev !== null ? prev - 1 : null;
    //   //   localStorage.setItem(`quiz-${qid}-attemptsLeft`, newAttemptsLeft?.toString() || "0");
    //   //   return newAttemptsLeft;
    //   // });
    //   const newAttemptsLeft = quizDetails.attemptsLeft - 1;
    //   setAttemptsLeft(newAttemptsLeft);
    //   const updatedQuiz = {
    //     ...quizDetails,
    //     attemptsLeft: newAttemptsLeft, // Decremented attemptsLeft
    //   };
    //   await quizClient.updateQuiz(updatedQuiz);
    // } else {
    //   setAttemptsLeft(0);
    // }
    if (quizDetails?.multipleAttempts) {
      setAttemptsLeft((prev) => {
        const newAttemptsLeft = prev !== null ? prev - 1 : null;
        localStorage.setItem(`quiz-${qid}-attemptsLeft`, newAttemptsLeft?.toString() || "0");
        return newAttemptsLeft;
      });
    } else {
      setAttemptsLeft(0);
    }

    setSubmitCount((prevCount) => prevCount + 1);
    console.log("Quiz submitted successfully:", answers, "Score:", newScore);

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    setTimeLeft(0); // set the time to view results as 0 so results will immediately show
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setScore(null);
    setIncorrectQuestions([]);
  };

  const getScoreComment = (percentage: number) => {
    if (percentage === 100) {
      return "Perfect score! You're a genius!";
    } else if (percentage >= 75) {
      return "Great job! Almost perfect!";
    } else if (percentage >= 50) {
      return "Not bad! You're getting there!";
    } else if (percentage >= 25) {
      return "You can do better! Keep trying!";
    } else {
      return "Well, at least you tried. Better luck next time!";
    }
  };

  const handleViewResults = () => {
    console.log("Viewing results");
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
  };

  const totalPoints = questions.reduce((acc: number, q: Question) => acc + q.points, 0);
  const percentageScore = score !== null ? (score / totalPoints) * 100 : 0;
  const scoreComment = getScoreComment(percentageScore);

  // useEffect(() => {
  //   if (quizDetails) {
  //     if (!quizDetails.multipleAttempts) {
  //       setAttemptsLeft(1);
  //       setSubmitCount(0);
  //       // localStorage.setItem(`quiz-${qid}-attemptsLeft`, "1");
  //     } else {
  //       // const savedAttemptsLeft = localStorage.getItem(`quiz-${qid}-attemptsLeft`);
  //       // setAttemptsLeft(savedAttemptsLeft ? parseInt(savedAttemptsLeft) : quizDetails.attempts);
  //       setAttemptsLeft(quizDetails.attemptsLeft);
  //     }
  //   }
  // }, [quizDetails?.multipleAttempts]);
  useEffect(() => {
    if (quizDetails) {
      if (!quizDetails.multipleAttempts) {
        setAttemptsLeft(1);
        setSubmitCount(0);
        localStorage.setItem(`quiz-${qid}-attemptsLeft`, "1");
      } else {
        const savedAttemptsLeft = localStorage.getItem(`quiz-${qid}-attemptsLeft`);
        setAttemptsLeft(savedAttemptsLeft ? parseInt(savedAttemptsLeft) : quizDetails.attempts);
        console.log("savedAttemptsLeft: " + savedAttemptsLeft);
        // localStorage.setItem(`quiz-${qid}-attemptsLeft`, quizDetails.attempts.toString());
        // setAttemptsLeft(quizDetails.attempts);
      }
    }
  }, [quizDetails?.multipleAttempts]);

  return (
    <div className="container mt-5">
      {score !== null && (
        <div className="mt-4">
          <div className="card text-center">
            <div className="card-header">
              <h3 className="card-title">Total Score</h3>
            </div>
            <div className="card-body">
              <h1 className="display-4">{score}</h1>
              <p className="card-text">
                You scored {score} points out of a possible {totalPoints}.<br />
              </p>
            </div>
            <div className="card-footer text-muted">{scoreComment}</div>
          </div>
        </div>
      )}
      <h1>
        <b>{quizDetails?.title}</b>
      </h1>
      {submitCount < (quizDetails?.multipleAttempts ? quizDetails.attempts : 1) && timeLeft > 0 && (
        <div className="alert alert-info" role="alert">
          Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </div>
      )}
      {quizDetails?.multipleAttempts ? (
        attemptsLeft !== null && attemptsLeft > 0 ? (
          <div className="alert alert-warning" role="alert">
            This quiz allows multiple attempts. Attempts left: {attemptsLeft}
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            Unable to retake the quiz. You have used all your attempts.
          </div>
        )
      ) : (
        <div className="alert alert-warning" role="alert">
          You are only allowed to take this quiz once.
        </div>
      )}
      {currentUser?.role !== "STUDENT" && (
        <div className="alert alert-info" role="alert">
          This is a preview of the published version of the quiz.
        </div>
      )}
      <h3>
        <b> Quiz Instructions</b>
      </h3>
      {questions.map((question: Question, index: number) => (
        <div
          key={question._id}
          className={`card mb-3 ${incorrectQuestions.includes(question._id) ? "border-danger" : ""}`}
        >
          <div className="card-header d-flex justify-content-between">
            <h5>Question {index + 1}</h5>
            <span>{question.points} pts</span>
          </div>
          <div className="card-body">
            <h6>{question.title}</h6>
            <p>{question.text}</p>
            {question.questionType === "multiple-choice" && (
              <div className="list-group">
                {question.options?.map((option) => (
                  <label key={option} className="list-group-item d-flex align-items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="me-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.questionType === "true-false" && (
              <div className="list-group">
                <label className="list-group-item d-flex align-items-center">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="true"
                    checked={answers[question._id] === "true"}
                    onChange={() => handleAnswerChange(question._id, "true")}
                    className="me-2"
                  />
                  True
                </label>
                <label className="list-group-item d-flex align-items-center">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="false"
                    checked={answers[question._id] === "false"}
                    onChange={() => handleAnswerChange(question._id, "false")}
                    className="me-2"
                  />
                  False
                </label>
              </div>
            )}
            {question.questionType === "fill-in-the-blank" && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between mt-3">
        {currentUser?.role !== "STUDENT" && (
          <button onClick={handleEditQuiz} className="btn btn-secondary">
            Keep Editing This Quiz
          </button>
        )}
        {submitCount >= (quizDetails?.multipleAttempts ? quizDetails.attempts : 1) ? (
          <button className="btn btn-danger view-results-btn" onClick={handleViewResults}>
            View Results
          </button>
        ) : (quizDetails?.multipleAttempts ? submitCount < quizDetails.attempts : submitCount < 1) && timeLeft > 0 ? (
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleRetakeQuiz} className="btn btn-warning" disabled>
            You Can't Retake Quiz (Attempts left: 0)
          </button>
        )}
      </div>
      {submitCount >= (quizDetails?.multipleAttempts ? quizDetails.attempts : 1) && (
        <>
          {scores.length > 0 && (
            <div className="mt-5">
              <h3>Scores for Each Attempt</h3>
              <ul className="list-group">
                {scores.slice(0, submitCount).map((score, index) => (
                  <li key={index} className="list-group-item">
                    Attempt {index + 1}: {score} points
                  </li>
                ))}
              </ul>
            </div>
          )}
          {highestScore > 0 && (
            <div className="mt-5">
              <h3>Highest Score: {highestScore}</h3>
              <ul className="list-group">
                {Object.entries(highestScoreAnswers).map(([questionId, answer]) => (
                  <li key={questionId} className="list-group-item">
                    <strong>Question {questions.findIndex((q: any) => q._id === questionId) + 1}:</strong> {answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Object.keys(incorrectAnswers).length > 0 && (
            <div className="mt-5">
              <h3>Incorrect Answers and Correct Answers:</h3>
              <ul className="list-group">
                {Object.entries(incorrectAnswers).map(([questionId, userAnswer]) => (
                  <li key={questionId} className="list-group-item">
                    <strong>Question {questions.findIndex((q: any) => q._id === questionId) + 1}:</strong> Your answer:{" "}
                    {userAnswer}, Correct answer: {questions.find((q: any) => q._id === questionId)?.answers[0]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
