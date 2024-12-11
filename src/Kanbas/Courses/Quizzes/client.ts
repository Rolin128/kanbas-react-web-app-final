import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Update an existing quiz
export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Fetch a quiz by its ID
export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Fetch a quiz by its courseId and quizId
export const findQuiz = async (courseId: string, quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/Quizzes/${quizId}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching quiz details: " + error.message);
  }
};

// Creata question
export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

export const updateQuestion = async (questionId: string, questionData: string) => {
  console.log("Payload sent to backend:", questionData); // Debug payload
  const response = await axios.put(`${QUESTIONS_API}/${questionId}`, questionData);
  console.log("Response from backend:", response.data); // Debug backend response
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Find all questions for a specific quiz
export const findAllQuestionsByQuizId = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

// Attempt a quiz
export const submitAttempt = async (quizId: any, attempt: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/submitAnswers`, attempt);
  return response.data;
};
