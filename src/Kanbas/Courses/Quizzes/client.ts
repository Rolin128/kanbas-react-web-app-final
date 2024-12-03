import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const createQuiz = async (courseId: string) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
  
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
// export const fetchQuizById = async (quiz: string) => {
//     try {
//         const response = await axios.get(`${QUIZZES_API}/${quiz._id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch quiz:", error);
//         throw error;
//     }
// };

export const findQuiz = async (courseId: string, quizId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/Quizzes/${quizId}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching quiz details: " + error.message);
  }
};


// Create a new question for a specific quiz
export const createQuestion = async (quizId: string, questionData: any) => {
  try {
      const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, questionData);
      return response.data;
  } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
  }
};

// Update an existing question
export const updateQuestion = async (quizId: string, questionId: string, questionData: any) => {
  try {
      const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, questionData);
      return response.data;
  } catch (error) {
      console.error("Failed to update question:", error);
      throw error;
  }
};

