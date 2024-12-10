import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [] as any[],
};

const questionsReducer = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestions: (state, { payload: question }) => {
      state.questions.push(question);
    },
    deleteQuestions: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q) => q.id !== questionId
      );
    },
    updateQuestions: (state, { payload: updatedQuestion }) => {
      const index = state.questions.findIndex((q) => q.id === updatedQuestion.id);
      if (index !== -1) {
        state.questions[index] = updatedQuestion;
      }
    },
  },
});

export const { addQuestions, deleteQuestions, updateQuestions, setQuestions } =
  questionsReducer.actions;
export default questionsReducer.reducer;
