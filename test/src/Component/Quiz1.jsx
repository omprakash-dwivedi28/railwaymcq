import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../Component/css/Quiz1.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function Quiz1() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [option, setOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuesAns, setCurrentQuesAns] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentAns, setCurrentAns] = useState(null);
  const [check, setCheck] = useState(false);
  const [feedback, setFeedback] = useState();
  const location = useLocation();
  const { state: receivedData } = location;

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://railwaymcq.com/student/mcq_api.php?topicCode=${receivedData?.topicCode}&difficultyLevel=${receivedData?.difficulty}&subjectcode=${receivedData?.subjectcode}`
        );
        setQuizData(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [receivedData]);

  const handleOptionSelect = (selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });
    setCurrentAns(selectedOption);
    setOption(selectedOption);
  };
  const handleCheck = () => {
    setCheck(!check);
    console.log("user ans", currentAns, "ans = ", currentQuesAns);
  };

  const handleFeedback = async () => {
    if (!feedback || /^\s*$/.test(feedback)) {
      alert("Please enter your feedback.");
      console.log("formData subcode" + formData.topcode);
      return;
    }

    try {
      const response = await axios.post(
        "https://railwaymcq.com/student/quiz_feedback_api.php",
        formData
      );
      alert("Feedback Added successfully!");
      console.log(response.data);
      setFeedback("");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Feedback!");
    }
  };
  const handleChange = (event) => {
    setFeedback(event.target.value);
  };
  // console.log(check);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCheck(!check);
      console.log("====== ", check);
      setCurrentAns(null);
      setCurrentQuesAns(null);
    }
  };

  const handleSubmit = () => {
    // Calculate score based on user answers
    let totalScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.answer.trim()) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setShowResult(true);
  };

  const handleGoBack = () => {
    // Navigate back
    if (location.state && location.state.from) {
      window.location = location.state.from.pathname;
    } else {
      window.history.back();
    }
  };
  const formData = {
    qcode: quizData[currentQuestionIndex]?.qcode,
    subcode: quizData[currentQuestionIndex]?.subcode,
    topcode: quizData[currentQuestionIndex]?.topcode, // Assuming you have a question_id in your quizData
    feedback: feedback,
    feedback_by: receivedData?.name,
    res_code: 0, // Assuming you have receivedData with the user's name
    feedback_date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">Quiz Attended by: {receivedData?.name}</h1>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          {showResult ? (
            <div className="result-container">
              <h2>Quiz Result</h2>
              <p>
                Your score is {score} out of {quizData.length}.
              </p>
              <button className="go-back-button" onClick={handleGoBack}>
                Go Back
              </button>
            </div>
          ) : (
            <>
              <div className="question-box">
                {quizData.length > 0 && (
                  <>
                    {console.log(quizData[currentQuestionIndex]?.answer)}
                    <h3 className="question-number">
                      Q{currentQuestionIndex + 1}:
                    </h3>
                    <h3 className="question-text">
                      {quizData[currentQuestionIndex]?.question}
                    </h3>
                    <ul className="options-list">
                      {[
                        quizData[currentQuestionIndex]?.option1,
                        quizData[currentQuestionIndex]?.option2,
                        quizData[currentQuestionIndex]?.option3,
                        quizData[currentQuestionIndex]?.option4,
                      ].map((option, idx) => (
                        <li key={idx} className="option-item">
                          {/* {console.log("user ans", currentAns, "ans =", quizData)} */}
                          <input
                            type="radio"
                            id={`option${idx + 1}`}
                            name="options"
                            value={option}
                            checked={
                              userAnswers[currentQuestionIndex] === option
                            }
                            onChange={() => handleOptionSelect(option)}
                          />

                          <div
                            htmlFor={`option${idx + 1}`}
                            // className={`option-label ${getColorForOption(
                            //   option
                            // )}`}
                            // style={{ background: "red" }}
                            style={{
                              background: `${
                                check
                                  ? currentAns === option &&
                                    option ===
                                      quizData[currentQuestionIndex]?.answer
                                    ? "lightGreen"
                                    : currentAns === option
                                    ? "#ff4d4d"
                                    : option ===
                                      quizData[currentQuestionIndex]?.answer
                                    ? "lightGreen"
                                    : "white"
                                  : "white"
                              }`,
                            }}
                          >
                            {option}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="button-container">
                      <hr />
                      {currentQuestionIndex < quizData.length && (
                        <div className="d-flex justify-content-around">
                          <button
                            style={{ width: "auto" }}
                            className={`btn btn-primary ${
                              currentAns !== null && !check ? null : "disabled"
                            }`}
                            on
                            onClick={handleCheck}
                          >
                            check {check}
                          </button>
                          <button
                            style={{ width: "auto" }}
                            className={`btn btn-primary  ${
                              check || !currentAns ? null : "disabled"
                            }`}
                            on
                            onClick={handleNextQuestion}
                          >
                            next
                          </button>
                        </div>
                      )}
                      <button onClick={handleSubmit} className="submit-button">
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="feedback-container">
                <textarea
                  type="text"
                  name="feedbak"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Feel free to enter your feedback aout this question......"
                  className="form-control"
                  id="myBox"
                  rows="2"
                  col="8"
                ></textarea>
                <button onClick={handleFeedback} className="submit-button">
                  Submit Feedback
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz1;
