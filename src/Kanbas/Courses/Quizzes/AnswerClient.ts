
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

export const createAnswer = async (questionId: string, answer: any) => {
    const response = await axios.post(`${ANSWERS_API}/${questionId}/answers`, answer);
    return response.data;
  
};

export const updateAnswer = async (answer: any, questionId: string, userId: string) => {
    try {
    console.log("updating: " + questionId + ", userId: " + userId)
    const response = await axios.put(`${ANSWERS_API}/${userId}/${questionId}/stored`, answer);
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};

export const fetchAnswer = async (userId: string, questionId: string) => {
    try {
      console.log("User ID in findAnswer client:" + userId)
    const response = await axios.get(`${ANSWERS_API}/${userId}/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};

export const fetchAnswersForQuiz = async (userId: string, quizId: string) => {
  const response = await axios.get(`${ANSWERS_API}/${userId}/quiz/${quizId}`);
  return response.data;
};