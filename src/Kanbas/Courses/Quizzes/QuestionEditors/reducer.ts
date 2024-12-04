import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
            state.questions = [...state.questions, question] as any;
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((m: any) =>
                m._id === question._id ? question : m
            ) as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter((m: any) => m._id !== questionId);
        },
        editQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.map((m: any) =>
                m._id === questionId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const { setQuestions, addQuestion, updateQuestion, editQuestion, deleteQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;