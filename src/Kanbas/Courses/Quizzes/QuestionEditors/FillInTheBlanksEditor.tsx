import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import RichTextEditor from "./RichTextEditor";

interface Question {
  _id: string;
  title: string;
  text: string;
  description: string;
  points: number;
  type: "multiple-choice" | "fill-in-the-blank" | "true-false";
  options?: string[];
  answers: string[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface FillInTheBlanksEditorProps {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export default function FillInTheBlanksEditor({ question: initialQuestion, onChange }: FillInTheBlanksEditorProps) {
  const [answers, setAnswers] = useState<Answer[]>(
    initialQuestion.answers.map((answer) => ({
      text: answer,
      isCorrect: true,
    })) || [{ text: "", isCorrect: false }]
  );
  const [questionText, setQuestionText] = useState(initialQuestion.text || "");
  const [points, setPoints] = useState(initialQuestion.points || 0);
  const [description, setDescription] = useState(initialQuestion.description || "");

  useEffect(() => {
    const updatedQuestion = {
      ...initialQuestion,
      text: questionText,
      points,
      description,
      answers: answers.map((answer) => answer.text),
    };
    onChange(updatedQuestion);
  }, [questionText, points, description, answers]);

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(e.target.value));
  };

  const handleAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { text: "", isCorrect: false }]);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleEditorChange = (value: string) => {
    setDescription(value);
  };

  return (
    <div>
      <p>
        Enter your question text, then define all possible correct answers for the blank. Students will see the
        questions followed by a small text box to type their answer.
      </p>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          <strong>Description</strong>
        </label>
        <RichTextEditor value={description} onChange={handleEditorChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Answers:</label>
        {answers.map((answer, index) => (
          <div key={index} className="input-group mb-2">
            <span className="input-group-text">
              {answer.isCorrect ? <span className="text-success">Correct Answer</span> : "Possible Answer"}
            </span>
            <input
              type="text"
              className="form-control"
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e)}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => removeAnswer(index)}>
              <FaTrash />
            </button>
          </div>
        ))}

        <div className="d-flex justify-content-end">
          <button type="button" className="btn text-danger border-0" onClick={addAnswer}>
            + Add Another Answer
          </button>
        </div>
      </div>
    </div>
  );
}
