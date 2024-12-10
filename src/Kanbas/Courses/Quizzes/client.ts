// import axios from "axios";
// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
// const COURSES_API = `${REMOTE_SERVER}/api/courses`;
// const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;


// export const createQuiz = async (courseId: string) => {
//   const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`);
//   return response.data;
  
// };

// export const updateQuiz = async (quiz: any) => {
//   const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
//   return data;
// };

// export const deleteQuiz = async (quizId: string) => {
//   const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
//   return response.data;
// };

// // export const fetchQuizById = async (quiz: string) => {
// //     try {
// //         const response = await axios.get(`${QUIZZES_API}/${quiz._id}`);
// //         return response.data;
// //     } catch (error) {
// //         console.error("Failed to fetch quiz:", error);
// //         throw error;
// //     }
// // };

// export const findQuizById = async (quizId: string) => {
// 	const response = await axios.get(`${QUIZZES_API}/${quizId}`)
// 	return response.data
// }

// export const findQuiz = async (courseId: string, quizId: string) => {
//   try {
//     const response = await axios.get(`${COURSES_API}/${courseId}/Quizzes/${quizId}`);
//     return response.data;
//   } catch (error: any) {
//     throw new Error("Error fetching quiz details: " + error.message);
//   }
// };


// // Creata question
// export const createQuestion = async (quizId: string, question: any) => {
//   const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
//   return response.data;
// };


// // Update an existing question
// export const updateQuestion = async (questionId: string, questionData: any) => {
//   try {
//       const response = await axios.put(`${QUESTIONS_API}/${questionId}`, questionData);
//       return response.data;
//   } catch (error) {
//       console.error("Failed to update question:", error);
//       throw error;
//   }
// };

// // Delete a question
// export const deleteQuestion = async (questionId: string) => {
//   try {
//       const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
//       return response.data;
//   } catch (error) {
//       console.error("Failed to delete question:", error);
//       throw error;
//   }
// };


// // Find all questions for a specific quiz
// export const findAllQuestionsByQuizId = async (quizId: string) => {
//   const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
//   return response.data;
// };



import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Create a new quiz for a specific course
export const createQuiz = async (courseId: string) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

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
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
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


