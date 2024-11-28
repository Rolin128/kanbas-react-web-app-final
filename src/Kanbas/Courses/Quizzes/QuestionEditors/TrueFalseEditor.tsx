import React, { useState, useEffect } from "react";
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

interface TFEditorProps {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export default function TFEditor({ question: initialQuestion, onChange }: TFEditorProps) {
  const [editorValue, setEditorValue] = useState("");
  const [description, setDescription] = useState(initialQuestion.description || "");
  const [answer, setAnswer] = useState(initialQuestion.answers[0] || "false");

  useEffect(() => {
    setEditorValue(initialQuestion.description || "");
  }, [initialQuestion.description]);

  useEffect(() => {
    const updatedQuestion = {
      ...initialQuestion,
      description,
      answers: [answer],
    };
    onChange(updatedQuestion);
  }, [description, answer]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    setDescription(value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <p>Enter your question text, then select True or False as the correct answer.</p>
      <div className="mb-3">
        <label htmlFor="question" className="form-label">
          <strong>Question:</strong>
        </label>
        <RichTextEditor value={editorValue} onChange={handleEditorChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Answers:</label>
        <div className="form-check">
          <input
            type="radio"
            id="true"
            name="answer"
            value="true"
            className="form-check-input"
            checked={answer === "true"}
            onChange={handleAnswerChange}
          />
          <label htmlFor="true" className="form-check-label">
            True
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="false"
            name="answer"
            value="false"
            className="form-check-input"
            checked={answer === "false"}
            onChange={handleAnswerChange}
          />
          <label htmlFor="false" className="form-check-label">
            False
          </label>
        </div>
      </div>
    </div>
  );
}
