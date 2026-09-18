import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  Building2,
  Users,
  Globe,
  CalendarDays,
} from "lucide-react";

import {
  getJobById,
} from "../../data/jobsData";

import "./JobDetails.css";

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
   SAVED JOBS
========================================================= */

const getSavedJobsKey = () => {
  return `upnxtSavedJobs_${getCurrentUserEmail()}`;
};

const getSavedJobs = () => {
  try {
    return JSON.parse(
      localStorage.getItem(
        getSavedJobsKey()
      ) || "[]"
    );
  } catch {
    return [];
  }
};

/* =========================================================
   COMPONENT
========================================================= */

function JobDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  /* =======================================================
     GET ACTUAL JOB FROM URL
  ======================================================= */

  const job = getJobById(id);

  const [isSaved, setIsSaved] =
    useState(false);

  /* =======================================================
     INVALID JOB
  ======================================================= */

  if (!job) {
    return (
      <main className="job-details-page">

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
     LOAD SAVED STATE
  ======================================================= */

  useEffect(() => {
    const savedJobs =
      getSavedJobs();

    const alreadySaved =
      savedJobs.some(
        (savedJob) =>
          String(savedJob?.id) ===
          String(job.id)
      );

    setIsSaved(
      alreadySaved
    );
  }, [job.id]);

  /* =======================================================
     SAVE / UNSAVE JOB
  ======================================================= */

  const toggleSaveJob = () => {
    const savedJobs =
      getSavedJobs();

    const alreadySaved =
      savedJobs.some(
        (savedJob) =>
          String(savedJob?.id) ===
          String(job.id)
      );

    let updatedJobs;

    if (alreadySaved) {

      updatedJobs =
        savedJobs.filter(
          (savedJob) =>
            String(savedJob?.id) !==
            String(job.id)
        );

    } else {

      updatedJobs = [
        ...savedJobs,

        {
          id: job.id,
          company: job.company,
          industry: job.industry,
          initial: job.initial,
          title: job.title,
          location: job.location,
          type: job.type,
          experience: job.experience,
          salary: job.salary,
          match: job.match,
          posted: job.posted,
          applicants:
            job.applicants,
          description:
            job.description,
        },
      ];
    }

    localStorage.setItem(
      getSavedJobsKey(),
      JSON.stringify(
        updatedJobs
      )
    );

    setIsSaved(
      !alreadySaved
    );

    window.dispatchEvent(
      new Event(
        "savedJobsUpdated"
      )
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="job-details-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="job-details-hero">

        <button
          className="back-to-jobs"
          onClick={() =>
            navigate("/jobs")
          }
        >
          <ArrowLeft size={18} />
          Back to jobs
        </button>

        <div className="job-details-header">

          <div className="job-company-section">

            <div className="job-details-logo">
              {job.initial}
            </div>

            <div>

              <div className="job-company-name">

                <Building2
                  size={17}
                />

                {job.company}

              </div>

              <p>
                {job.industry}
              </p>

            </div>

          </div>

          <button
            className={`job-details-save ${
              isSaved
                ? "saved"
                : ""
            }`}
            onClick={
              toggleSaveJob
            }
          >

            <Bookmark
              size={21}
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />

            {isSaved
              ? "Saved"
              : "Save job"}

          </button>

        </div>

        <div className="job-title-section">

          <h1>
            {job.title}
          </h1>

          <div className="job-details-meta">

            <span>
              <MapPin
                size={17}
              />
              {job.location}
            </span>

            <span>
              <BriefcaseBusiness
                size={17}
              />
              {job.type}
            </span>

            <span>
              <Clock3
                size={17}
              />
              {job.experience}
            </span>

            <span>
              <IndianRupee
                size={17}
              />
              {job.salary}
            </span>

          </div>
          <div className="job-details-floating-brand">
  <div className="floating-brand-word">
    UpNxt
  </div>

  <div className="floating-brand-bag">
    <BriefcaseBusiness size={118} strokeWidth={1.35} />
  </div>
</div>

        </div>

        <div className="job-details-bottom">

          <div className="job-posted-info">

            <Clock3
              size={16}
            />

            Posted {job.posted}

            <span className="job-info-divider">
              •
            </span>

            <Users
              size={16}
            />

            {job.applicants}

          </div>

          <div className="job-details-match">

            <Sparkles
              size={18}
            />

            <div>

              <strong>
                {job.match}% AI Match
              </strong>

              <span>
                Based on your profile
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="job-details-content">

        <div className="job-details-main">

          {/* =================================================
              ROLE OVERVIEW
          ================================================= */}

          <section className="job-content-section">

            <div className="section-heading">

              <span className="section-number">
                01
              </span>

              <div>

                <p>
                  ROLE OVERVIEW
                </p>

                <h2>
                  About this role
                </h2>

              </div>

            </div>

            <p className="job-main-description">
              {job.description}
            </p>

            <div className="overview-list">

              {job.overview.map(
                (item) => (
                  <div
                    className="overview-item"
                    key={item}
                  >

                    <CheckCircle2
                      size={19}
                    />

                    <span>
                      {item}
                    </span>

                  </div>
                )
              )}

            </div>

          </section>

          {/* =================================================
              RESPONSIBILITIES
          ================================================= */}

          <section className="job-content-section">

            <div className="section-heading">

              <span className="section-number">
                02
              </span>

              <div>

                <p>
                  WHAT YOU'LL DO
                </p>

                <h2>
                  Responsibilities
                </h2>

              </div>

            </div>

            <ul className="job-details-list">

              {job.responsibilities.map(
                (item) => (
                  <li
                    key={item}
                  >
                    {item}
                  </li>
                )
              )}

            </ul>

          </section>

          {/* =================================================
              REQUIREMENTS
          ================================================= */}

          <section className="job-content-section">

            <div className="section-heading">

              <span className="section-number">
                03
              </span>

              <div>

                <p>
                  WHAT WE'RE LOOKING FOR
                </p>

                <h2>
                  Requirements
                </h2>

              </div>

            </div>

            <ul className="job-details-list">

              {job.requirements.map(
                (item) => (
                  <li
                    key={item}
                  >
                    {item}
                  </li>
                )
              )}

            </ul>

          </section>

          {/* =================================================
              SKILLS
          ================================================= */}

          <section className="job-content-section">

            <div className="section-heading">

              <span className="section-number">
                04
              </span>

              <div>

                <p>
                  YOUR TOOLKIT
                </p>

                <h2>
                  Skills & technologies
                </h2>

              </div>

            </div>

            <div className="skills-grid">

              {job.skills.map(
                (skill) => (
                  <span
                    className="job-skill-tag"
                    key={skill}
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </section>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <section className="job-content-section">

            <div className="section-heading">

              <span className="section-number">
                05
              </span>

              <div>

                <p>
                  WHY JOIN US
                </p>

                <h2>
                  Benefits & perks
                </h2>

              </div>

            </div>

            <div className="benefits-grid">

              {job.benefits.map(
                (benefit) => (
                  <div
                    className="benefit-item"
                    key={benefit}
                  >

                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      {benefit}
                    </span>

                  </div>
                )
              )}

            </div>

          </section>

          {/* =================================================
              COMPANY
          ================================================= */}

          <section className="company-section">

            <div className="company-section-header">

              <div className="company-large-logo">
                {job.initial}
              </div>

              <div>

                <p>
                  ABOUT THE COMPANY
                </p>

                <h2>
                  {job.company}
                </h2>

              </div>

            </div>

            <p>
              {job.company} is a
              technology-driven
              organization focused
              on building reliable
              digital products and
              scalable platforms.
              The team works across
              engineering, cloud,
              and data to solve
              meaningful problems
              for modern businesses.
            </p>

            <div className="company-stats">

              <div>

                <Users
                  size={19}
                />

                <span>
                  500–1,000 employees
                </span>

              </div>

              <div>

                <Globe
                  size={19}
                />

                <span>
                  {job.industry}
                </span>

              </div>

              <div>

                <CalendarDays
                  size={19}
                />

                <span>
                  Founded in 2012
                </span>

              </div>

            </div>

            <button
              className="company-link-button"
            >
              View company profile

              <ArrowUpRight
                size={17}
              />
            </button>

          </section>

        </div>

        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <aside className="job-apply-sidebar">

          <div className="apply-card">

            <div className="apply-card-top">

              <p>
                READY FOR YOUR NEXT MOVE?
              </p>

              <h3>
                Interested in this role?
              </h3>

              <span>
                Applications are currently open.
              </span>

            </div>

            <button
              className="apply-now-button"
              onClick={() =>
                navigate(
                  `/apply/${job.id}`
                )
              }
            >
              Apply now

              <ArrowUpRight
                size={19}
              />
            </button>

            <div className="apply-card-info">

              <div>

                <Clock3
                  size={16}
                />

                <span>
                  Quick application process
                </span>

              </div>

              <div>

                <Users
                  size={16}
                />

                <span>
                  {job.applicants}
                </span>

              </div>

            </div>

          </div>

          <div className="match-insights-card">

            <div className="match-insights-header">

              <div className="match-icon">

                <Sparkles
                  size={19}
                />

              </div>

              <div>

                <p>
                  AI MATCH INSIGHT
                </p>

                <h3>
                  {job.match}% match
                </h3>

              </div>

            </div>

            <p>
              Your profile aligns
              strongly with this role
              based on your skills,
              experience, and career
              interests.
            </p>

            <div className="match-points">

              <span>
                Strong skill alignment
              </span>

              <span>
                Relevant experience
              </span>

              <span>
                Career path match
              </span>

            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default JobDetails;