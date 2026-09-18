import React, {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
} from "lucide-react";

import confetti from "canvas-confetti";

import {
  getJobById,
} from "../../data/jobsData";

import "./ApplyJob.css";

/* =========================================================
   CURRENT USER
========================================================= */

const getCurrentUserEmail = () => {
  const possibleKeys = [
    "upnxtCurrentUser",
    "currentUser",
    "upnxtUser",
    "loggedInUser",
    "user",
  ];

  for (const key of possibleKeys) {
    const stored =
      localStorage.getItem(key);

    if (!stored) continue;

    try {
      const parsed =
        JSON.parse(stored);

      const email =
        parsed?.email ||
        parsed?.username ||
        parsed?.userEmail;

      if (email) {
        return email
          .toLowerCase()
          .trim();
      }
    } catch {
      return stored
        .toLowerCase()
        .trim();
    }
  }

  return "guest";
};

/* =========================================================
   COMPONENT
========================================================= */

function ApplyJob() {
  const navigate = useNavigate();

  const { id } = useParams();

  /* =======================================================
     GET ACTUAL JOB
  ======================================================= */

  const job = getJobById(id);

  /* =======================================================
     STATES
  ======================================================= */

  const [coverLetter, setCoverLetter] =
    useState("");

  const [resumeName, setResumeName] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =======================================================
     LOAD CURRENT USER DETAILS
  ======================================================= */

  useEffect(() => {
    const possibleKeys = [
      "upnxtCurrentUser",
      "currentUser",
      "upnxtUser",
      "loggedInUser",
      "user",
    ];

    for (const key of possibleKeys) {
      const stored =
        localStorage.getItem(key);

      if (!stored) continue;

      try {
        const parsed =
          JSON.parse(stored);

        const storedName =
          parsed?.name ||
          parsed?.fullName ||
          "";

        const storedEmail =
          parsed?.email ||
          parsed?.username ||
          parsed?.userEmail ||
          "";

        if (storedName) {
          setFullName(
            storedName
          );
        }

        if (storedEmail) {
          setEmail(
            storedEmail
          );
        }

        break;

      } catch {
        setEmail(stored);
        break;
      }
    }
  }, []);

  /* =======================================================
     CONFETTI
  ======================================================= */

  useEffect(() => {
    if (!submitted) return;

    const duration = 5000;

    const animationEnd =
      Date.now() + duration;

    const colors = [
      "#ff4d4d",
      "#ff9f43",
      "#ffd93d",
      "#6bcB77",
      "#4dabf7",
      "#d66efd",
      "#ff7eb6",
      "#ffffff",
    ];

    const interval =
      setInterval(() => {

        const timeLeft =
          animationEnd -
          Date.now();

        if (timeLeft <= 0) {
          clearInterval(
            interval
          );

          return;
        }

        const particleCount =
          18;

        /* LEFT */

        confetti({
          particleCount,
          angle: 60,
          spread: 70,

          origin: {
            x: 0,
            y: 0.15,
          },

          colors,

          gravity: 0.8,
          scalar: 0.9,
          drift: 0.2,
        });

        /* RIGHT */

        confetti({
          particleCount,
          angle: 120,
          spread: 70,

          origin: {
            x: 1,
            y: 0.15,
          },

          colors,

          gravity: 0.8,
          scalar: 0.9,
          drift: -0.2,
        });

        /* TOP */

        confetti({
          particleCount: 12,
          angle: 90,
          spread: 180,

          origin: {
            x: 0.5,
            y: 0,
          },

          colors,

          gravity: 0.65,
          scalar: 0.75,
        });

      }, 350);

    return () =>
      clearInterval(interval);

  }, [submitted]);

  /* =======================================================
     RESUME
  ======================================================= */

  const handleResumeUpload = (
    event
  ) => {

    const file =
      event.target.files[0];

    if (file) {
      setResumeName(
        file.name
      );
    }
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {

    let isValid = true;

    if (!fullName.trim()) {
      isValid = false;
    }

    if (!email.trim()) {
      isValid = false;
    }

    if (!resumeName) {
      isValid = false;
    }

    return isValid;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    event
  ) => {

    event.preventDefault();

    const isValid =
      validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {

      const userEmail =
        getCurrentUserEmail();

      const applicationKey =
        `upnxtApplications_${userEmail}`;

      let existingApplications = [];

      try {
        existingApplications =
          JSON.parse(
            localStorage.getItem(
              applicationKey
            ) || "[]"
          );
      } catch {
        existingApplications =
          [];
      }

      const newApplication = {

        id: Date.now(),

        jobId: job.id,

        jobTitle:
          job.title,

        title:
          job.title,

        company:
          job.company,

        companyInitial:
          job.initial,

        industry:
          job.industry,

        location:
          job.location,

        type:
          job.type,

        experience:
          job.experience,

        salary:
          job.salary,

        match:
          job.match,

        applicantName:
          fullName,

        applicantEmail:
          email,

        resumeName:
          resumeName,

        coverLetter:
          coverLetter,

        status:
          "Applied",

        appliedDate:
          new Date().toISOString(),

        submittedAt:
          new Date().toISOString(),
      };

      const updatedApplications = [
        newApplication,
        ...existingApplications,
      ];

      localStorage.setItem(
        applicationKey,
        JSON.stringify(
          updatedApplications
        )
      );

      /* Keep old global key too,
         so existing UI that uses
         it doesn't suddenly break. */

      let globalApplications = [];

      try {
        globalApplications =
          JSON.parse(
            localStorage.getItem(
              "applications"
            ) || "[]"
          );
      } catch {
        globalApplications =
          [];
      }

      localStorage.setItem(
        "applications",
        JSON.stringify([
          newApplication,
          ...globalApplications,
        ])
      );

      /* Tell Dashboard /
         My Applications to refresh */

      window.dispatchEvent(
        new Event(
          "applicationsUpdated"
        )
      );

      setIsSubmitting(false);

      setSubmitted(true);

    }, 1200);
  };

  /* =======================================================
     INVALID JOB
  ======================================================= */

  if (!job) {
    return (
      <main className="apply-job-page">

        <div
          style={{
            padding: "60px",
            textAlign: "center",
          }}
        >

          <h2>
            Job not found
          </h2>

          <button
            onClick={() =>
              navigate("/jobs")
            }
          >
            Back to jobs
          </button>

        </div>

      </main>
    );
  }

  /* =======================================================
     SUCCESS PAGE
  ======================================================= */

  if (submitted) {
    return (

      <main className="application-success-page">

        <div className="application-success-card">

          <div className="success-icon">
            <CheckCircle2
              size={48}
            />
          </div>

          <p className="success-eyebrow">
            APPLICATION SUBMITTED
          </p>

          <h1>
            You're one step closer
            to your next opportunity.
          </h1>

          <p className="success-description">
            Your application for{" "}
            <strong>
              {job.title}
            </strong>{" "}
            at{" "}
            <strong>
              {job.company}
            </strong>{" "}
            has been successfully
            submitted.
          </p>

          <div className="success-job-card">

            <div className="success-company-logo">
              {job.initial}
            </div>

            <div>

              <h3>
                {job.title}
              </h3>

              <span>
                {job.company}
              </span>

            </div>

          </div>

          <button
            className="success-back-button"
            onClick={() =>
              navigate("/jobs")
            }
          >
            Explore more jobs

            <ArrowUpRight
              size={18}
            />
          </button>

        </div>

      </main>

    );
  }

  /* =======================================================
     APPLICATION PAGE
  ======================================================= */

  return (

    <main className="apply-job-page">

      {/* =================================================
          TOP
      ================================================= */}

      <div className="apply-page-top">

        <button
          className="apply-back-button"
          onClick={() =>
            navigate(
              `/jobs/${job.id}`
            )
          }
        >
          <ArrowLeft
            size={18}
          />

          Back to job
        </button>

        <div className="apply-progress">

          <span className="progress-active">
            01
          </span>

          <div className="progress-line active" />

          <span>
            02
          </span>

          <div className="progress-line" />

          <span>
            03
          </span>

        </div>

      </div>

      {/* =================================================
          LAYOUT
      ================================================= */}

      <section className="apply-job-layout">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="application-form-section">

          <div className="apply-page-heading">

            <p className="apply-eyebrow">
              APPLY FOR THIS ROLE
            </p>

            <h1>
              Let’s get your application started.
            </h1>

            <span>
              Review your details and submit your application when you're ready.
            </span>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >

            {/* =================================================
                PROFILE
            ================================================= */}

            <div className="application-form-card">

              <div className="form-section-heading">

                <div className="form-section-icon">

                  <User
                    size={20}
                  />

                </div>

                <div>

                  <p>
                    01 · YOUR PROFILE
                  </p>

                  <h2>
                    Personal details
                  </h2>

                </div>

              </div>

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                RESUME
            ================================================= */}

            <div className="application-form-card">

              <div className="form-section-heading">

                <div className="form-section-icon">

                  <FileText
                    size={20}
                  />

                </div>

                <div>

                  <p>
                    02 · RESUME
                  </p>

                  <h2>
                    Share your resume
                  </h2>

                </div>

              </div>

              <label className="resume-upload-area">

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={
                    handleResumeUpload
                  }
                />

                <div className="upload-icon">

                  <Upload
                    size={24}
                  />

                </div>

                {resumeName ? (

                  <div className="uploaded-file">

                    <strong>
                      {resumeName}
                    </strong>

                    <span>
                      Resume selected successfully
                    </span>

                  </div>

                ) : (

                  <div>

                    <strong>
                      Upload your resume
                    </strong>

                    <span>
                      PDF, DOC or DOCX · Max file size 10MB
                    </span>

                  </div>

                )}

              </label>

            </div>

            {/* =================================================
                COVER LETTER
            ================================================= */}

            <div className="application-form-card">

              <div className="form-section-heading">

                <div className="form-section-icon">

                  <Mail
                    size={20}
                  />

                </div>

                <div>

                  <p>
                    03 · INTRODUCTION
                  </p>

                  <h2>
                    Tell them why you're interested
                  </h2>

                </div>

              </div>

              <div className="form-field">

                <label>

                  Cover note

                  <span className="optional-label">
                    Optional
                  </span>

                </label>

                <textarea
                  value={coverLetter}
                  onChange={(event) =>
                    setCoverLetter(
                      event.target.value
                    )
                  }
                  placeholder="Briefly introduce yourself and share why you're interested in this opportunity..."
                  rows="6"
                />

              </div>

              <div className="character-count">
                {coverLetter.length}/1000
              </div>

            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              className="submit-application-button"
              disabled={
                isSubmitting
              }
            >

              {isSubmitting
                ? "Submitting..."
                : "Submit application"}

              {!isSubmitting && (
                <ArrowUpRight
                  size={20}
                />
              )}

            </button>

          </form>

        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <aside className="application-job-sidebar">

          <div className="applying-for-card">

            <p className="sidebar-label">
              YOU'RE APPLYING FOR
            </p>

            <div className="applying-company">

              <div className="applying-logo">
                {job.initial}
              </div>

              <div>

                <h3>
                  {job.title}
                </h3>

                <span>
                  {job.company}
                </span>

              </div>

            </div>

            <div className="applying-meta">

              <span>

                <MapPin
                  size={16}
                />

                {job.location}

              </span>

              <span>

                <BriefcaseBusiness
                  size={16}
                />

                {job.type}

              </span>

              <span>

                <Clock3
                  size={16}
                />

                {job.experience}

              </span>

              <span>

                <IndianRupee
                  size={16}
                />

                {job.salary}

              </span>

            </div>

            <div className="application-match">

              <div className="application-match-icon">

                <Sparkles
                  size={19}
                />

              </div>

              <div>

                <span>
                  YOUR AI MATCH
                </span>

                <strong>
                  {job.match}% match
                </strong>

              </div>

            </div>

          </div>

          <div className="application-tip-card">

            <div className="tip-icon">

              <Sparkles
                size={18}
              />

            </div>

            <div>

              <p>
                APPLICATION TIP
              </p>

              <h3>
                Make your application stand out.
              </h3>

              <span>
                Tailor your resume and highlight the skills most relevant to this role.
              </span>

            </div>

          </div>

        </aside>

      </section>

    </main>

  );
}

export default ApplyJob;