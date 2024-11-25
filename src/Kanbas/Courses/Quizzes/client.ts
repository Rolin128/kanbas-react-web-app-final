import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const { data } = await axios.put(
        `${QUIZZES_API}/${quiz._id}`,
        quiz
    );
    return data;
};
export const fetchQuizById = async (quizId: string) => {
    try {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch quiz:", error);
        throw error;
    }
};