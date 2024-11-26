import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            state.quizzes = [...state.quizzes, quiz] as any;
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quiz._id ? quiz : m
            ) as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((m: any) => m._id !== quizId);
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quizId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const { setQuizzes,addQuiz,updateQuiz,editQuiz,deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
