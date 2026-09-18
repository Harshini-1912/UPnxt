import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Code2,
  Database,
  Brain,
  CheckCircle2,
  ArrowRight,
  Trophy,
  RotateCcw,
} from "lucide-react";

import "./Assessments.css";

const assessments = [
  {
    id: "java",
    title: "Java Fundamentals",
    description:
      "Test your understanding of Core Java and OOP.",
    icon: <Code2 size={25} />,
    questions: [
      {
        question:
          "Which keyword is used to inherit a class?",
        options: [
          "implements",
          "extends",
          "inherits",
          "super",
        ],
        answer: 1,
      },
      {
        question:
          "Which collection does not allow duplicates?",
        options: [
          "ArrayList",
          "Vector",
          "HashSet",
          "LinkedList",
        ],
        answer: 2,
      },
      {
        question:
          "Which method is the entry point of a Java application?",
        options: [
          "start()",
          "run()",
          "main()",
          "execute()",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: "sql",
    title: "SQL Fundamentals",
    description:
      "Test your SQL, database and query knowledge.",
    icon: <Database size={25} />,
    questions: [
      {
        question:
          "Which clause filters rows?",
        options: [
          "ORDER BY",
          "WHERE",
          "GROUP BY",
          "SELECT",
        ],
        answer: 1,
      },
      {
        question:
          "Which function counts rows?",
        options: [
          "SUM()",
          "COUNT()",
          "TOTAL()",
          "ROWS()",
        ],
        answer: 1,
      },
      {
        question:
          "Which command removes all rows while keeping the table?",
        options: [
          "DROP",
          "REMOVE",
          "TRUNCATE",
          "CLEAR",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: "logic",
    title: "Logical Reasoning",
    description:
      "Practice patterns, reasoning and problem solving.",
    icon: <Brain size={25} />,
    questions: [
      {
        question:
          "What is the next number: 2, 6, 12, 20, 30, ?",
        options: [
          "36",
          "40",
          "42",
          "44",
        ],
        answer: 2,
      },
      {
        question:
          "At 3:00, what is the angle between clock hands?",
        options: [
          "30°",
          "60°",
          "90°",
          "180°",
        ],
        answer: 2,
      },
      {
        question:
          "If all cats are animals, which statement is true?",
        options: [
          "All animals are cats",
          "Cats are animals",
          "No cats are animals",
          "Animals cannot be cats",
        ],
        answer: 1,
      },
    ],
  },
];

function Assessments() {
  const [selected, setSelected] =
    useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [finished, setFinished] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const assessment = useMemo(
    () =>
      assessments.find(
        (item) => item.id === selected
      ),
    [selected]
  );

  const startAssessment = (id) => {
    setSelected(id);
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
    setScore(0);
  };

  const selectAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  const nextQuestion = () => {
    if (!assessment) return;

    if (
      currentQuestion <
      assessment.questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
      return;
    }

    let finalScore = 0;

    assessment.questions.forEach(
      (question, index) => {
        if (
          answers[index] ===
          question.answer
        ) {
          finalScore += 1;
        }
      }
    );

    setScore(finalScore);
    setFinished(true);

    const completed =
      JSON.parse(
        localStorage.getItem(
          "upnxtCompletedAssessments"
        ) || "[]"
      );

    if (!completed.includes(assessment.id)) {
      completed.push(assessment.id);

      localStorage.setItem(
        "upnxtCompletedAssessments",
        JSON.stringify(completed)
      );
    }
  };

  if (selected && assessment) {

    if (finished) {
      const percentage =
        Math.round(
          (score /
            assessment.questions.length) *
            100
        );

      return (
        <div className="assessment-page">

          <div className="assessment-result">

            <div className="assessment-result-icon">
              <Trophy size={42} />
            </div>

            <p>ASSESSMENT COMPLETED</p>

            <h1>
              Great work!
            </h1>

            <div className="assessment-score">
              {percentage}%
            </div>

            <h3>
              {score} /{" "}
              {assessment.questions.length}
              {" "}correct
            </h3>

            <span>
              Keep practicing to strengthen
              your skills.
            </span>

            <div className="result-actions">

              <button
                onClick={() =>
                  startAssessment(
                    assessment.id
                  )
                }
              >
                <RotateCcw size={17} />
                Try Again
              </button>

              <button
                onClick={() =>
                  setSelected(null)
                }
              >
                All Assessments
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>
      );
    }

    const question =
      assessment.questions[
        currentQuestion
      ];

    const answer =
      answers[currentQuestion];

    return (
      <div className="assessment-page">

        <button
          className="assessment-back"
          onClick={() =>
            setSelected(null)
          }
        >
          ← All Assessments
        </button>

        <div className="assessment-header">

          <div>
            <span>
              {assessment.title}
            </span>

            <h1>
              Question{" "}
              {currentQuestion + 1}
              {" "}
              of{" "}
              {assessment.questions.length}
            </h1>
          </div>

          <div className="assessment-progress">
            <div
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    assessment.questions.length) *
                  100
                }%`,
              }}
            />
          </div>

        </div>

        <div className="question-card">

          <p>
            QUESTION {currentQuestion + 1}
          </p>

          <h2>
            {question.question}
          </h2>

          <div className="assessment-options">

            {question.options.map(
              (option, index) => (
                <button
                  key={option}
                  className={
                    answer === index
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    selectAnswer(index)
                  }
                >
                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  {option}

                  {answer === index && (
                    <CheckCircle2 size={18} />
                  )}
                </button>
              )
            )}

          </div>

          <button
            className="next-question"
            disabled={
              answer === undefined
            }
            onClick={nextQuestion}
          >
            {currentQuestion ===
            assessment.questions.length - 1
              ? "Finish Assessment"
              : "Next Question"}

            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="assessment-page">

      <section className="assessment-intro">

        <div>
          <p>
            TEST YOUR SKILLS
          </p>

          <h1>
            Assessments
          </h1>

          <span>
            Build confidence by testing
            the skills employers look for.
          </span>
        </div>

        <div className="assessment-intro-icon">
          <ShieldCheck size={40} />
        </div>

      </section>

      <div className="assessment-grid">

        {assessments.map(
          (assessment) => (
            <div
              className="assessment-card"
              key={assessment.id}
            >

              <div className="assessment-card-icon">
                {assessment.icon}
              </div>

              <h2>
                {assessment.title}
              </h2>

              <p>
                {assessment.description}
              </p>

              <div className="assessment-card-footer">

                <span>
                  {assessment.questions.length}
                  {" "}questions
                </span>

                <button
                  onClick={() =>
                    startAssessment(
                      assessment.id
                    )
                  }
                >
                  Start
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Assessments;