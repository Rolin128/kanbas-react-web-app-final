import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
  userId: string;
  quizId: string;
  questionId: string;
  answer: string;
}

interface AnswersState {
  answers: Answer[];
}

const initialState: AnswersState = {
  answers: [],
};

const answersReducer = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswers: (state, action: PayloadAction<Answer[]>) => {
      state.answers = action.payload;
    },
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
    },
    updateAnswer: (
      state,
      action: PayloadAction<{ userId: string; quizId: string; questionId: string; answer: string }>
    ) => {
      const { userId, quizId, questionId, answer } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (ans) =>
          ans.userId === userId &&
          ans.quizId === quizId &&
          ans.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        state.answers[existingAnswerIndex].answer = answer;
      } else {
        state.answers.push({
          userId,
          quizId,
          questionId,
          answer,
        });
      }
    },
    deleteAnswer: (
      state,
      action: PayloadAction<{ userId: string; quizId: string; questionId: string }>
    ) => {
      const { userId, quizId, questionId } = action.payload;
      state.answers = state.answers.filter(
        (ans) =>
          !(ans.userId === userId && ans.quizId === quizId && ans.questionId === questionId)
      );
    },
  },
});

export const { setAnswers, addAnswer, updateAnswer, deleteAnswer } = answersReducer.actions;

export default answersReducer.reducer;
