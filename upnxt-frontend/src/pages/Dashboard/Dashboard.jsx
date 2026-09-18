import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Clock3,
  CalendarDays,
  BriefcaseBusiness,
  Bookmark,
  ArrowRight,
  Search,
  User,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  X,
  RotateCcw,
} from "lucide-react";

import "./Dashboard.css";

/* =========================================================
   DAILY CHALLENGE BANK
========================================================= */

const CHALLENGES = [
  {
    id: "java-01",
    category: "JAVA",
    difficulty: "Easy",
    points: 10,
    question: "What is the output of this Java code?",
    code: `int x = 5;
System.out.println(x++);`,
    options: ["4", "5", "6", "Compilation error"],
    answer: 1,
    explanation:
      "The post-increment operator returns the current value first and then increments x.",
  },

  {
    id: "java-02",
    category: "JAVA",
    difficulty: "Easy",
    points: 10,
    question: "Which keyword is used to inherit a class in Java?",
    options: [
      "implements",
      "inherits",
      "extends",
      "super",
    ],
    answer: 2,
    explanation:
      "The extends keyword is used when one class inherits another class.",
  },

  {
    id: "java-03",
    category: "JAVA",
    difficulty: "Medium",
    points: 15,
    question:
      "Which collection does NOT allow duplicate elements?",
    options: [
      "ArrayList",
      "LinkedList",
      "HashSet",
      "Vector",
    ],
    answer: 2,
    explanation:
      "A Set represents a collection that does not permit duplicate elements.",
  },

  {
    id: "sql-01",
    category: "SQL",
    difficulty: "Easy",
    points: 10,
    question: "Which SQL clause is used to filter rows?",
    options: [
      "ORDER BY",
      "GROUP BY",
      "WHERE",
      "HAVING",
    ],
    answer: 2,
    explanation:
      "WHERE filters rows based on a specified condition.",
  },

  {
    id: "sql-02",
    category: "SQL",
    difficulty: "Easy",
    points: 10,
    question:
      "Which command removes all rows while keeping the table structure?",
    options: [
      "DROP",
      "DELETE",
      "TRUNCATE",
      "REMOVE",
    ],
    answer: 2,
    explanation:
      "TRUNCATE removes the rows while retaining the table structure.",
  },

  {
    id: "sql-03",
    category: "SQL",
    difficulty: "Medium",
    points: 15,
    question:
      "Which SQL function is commonly used to count rows?",
    options: [
      "SUM()",
      "COUNT()",
      "TOTAL()",
      "ROWS()",
    ],
    answer: 1,
    explanation:
      "COUNT() is commonly used to count rows.",
  },

  {
    id: "aptitude-01",
    category: "APTITUDE",
    difficulty: "Easy",
    points: 10,
    question:
      "If 20% of a number is 40, what is the number?",
    options: [
      "100",
      "150",
      "200",
      "250",
    ],
    answer: 2,
    explanation:
      "40 ÷ 0.20 = 200.",
  },

  {
    id: "aptitude-02",
    category: "APTITUDE",
    difficulty: "Easy",
    points: 10,
    question:
      "A train travels 120 km in 2 hours. What is its average speed?",
    options: [
      "40 km/h",
      "50 km/h",
      "60 km/h",
      "80 km/h",
    ],
    answer: 2,
    explanation:
      "Average speed = distance ÷ time = 120 ÷ 2 = 60 km/h.",
  },

  {
    id: "aptitude-03",
    category: "APTITUDE",
    difficulty: "Medium",
    points: 15,
    question:
      "What is the next number: 2, 6, 12, 20, 30, ?",
    options: [
      "36",
      "40",
      "42",
      "44",
    ],
    answer: 2,
    explanation:
      "The differences are 4, 6, 8, 10, so the next difference is 12. Therefore the answer is 42.",
  },

  {
    id: "logic-01",
    category: "LOGIC",
    difficulty: "Easy",
    points: 10,
    question:
      "If all roses are flowers, which statement must be true?",
    options: [
      "All flowers are roses",
      "Some flowers are not roses",
      "Roses are flowers",
      "No roses are flowers",
    ],
    answer: 2,
    explanation:
      "The statement directly tells us that roses are flowers.",
  },

  {
    id: "logic-02",
    category: "LOGIC",
    difficulty: "Medium",
    points: 15,
    question:
      "A clock shows exactly 3:00. What is the angle between the hands?",
    options: [
      "30°",
      "60°",
      "90°",
      "180°",
    ],
    answer: 2,
    explanation:
      "At 3:00, the hands form a right angle of 90°.",
  },

  {
    id: "cs-01",
    category: "COMPUTER SCIENCE",
    difficulty: "Easy",
    points: 10,
    question:
      "Which data structure follows FIFO?",
    options: [
      "Stack",
      "Queue",
      "Tree",
      "Graph",
    ],
    answer: 1,
    explanation:
      "Queue follows First In, First Out.",
  },

  {
    id: "cs-02",
    category: "COMPUTER SCIENCE",
    difficulty: "Easy",
    points: 10,
    question:
      "Which protocol is commonly used for secure web communication?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP",
    ],
    answer: 2,
    explanation:
      "HTTPS uses HTTP over a secure TLS connection.",
  },

  {
    id: "cs-03",
    category: "COMPUTER SCIENCE",
    difficulty: "Medium",
    points: 15,
    question:
      "What is the average time complexity of binary search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)",
    ],
    answer: 1,
    explanation:
      "Binary search repeatedly halves the search space.",
  },

  {
    id: "web-01",
    category: "WEB",
    difficulty: "Easy",
    points: 10,
    question:
      "Which CSS declaration creates a flex container?",
    options: [
      "position: flex",
      "display: flex",
      "flex: display",
      "layout: flex",
    ],
    answer: 1,
    explanation:
      "display: flex turns an element into a flex container.",
  },

  {
    id: "web-02",
    category: "WEB",
    difficulty: "Easy",
    points: 10,
    question:
      "Which HTTP method is commonly used to create a resource?",
    options: [
      "GET",
      "POST",
      "DELETE",
      "HEAD",
    ],
    answer: 1,
    explanation:
      "POST is commonly used to submit data and create resources.",
  },

  {
    id: "debug-01",
    category: "DEBUGGING",
    difficulty: "Medium",
    points: 15,
    question:
      "Which exception occurs when Java accesses an invalid array index?",
    options: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "IOException",
      "ArithmeticException",
    ],
    answer: 1,
    explanation:
      "An invalid array index causes ArrayIndexOutOfBoundsException.",
  },
];

/* =========================================================
   DATE
========================================================= */

const getDateKey = (date = new Date()) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const getYesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateKey(date);
};

/* =========================================================
   CURRENT USER
========================================================= */

const getCurrentUser = () => {
  const possibleKeys = [
    "upnxtCurrentUser",
    "currentUser",
    "upnxtUser",
    "loggedInUser",
    "user",
  ];

  for (const key of possibleKeys) {
    const stored = localStorage.getItem(key);

    if (!stored) continue;

    try {
      const parsed = JSON.parse(stored);

      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      return { email: stored };
    }
  }

  return {};
};

const getUserIdentifier = () => {
  const user = getCurrentUser();

  return (
    user?.email ||
    user?.username ||
    user?.userEmail ||
    "guest"
  )
    .toLowerCase()
    .trim();
};

const getChallengeKey = () =>
  `upnxtChallenge_${getUserIdentifier()}`;

/* =========================================================
   CHALLENGE STATE
========================================================= */

const createChallengeState = (previous = null) => {
  const randomIndex = Math.floor(
    Math.random() * CHALLENGES.length
  );

  return {
    date: getDateKey(),
    challengeId: CHALLENGES[randomIndex].id,
    completed: false,
    selectedAnswer: null,
    streak: previous?.streak || 0,
    totalXP: previous?.totalXP || 0,
    lastCompletedDate:
      previous?.lastCompletedDate || null,
  };
};

const getChallengeState = () => {
  const key = getChallengeKey();
  const stored = localStorage.getItem(key);

  if (!stored) {
    const fresh = createChallengeState();

    localStorage.setItem(
      key,
      JSON.stringify(fresh)
    );

    return fresh;
  }

  try {
    const state = JSON.parse(stored);

    if (state.date === getDateKey()) {
      return state;
    }

    const newDay = createChallengeState(state);

    localStorage.setItem(
      key,
      JSON.stringify(newDay)
    );

    return newDay;
  } catch {
    const fresh = createChallengeState();

    localStorage.setItem(
      key,
      JSON.stringify(fresh)
    );

    return fresh;
  }
};

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {
  const navigate = useNavigate();

  const [challengeState, setChallengeState] =
    useState(getChallengeState());

  const [challengeOpen, setChallengeOpen] =
    useState(false);

  const [selectedAnswer, setSelectedAnswer] =
    useState(
      challengeState.selectedAnswer
    );

  const [feedback, setFeedback] =
    useState(null);

  const [applications, setApplications] =
    useState([]);

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [celebrate, setCelebrate] =
    useState(false);

  /* =======================================================
     CURRENT CHALLENGE
  ======================================================= */

  const currentChallenge = useMemo(() => {
    return (
      CHALLENGES.find(
        (item) =>
          item.id === challengeState.challengeId
      ) || CHALLENGES[0]
    );
  }, [challengeState.challengeId]);

  /* =======================================================
     REFRESH CHALLENGE
  ======================================================= */

  useEffect(() => {
    const refreshChallenge = () => {
      const latest = getChallengeState();

      setChallengeState(latest);
      setSelectedAnswer(
        latest.selectedAnswer
      );
    };

    refreshChallenge();

    window.addEventListener(
      "focus",
      refreshChallenge
    );

    return () => {
      window.removeEventListener(
        "focus",
        refreshChallenge
      );
    };
  }, []);

  /* =======================================================
     DASHBOARD DATA
  ======================================================= */

  useEffect(() => {
    const loadData = () => {
      const userId =
        getUserIdentifier();

      let apps = [];
      let saved = [];

      const applicationKeys = [
        `upnxtApplications_${userId}`,
        "upnxtApplications",
        `applications_${userId}`,
        "applications",
      ];

      const savedKeys = [
        `upnxtSavedJobs_${userId}`,
        "upnxtSavedJobs",
        `savedJobs_${userId}`,
        "savedJobs",
      ];

      for (const key of applicationKeys) {
        const stored =
          localStorage.getItem(key);

        if (!stored) continue;

        try {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            apps = parsed;
            break;
          }
        } catch {
          // Ignore invalid data.
        }
      }

      for (const key of savedKeys) {
        const stored =
          localStorage.getItem(key);

        if (!stored) continue;

        try {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            saved = parsed;
            break;
          }
        } catch {
          // Ignore invalid data.
        }
      }

      setApplications(apps);
      setSavedJobs(saved);
    };

    loadData();

    window.addEventListener(
      "focus",
      loadData
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadData
      );
    };
  }, []);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const underReview =
      applications.filter((item) =>
        [
          "under review",
          "review",
        ].includes(
          String(
            item?.status || ""
          ).toLowerCase()
        )
      ).length;

    const interviews =
      applications.filter(
        (item) =>
          String(
            item?.status || ""
          ).toLowerCase() ===
          "interview"
      ).length;

    const offers =
      applications.filter(
        (item) =>
          String(
            item?.status || ""
          ).toLowerCase() ===
          "offer"
      ).length;

    return {
      applications: applications.length,
      underReview,
      interviews,
      offers,
      savedJobs: savedJobs.length,
    };
  }, [applications, savedJobs]);

  /* =======================================================
     OPEN CHALLENGE
  ======================================================= */

  const openChallenge = () => {
    setFeedback(
      challengeState.completed
        ? "correct"
        : null
    );

    setSelectedAnswer(
      challengeState.selectedAnswer
    );

    setChallengeOpen(true);
  };

  /* =======================================================
     CLOSE CHALLENGE
  ======================================================= */

  const closeChallenge = () => {
    setChallengeOpen(false);
    setFeedback(null);
  };

  /* =======================================================
     SUBMIT ANSWER
  ======================================================= */

  const submitAnswer = () => {
    if (
      selectedAnswer === null ||
      selectedAnswer === undefined
    ) {
      setFeedback("empty");
      return;
    }

    if (challengeState.completed) {
      return;
    }

    const correct =
      Number(selectedAnswer) ===
      Number(currentChallenge.answer);

    const updated = {
      ...challengeState,
      selectedAnswer:
        Number(selectedAnswer),
    };

    if (correct) {
      const yesterday =
        getYesterdayKey();

      const newStreak =
        challengeState.lastCompletedDate ===
        yesterday
          ? (challengeState.streak || 0) + 1
          : 1;

      updated.completed = true;
      updated.streak = newStreak;
      updated.totalXP =
        (challengeState.totalXP || 0) +
        currentChallenge.points;
      updated.lastCompletedDate =
        getDateKey();

      localStorage.setItem(
        getChallengeKey(),
        JSON.stringify(updated)
      );

      setChallengeState(updated);
      setFeedback("correct");

      setCelebrate(true);

      setTimeout(() => {
        setCelebrate(false);
      }, 2500);
    } else {
      localStorage.setItem(
        getChallengeKey(),
        JSON.stringify(updated)
      );

      setChallengeState(updated);
      setFeedback("wrong");
    }
  };

  const tryAgain = () => {
    setSelectedAnswer(null);
    setFeedback(null);
  };

  /* =======================================================
     STREAK DAYS
  ======================================================= */

  const streakDays = useMemo(() => {
    const today = new Date();

    return Array.from(
      { length: 7 },
      (_, index) => {
        const date = new Date(today);

        date.setDate(
          today.getDate() -
            (6 - index)
        );

        return {
          key: getDateKey(date),
          label: date.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),
          number: date.getDate(),
        };
      }
    );
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning!"
      : hour < 17
      ? "Good afternoon!"
      : "Good evening!";

  const user =
    getCurrentUser();

  const firstName =
    user?.name?.split(" ")[0] ||
    user?.firstName ||
    "there";

  return (
    <div
      className={`dashboard-page ${
        challengeOpen
          ? "challenge-is-open"
          : ""
      }`}
    >

      {/* =================================================
          CELEBRATION POPPERS
      ================================================= */}

      {celebrate && (
        <div className="challenge-poppers">
          {Array.from(
            { length: 34 },
            (_, index) => (
              <span
                key={index}
                style={{
                  "--i": index,
                }}
              />
            )
          )}
        </div>
      )}

      {/* =================================================
          DASHBOARD
      ================================================= */}

      <section className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            YOUR CAREER SPACE
          </p>

          <h1>{greeting}</h1>

          <p className="dashboard-subtitle">
            Welcome back, {firstName}. Keep
            building momentum towards your next
            opportunity.
          </p>
        </div>

        <button
          className="dashboard-profile-btn"
          onClick={() =>
            navigate("/profile")
          }
        >
          <User size={19} />
          Update Profile
        </button>
      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Applications</span>
            <strong>
              {stats.applications}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>
              {stats.underReview}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Interviews</span>
            <strong>
              {stats.interviews}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <BriefcaseBusiness
              size={21}
            />
          </div>

          <div>
            <span>Offers</span>
            <strong>
              {stats.offers}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Bookmark size={21} />
          </div>

          <div>
            <span>Saved Jobs</span>
            <strong>
              {stats.savedJobs}
            </strong>
          </div>
        </div>

      </section>

      {/* =================================================
          COMPACT DAILY CHALLENGE
      ================================================= */}

      <section className="daily-challenge-preview">

        <div className="preview-glow preview-glow-one" />
        <div className="preview-glow preview-glow-two" />

        <div className="preview-left">

          <div className="preview-icon">
            <Trophy size={27} />
          </div>

          <div>
            <p className="preview-label">
              DAILY CHALLENGE
            </p>

            <h2>
              One challenge.
              <span> Every day.</span>
            </h2>

            <p className="preview-text">
              Test your skills, earn XP and
              keep your learning streak alive.
            </p>

            <div className="preview-tags">
              <span>
                <Target size={13} />
                Random challenge
              </span>

              <span>
                <Zap size={13} />
                +{currentChallenge.points} XP
              </span>

              <span>
                <Flame size={13} />
                {challengeState.streak || 0}
                {" "}day streak
              </span>
            </div>
          </div>

        </div>

        <div className="preview-right">

          <div className="preview-streak">
            <Flame
              size={21}
              fill="currentColor"
            />

            <div>
              <strong>
                {challengeState.streak || 0}
              </strong>

              <span>
                day streak
              </span>
            </div>
          </div>

          <button
  className="accept-challenge-btn"
  onClick={openChallenge}
>
  {challengeState.completed
    ? "View Challenge"
    : "Accept Challenge"}
</button>

        </div>

      </section>

      {/* =================================================
          NORMAL DASHBOARD
      ================================================= */}

      <section className="dashboard-grid">

        <div className="dashboard-column">

          <div className="dashboard-card application-tracker">

            <div className="card-header">

              <div>
                <h2>
                  Application Tracker
                </h2>

                <p>
                  Keep track of your opportunities.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/applications")
                }
              >
                View all
                <ChevronRight size={16} />
              </button>

            </div>

            {applications.length === 0 ? (
              <div className="empty-state">

                <div className="empty-icon">
                  <FileText
                    size={42}
                    strokeWidth={1.5}
                  />
                </div>

                <h3>
                  No applications yet
                </h3>

                <p>
                  Start exploring opportunities
                  and your applications will
                  appear here.
                </p>

                <button
                  className="primary-action"
                  onClick={() =>
                    navigate("/jobs")
                  }
                >
                  Find jobs
                  <ArrowRight size={19} />
                </button>

              </div>
            ) : (
              <div className="tracker-summary">

                <div className="tracker-big-number">
                  {applications.length}
                </div>

                <div>
                  <strong>
                    Active applications
                  </strong>

                  <p>
                    Your latest applications
                    are ready to review.
                  </p>
                </div>

                <button
                  className="tracker-arrow"
                  onClick={() =>
                    navigate("/applications")
                  }
                >
                  <ArrowRight size={19} />
                </button>

              </div>
            )}

          </div>

          <div className="dashboard-card recommended-card">

            <div className="card-header">

              <div>
                <h2>
                  Recommended for you
                </h2>

                <p>
                  Opportunities worth exploring.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/jobs")
                }
              >
                View more
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="empty-recommendations">

              <div className="recommendation-icon">
                <Search
                  size={36}
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <h3>
                  Discover your next opportunity
                </h3>

                <p>
                  Explore jobs and find roles
                  that match your skills and
                  interests.
                </p>

                <button
                  className="secondary-action"
                  onClick={() =>
                    navigate("/jobs")
                  }
                >
                  Explore jobs
                  <ArrowRight size={17} />
                </button>
              </div>

            </div>

          </div>

        </div>

        <div className="dashboard-column">

          <div className="dashboard-card activity-card">

            <div className="card-header">
              <div>
                <h2>
                  Recent Activity
                </h2>

                <p>
                  Your latest UPnxt activity.
                </p>
              </div>
            </div>

            {applications.length === 0 &&
            savedJobs.length === 0 ? (
              <div className="empty-activity">

                <div className="activity-icon">
                  <Clock3
                    size={38}
                    strokeWidth={1.5}
                  />
                </div>

                <p>
                  Your profile updates,
                  applications, saved jobs and
                  completed activities will appear
                  here.
                </p>

              </div>
            ) : (
              <div className="activity-list">

                {applications
                  .slice(-3)
                  .reverse()
                  .map(
                    (application, index) => (
                      <div
                        className="activity-item"
                        key={
                          application?.id ||
                          index
                        }
                      >
                        <div className="activity-dot">
                          <FileText size={15} />
                        </div>

                        <div>
                          <strong>
                            Application submitted
                          </strong>

                          <p>
                            {application?.title ||
                              application?.jobTitle ||
                              "Job application"}
                          </p>
                        </div>
                      </div>
                    )
                  )}

                {savedJobs.length > 0 && (
                  <div className="activity-item">

                    <div className="activity-dot">
                      <Bookmark size={15} />
                    </div>

                    <div>
                      <strong>
                        Saved jobs
                      </strong>

                      <p>
                        {savedJobs.length} job
                        {savedJobs.length !== 1
                          ? "s"
                          : ""} saved
                      </p>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

          <div className="dashboard-card streak-summary-card">

            <div className="streak-summary-icon">
              <Flame
                size={29}
                fill="currentColor"
              />
            </div>

            <div className="streak-summary-content">

              <span>
                CURRENT STREAK
              </span>

              <strong>
                {challengeState.streak || 0}
                <small>
                  {" "}day
                  {(challengeState.streak || 0) !==
                  1
                    ? "s"
                    : ""}
                </small>
              </strong>

              <p>
                Complete today's challenge to
                keep your momentum going.
              </p>

            </div>

            <div className="streak-summary-xp">
              <Zap size={15} />
              {challengeState.totalXP || 0} XP
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          BACKDROP + CHALLENGE MODAL
      ================================================= */}

      {challengeOpen && (
        <div
          className="challenge-modal-backdrop"
          onClick={closeChallenge}
        >

          <div
            className="challenge-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="challenge-close-btn"
              onClick={closeChallenge}
              aria-label="Close challenge"
            >
              <X size={21} />
            </button>

            {/* Decorative flowing elements */}

            <div className="modal-orb orb-one" />
            <div className="modal-orb orb-two" />
            <div className="modal-orb orb-three" />

            <div className="modal-floating-star star-one">
              ✦
            </div>

            <div className="modal-floating-star star-two">
              +
            </div>

            {/* =========================================
                MODAL HEADER
            ========================================= */}

            <div className="modal-header">

              <div className="modal-trophy">
                <Trophy size={28} />
              </div>

              <div>
                <p>
                  UPnxt DAILY CHALLENGE
                </p>

                <h2>
                  Today's Challenge
                </h2>
              </div>

            </div>

            {/* =========================================
                STREAK TOP BAR
            ========================================= */}

            <div className="modal-streak-bar">

              <div className="modal-streak">

                <div className="modal-streak-icon">
                  <Flame
                    size={21}
                    fill="currentColor"
                  />
                </div>

                <div>
                  <span>
                    CURRENT STREAK
                  </span>

                  <strong>
                    {challengeState.streak || 0}
                    <small>
                      {" "}days
                    </small>
                  </strong>
                </div>

              </div>

              <div className="modal-xp">

                <Zap size={18} />

                <div>
                  <span>
                    TOTAL XP
                  </span>

                  <strong>
                    {challengeState.totalXP || 0}
                  </strong>
                </div>

              </div>

            </div>

            {/* =========================================
                QUESTION
            ========================================= */}

            <div className="modal-question-card">

              <div className="modal-question-meta">

                <span>
                  <Target size={13} />
                  {currentChallenge.category}
                </span>

                <span>
                  {currentChallenge.difficulty}
                </span>

                <span>
                  +{currentChallenge.points} XP
                </span>

              </div>

              <p className="modal-question-label">
                YOUR CHALLENGE
              </p>

              <h3>
                {currentChallenge.question}
              </h3>

              {currentChallenge.code && (
                <pre className="modal-code">
                  <code>
                    {currentChallenge.code}
                  </code>
                </pre>
              )}

              <div className="modal-options">

                {currentChallenge.options.map(
                  (option, index) => {

                    const selected =
                      Number(
                        selectedAnswer
                      ) === index;

                    const correctOption =
                      challengeState.completed &&
                      index ===
                        currentChallenge.answer;

                    return (
                      <button
                        key={option}
                        className={`modal-option ${
                          selected
                            ? "selected"
                            : ""
                        } ${
                          correctOption
                            ? "correct"
                            : ""
                        }`}
                        disabled={
                          challengeState.completed
                        }
                        onClick={() => {
                          if (
                            challengeState.completed
                          ) {
                            return;
                          }

                          setSelectedAnswer(
                            index
                          );

                          setFeedback(null);
                        }}
                      >

                        <span className="modal-option-letter">
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <span className="modal-option-text">
                          {option}
                        </span>

                        {correctOption && (
                          <CheckCircle2
                            size={18}
                          />
                        )}

                      </button>
                    );
                  }
                )}

              </div>

              {/* =======================================
                  SUCCESS
              ======================================= */}

              {feedback === "correct" && (
                <div className="challenge-result success-result">

                  <div className="result-main-icon">
                    <CheckCircle2
                      size={35}
                    />
                  </div>

                  <div className="result-content">
                    <span className="result-kicker">
                      CHALLENGE COMPLETE
                    </span>

                    <h3>
                      Hurray! You got it
                      correct! 🎉
                    </h3>

                    <p>
                      Brilliant work! Your streak
                      just increased by one day.
                    </p>

                    <div className="result-rewards">

                      <span>
                        <Flame size={15} />
                        {challengeState.streak}
                        {" "}day streak
                      </span>

                      <span>
                        <Zap size={15} />
                        +{currentChallenge.points}
                        {" "}XP
                      </span>

                    </div>
                  </div>

                  <div className="result-pulse">
                    ✓
                  </div>

                </div>
              )}

              {/* =======================================
                  WRONG
              ======================================= */}

              {feedback === "wrong" && (
                <div className="challenge-result wrong-result">

                  <div className="result-main-icon">
                    <XCircle size={35} />
                  </div>

                  <div className="result-content">
                    <span className="result-kicker">
                      KEEP GOING
                    </span>

                    <h3>
                      Oops! Not quite 😅
                    </h3>

                    <p>
                      Your streak is safe. Take
                      another look and give it
                      another try.
                    </p>

                    <button
                      className="modal-retry-btn"
                      onClick={tryAgain}
                    >
                      <RotateCcw size={15} />
                      Try Again
                    </button>
                  </div>

                </div>
              )}

              {/* =======================================
                  EMPTY
              ======================================= */}

              {feedback === "empty" && (
                <div className="challenge-empty-message">
                  <Target size={17} />
                  Choose an answer before checking.
                </div>
              )}

              {/* =======================================
                  ACTION
              ======================================= */}

              {feedback !== "correct" && (
                <button
                  className={`modal-submit-btn ${
                    challengeState.completed
                      ? "completed"
                      : ""
                  }`}
                  onClick={
                    challengeState.completed
                      ? undefined
                      : submitAnswer
                  }
                >
                  {challengeState.completed ? (
                    <>
                      <CheckCircle2 size={18} />
                      Completed Today
                    </>
                  ) : (
                    <>
                      Check Answer
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}

              {/* =======================================
                  EXPLANATION AFTER CORRECT
              ======================================= */}

              {feedback === "correct" && (
                <div className="answer-explanation">

                  <Sparkles size={16} />

                  <div>
                    <strong>
                      Why?
                    </strong>

                    <p>
                      {currentChallenge.explanation}
                    </p>
                  </div>

                </div>
              )}

            </div>

            <div className="modal-footer">

              <span>
                <Sparkles size={14} />
                One challenge per day
              </span>

              <span>
                New challenge tomorrow
              </span>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;