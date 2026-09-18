import {
  TrendingUp,
  UserRound,
  Target,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./CareerInsights.css";

function CareerInsights() {
  const navigate = useNavigate();

  const profile =
    JSON.parse(
      localStorage.getItem(
        "upnxtProfile_" +
          (
            JSON.parse(
              localStorage.getItem(
                "upnxtCurrentUser"
              ) || "{}"
            )?.email ||
            "guest"
          )
            .toLowerCase()
            .trim()
      ) || "{}"
    );

  const skills = profile?.skills || [];

  const profileItems = [
    {
      label: "Personal Details",
      completed:
        !!profile?.firstName ||
        !!profile?.name,
    },
    {
      label: "Skills",
      completed:
        Array.isArray(skills) &&
        skills.length > 0,
    },
    {
      label: "Education",
      completed:
        !!profile?.education ||
        !!profile?.degree,
    },
    {
      label: "Experience",
      completed:
        !!profile?.experience ||
        !!profile?.experienceYears,
    },
  ];

  const completed =
    profileItems.filter(
      (item) => item.completed
    ).length;

  const profileScore = Math.round(
    (completed /
      profileItems.length) *
      100
  );

  return (
    <div className="insights-page">

      <section className="insights-hero">

        <div>
          <p>
            YOUR CAREER JOURNEY
          </p>

          <h1>
            Career Insights
          </h1>

          <span>
            Understand your progress and
            discover areas that can strengthen
            your profile.
          </span>
        </div>

        <div className="insights-hero-icon">
          <TrendingUp size={39} />
        </div>

      </section>

      <section className="insights-grid">

        <div className="insight-main-card">

          <div className="insight-card-heading">

            <div>
              <p>PROFILE STRENGTH</p>
              <h2>
                Your profile is{" "}
                {profileScore >= 75
                  ? "looking strong"
                  : "still growing"}
              </h2>
            </div>

            <div className="insight-score">
              {profileScore}%
            </div>

          </div>

          <div className="insight-progress">
            <div
              style={{
                width: `${profileScore}%`,
              }}
            />
          </div>

          <div className="insight-checklist">

            {profileItems.map(
              (item) => (
                <div key={item.label}>

                  <CheckCircle2
                    size={17}
                    className={
                      item.completed
                        ? "completed"
                        : ""
                    }
                  />

                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.completed
                      ? "Complete"
                      : "Add"}
                  </strong>

                </div>
              )
            )}

          </div>

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            Update Profile
            <ArrowRight size={17} />
          </button>

        </div>

        <div className="insight-side-card">

          <div className="insight-side-icon">
            <Target size={25} />
          </div>

          <p>
            JOB SEARCH
          </p>

          <h2>
            Keep exploring
          </h2>

          <span>
            The more relevant opportunities
            you explore, the easier it becomes
            to understand what roles match your
            goals.
          </span>

          <button
            onClick={() =>
              navigate("/jobs")
            }
          >
            Explore Jobs
            <ArrowRight size={16} />
          </button>

        </div>

      </section>

      <section className="insight-tips">

        <div className="insight-tips-header">

          <div className="tips-icon">
            <Sparkles size={23} />
          </div>

          <div>
            <p>PERSONALIZED GUIDANCE</p>
            <h2>
              Small steps, stronger profile
            </h2>
          </div>

        </div>

        <div className="tips-grid">

          <div className="tip-card">

            <UserRound size={20} />

            <h3>
              Complete your profile
            </h3>

            <p>
              Add your education, skills and
              experience so recruiters get a
              clearer picture of your background.
            </p>

          </div>

          <div className="tip-card">

            <Search size={20} />

            <h3>
              Explore relevant roles
            </h3>

            <p>
              Review different opportunities
              and identify the roles that align
              with your interests.
            </p>

          </div>

          <div className="tip-card">

            <TrendingUp size={20} />

            <h3>
              Keep learning
            </h3>

            <p>
              Use assessments and the daily
              challenge to continuously practice
              your technical skills.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default CareerInsights;