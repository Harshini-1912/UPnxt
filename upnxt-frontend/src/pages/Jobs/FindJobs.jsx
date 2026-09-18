import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JOBS } from "../../data/jobsData";

import "./FindJobs.css";

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
    const stored = localStorage.getItem(key);

    if (!stored) continue;

    try {
      const parsed = JSON.parse(stored);

      const email =
        parsed?.email ||
        parsed?.username ||
        parsed?.userEmail;

      if (email) {
        return email.toLowerCase().trim();
      }
    } catch {
      return stored.toLowerCase().trim();
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

const readSavedJobs = () => {
  try {
    return JSON.parse(
      localStorage.getItem(getSavedJobsKey()) || "[]"
    );
  } catch {
    return [];
  }
};

/* =========================================================
   FILTER HELPERS
========================================================= */

const getExperienceLevel = (job) => {
  const experience = String(
    job?.experience || ""
  ).toLowerCase();

  if (
    experience.includes("0–2") ||
    experience.includes("0-2") ||
    experience.includes("1–3") ||
    experience.includes("1-3")
  ) {
    return "Entry level";
  }

  if (
    experience.includes("2–4") ||
    experience.includes("2-4") ||
    experience.includes("3–5") ||
    experience.includes("3-5")
  ) {
    return "Mid level";
  }

  if (
    experience.includes("5+") ||
    experience.includes("senior")
  ) {
    return "Senior level";
  }

  return "";
};

const getWorkMode = (job) => {
  const location = String(
    job?.location || ""
  ).toLowerCase();

  if (location.includes("remote")) {
    return "Remote";
  }

  return "On-site";
};

const getSalaryValues = (job) => {
  const salary = String(
    job?.salary || ""
  );

  const values = salary.match(
    /[\d.]+/g
  );

  if (!values || values.length === 0) {
    return {
      min: 0,
      max: 0,
    };
  }

  const numbers = values.map(Number);

  return {
    min: numbers[0] || 0,
    max:
      numbers.length > 1
        ? numbers[1]
        : numbers[0] || 0,
  };
};

const getPostedDays = (job) => {
  const posted = String(
    job?.posted || ""
  ).toLowerCase();

  if (posted.includes("today")) {
    return 0;
  }

  const match = posted.match(
    /(\d+)/
  );

  if (match) {
    return Number(match[1]);
  }

  return 999;
};

/* =========================================================
   COMPONENT
========================================================= */

function FindJobs() {
  const navigate = useNavigate();

  const jobs = JOBS;

  /* =======================================================
     SEARCH
  ======================================================= */

  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [searchKeyword, setSearchKeyword] =
    useState("");

  const [searchLocation, setSearchLocation] =
    useState("");

  /* =======================================================
     FILTERS
  ======================================================= */

  const [jobTypes, setJobTypes] =
    useState([]);

  const [experienceLevels, setExperienceLevels] =
    useState([]);

  const [workModes, setWorkModes] =
    useState([]);

  const [minSalary, setMinSalary] =
    useState("");

  const [maxSalary, setMaxSalary] =
    useState("");

  /* =======================================================
     SORT
  ======================================================= */

  const [sortBy, setSortBy] =
    useState("relevant");

  /* =======================================================
     SAVED JOBS
  ======================================================= */

  const [savedJobs, setSavedJobs] =
    useState(readSavedJobs);

  /* =======================================================
     REFRESH SAVED JOBS
  ======================================================= */

  useEffect(() => {
    const refreshSavedJobs = () => {
      setSavedJobs(readSavedJobs());
    };

    window.addEventListener(
      "savedJobsUpdated",
      refreshSavedJobs
    );

    window.addEventListener(
      "focus",
      refreshSavedJobs
    );

    return () => {
      window.removeEventListener(
        "savedJobsUpdated",
        refreshSavedJobs
      );

      window.removeEventListener(
        "focus",
        refreshSavedJobs
      );
    };
  }, []);

  /* =======================================================
     CHECK SAVED
  ======================================================= */

  const isJobSaved = (jobId) => {
    return savedJobs.some(
      (job) =>
        String(job?.id) ===
        String(jobId)
    );
  };

  /* =======================================================
     SAVE / UNSAVE JOB
  ======================================================= */

  const toggleSaveJob = (job) => {
    const currentSavedJobs =
      readSavedJobs();

    const alreadySaved =
      currentSavedJobs.some(
        (savedJob) =>
          String(savedJob?.id) ===
          String(job.id)
      );

    let updatedJobs;

    if (alreadySaved) {
      updatedJobs =
        currentSavedJobs.filter(
          (savedJob) =>
            String(savedJob?.id) !==
            String(job.id)
        );
    } else {
      updatedJobs = [
        ...currentSavedJobs,
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
          description: job.description,
        },
      ];
    }

    localStorage.setItem(
      getSavedJobsKey(),
      JSON.stringify(updatedJobs)
    );

    setSavedJobs(updatedJobs);

    window.dispatchEvent(
      new Event("savedJobsUpdated")
    );
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setSearchLocation(location);
  };

  const handlePopularSearch = (value) => {
    setKeyword(value);
    setSearchKeyword(value);

    setLocation("");
    setSearchLocation("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /* =======================================================
     FILTER TOGGLE
  ======================================================= */

  const toggleFilter = (
    value,
    setter
  ) => {
    setter((currentValues) =>
      currentValues.includes(value)
        ? currentValues.filter(
            (item) => item !== value
          )
        : [
            ...currentValues,
            value,
          ]
    );
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    setKeyword("");
    setLocation("");

    setSearchKeyword("");
    setSearchLocation("");

    setJobTypes([]);
    setExperienceLevels([]);
    setWorkModes([]);

    setMinSalary("");
    setMaxSalary("");

    setSortBy("relevant");
  };

  /* =======================================================
     FILTER JOBS
  ======================================================= */

  const filteredJobs = jobs.filter(
    (job) => {
      const keywordValue =
        searchKeyword
          .toLowerCase()
          .trim();

      const locationValue =
        searchLocation
          .toLowerCase()
          .trim();

      /* -----------------------------
         KEYWORD
      ----------------------------- */

      const matchesKeyword =
        keywordValue === "" ||
        job.title
          .toLowerCase()
          .includes(keywordValue) ||
        job.company
          .toLowerCase()
          .includes(keywordValue) ||
        job.industry
          .toLowerCase()
          .includes(keywordValue) ||
        job.description
          .toLowerCase()
          .includes(keywordValue);

      /* -----------------------------
         LOCATION
      ----------------------------- */

      const matchesLocation =
        locationValue === "" ||
        job.location
          .toLowerCase()
          .includes(locationValue) ||
        (
          locationValue === "remote" &&
          getWorkMode(job) === "Remote"
        );

      /* -----------------------------
         JOB TYPE
      ----------------------------- */

      const matchesJobType =
        jobTypes.length === 0 ||
        jobTypes.includes(job.type);

      /* -----------------------------
         EXPERIENCE
      ----------------------------- */

      const experienceLevel =
        getExperienceLevel(job);

      const matchesExperience =
        experienceLevels.length === 0 ||
        experienceLevels.includes(
          experienceLevel
        );

      /* -----------------------------
         WORK MODE
      ----------------------------- */

      const workMode =
        getWorkMode(job);

      const matchesWorkMode =
        workModes.length === 0 ||
        workModes.includes(
          workMode
        );

      /* -----------------------------
         SALARY
      ----------------------------- */

      const salary =
        getSalaryValues(job);

      const matchesMinSalary =
        minSalary === "" ||
        salary.max >=
          Number(minSalary);

      const matchesMaxSalary =
        maxSalary === "" ||
        salary.min <=
          Number(maxSalary);

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesWorkMode &&
        matchesMinSalary &&
        matchesMaxSalary
      );
    }
  );

  /* =======================================================
     SORT
  ======================================================= */

  const sortedJobs = [
    ...filteredJobs,
  ].sort((a, b) => {
    if (sortBy === "relevant") {
      return (
        b.match - a.match
      );
    }

    if (sortBy === "newest") {
      return (
        getPostedDays(a) -
        getPostedDays(b)
      );
    }

    if (sortBy === "salary") {
      return (
        getSalaryValues(b).max -
        getSalaryValues(a).max
      );
    }

    return 0;
  });

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="find-jobs-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="jobs-hero">

        <div className="jobs-hero-content">

          <div className="section-eyebrow">
            <Sparkles size={16} />

            <span>
              SMART JOB DISCOVERY
            </span>
          </div>

          <h1>
            Find opportunities that
            <br />

            <span>
              move you forward.
            </span>
          </h1>

          <p>
            Explore curated opportunities
            matched to your skills, experience,
            and career direction.
          </p>

        </div>

        {/* =================================================
            SEARCH PANEL
        ================================================= */}

        <div className="job-search-panel">

          <div className="job-search-field">

            <Search size={20} />

            <input
              type="text"
              placeholder="Job title, skill, or keyword"
              value={keyword}
              onChange={(e) =>
                setKeyword(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
            />

          </div>

          <div className="job-search-divider" />

          <div className="job-search-field">

            <MapPin size={20} />

            <input
              type="text"
              placeholder="Location or remote"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
            />

          </div>

          <button
            className="job-search-button"
            onClick={handleSearch}
          >
            Search jobs

            <ArrowUpRight size={19} />
          </button>

        </div>

        {/* =================================================
            POPULAR SEARCHES
        ================================================= */}

        <div className="popular-searches">

          <span>
            Popular:
          </span>

          <button
            onClick={() =>
              handlePopularSearch(
                "Software Engineer"
              )
            }
          >
            Software Engineer
          </button>

          <button
            onClick={() =>
              handlePopularSearch(
                "Java Developer"
              )
            }
          >
            Java Developer
          </button>

          <button
            onClick={() =>
              handlePopularSearch(
                "Data Analyst"
              )
            }
          >
            Data Analyst
          </button>

          <button
            onClick={() =>
              handlePopularSearch(
                "Product Designer"
              )
            }
          >
            Product Designer
          </button>

        </div>

      </section>

      {/* =================================================
          JOB CONTENT
      ================================================= */}

      <section className="jobs-content">

        {/* =================================================
            FILTER SIDEBAR
        ================================================= */}

        <aside className="jobs-sidebar">

          <div className="filter-header">

            <div>
              <SlidersHorizontal size={19} />

              <span>
                Filters
              </span>
            </div>

            <button
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

          {/* =================================================
              JOB TYPE
          ================================================= */}

          <div className="filter-group">

            <button className="filter-title">
              Job type

              <ChevronDown size={18} />
            </button>

            {[
              "Full-time",
              "Part-time",
              "Internship",
              "Contract",
            ].map((type) => (
              <label key={type}>

                <input
                  type="checkbox"
                  checked={jobTypes.includes(
                    type
                  )}
                  onChange={() =>
                    toggleFilter(
                      type,
                      setJobTypes
                    )
                  }
                />

                <span>
                  {type}
                </span>

              </label>
            ))}

          </div>

          {/* =================================================
              EXPERIENCE
          ================================================= */}

          <div className="filter-group">

            <button className="filter-title">
              Experience level

              <ChevronDown size={18} />
            </button>

            {[
              "Entry level",
              "Mid level",
              "Senior level",
            ].map((level) => (
              <label key={level}>

                <input
                  type="checkbox"
                  checked={experienceLevels.includes(
                    level
                  )}
                  onChange={() =>
                    toggleFilter(
                      level,
                      setExperienceLevels
                    )
                  }
                />

                <span>
                  {level}
                </span>

              </label>
            ))}

          </div>

          {/* =================================================
              WORK MODE
          ================================================= */}

          <div className="filter-group">

            <button className="filter-title">
              Work mode

              <ChevronDown size={18} />
            </button>

            {[
              "Remote",
              "Hybrid",
              "On-site",
            ].map((mode) => (
              <label key={mode}>

                <input
                  type="checkbox"
                  checked={workModes.includes(
                    mode
                  )}
                  onChange={() =>
                    toggleFilter(
                      mode,
                      setWorkModes
                    )
                  }
                />

                <span>
                  {mode}
                </span>

              </label>
            ))}

          </div>

          {/* =================================================
              SALARY
          ================================================= */}

          <div className="filter-group">

            <button className="filter-title">
              Salary range

              <ChevronDown size={18} />
            </button>

            <div className="salary-inputs">

              <input
                type="number"
                placeholder="Min"
                value={minSalary}
                onChange={(e) =>
                  setMinSalary(
                    e.target.value
                  )
                }
              />

              <span>
                —
              </span>

              <input
                type="number"
                placeholder="Max"
                value={maxSalary}
                onChange={(e) =>
                  setMaxSalary(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </aside>

        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="jobs-results">

          <div className="jobs-results-header">

            <div>

              <p className="results-label">
                OPPORTUNITIES FOR YOU
              </p>

              <h2>
                {sortedJobs.length} jobs{" "}

                <span>
                  matched to your preferences
                </span>
              </h2>

            </div>

            <select
              className="sort-button"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
            >
              <option value="relevant">
                Most relevant
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="salary">
                Highest salary
              </option>
            </select>

          </div>

          {/* =================================================
              AI MATCH BANNER
          ================================================= */}

          <div className="ai-match-banner">

            <div className="ai-match-icon">
              <Sparkles size={20} />
            </div>

            <div>

              <h3>
                AI-powered matching is active
              </h3>

              <p>
                UPnxt is ranking opportunities
                based on your profile, skills,
                and career interests.
              </p>

            </div>

          </div>

          {/* =================================================
              JOB LIST
          ================================================= */}

          <div className="jobs-list">

            {sortedJobs.length > 0 ? (

              sortedJobs.map((job) => {

                const saved =
                  isJobSaved(job.id);

                return (

                  <article
                    className="job-result-card"
                    key={job.id}
                  >

                    {/* =================================================
                        CARD TOP
                    ================================================= */}

                    <div className="job-card-top">

                      <div className="company-info">

                        <div className="company-logo">
                          {job.initial}
                        </div>

                        <div>

                          <h3>
                            {job.company}
                          </h3>

                          <p>
                            {job.industry}
                          </p>

                        </div>

                      </div>

                      {/* SAVE */}
                      <button
                        className={`save-job-button ${
                          saved
                            ? "saved"
                            : ""
                        }`}
                        onClick={() =>
                          toggleSaveJob(job)
                        }
                        title={
                          saved
                            ? "Remove from saved jobs"
                            : "Save job"
                        }
                      >

                        <Bookmark
                          size={20}
                          fill={
                            saved
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                    </div>

                    {/* =================================================
                        CARD MAIN
                    ================================================= */}

                    <div className="job-card-main">

                      <div>

                        <h2>
                          {job.title}
                        </h2>

                        <p className="job-description">
                          {job.description}
                        </p>

                        <div className="job-meta">

                          <span>
                            <MapPin size={16} />

                            {job.location}
                          </span>

                          <span>
                            <BriefcaseBusiness
                              size={16}
                            />

                            {job.type}
                          </span>

                          <span>
                            {job.experience}
                          </span>

                        </div>

                      </div>

                      <div className="job-card-side">

                        <div className="match-score">

                          <strong>
                            {job.match}%
                          </strong>

                          <span>
                            AI Match
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =================================================
                        CARD FOOTER
                    ================================================= */}

                    <div className="job-card-footer">

                      <div>

                        <span className="salary">
                          {job.salary}
                        </span>

                        <span className="posted-time">

                          <Clock3 size={15} />

                          {job.posted}

                        </span>

                      </div>

                      {/* =================================================
                          THIS IS THE IMPORTANT PART
                      ================================================= */}

                      <button
                        className="view-job-button"
                        onClick={() =>
                          navigate(
                            `/jobs/${job.id}`
                          )
                        }
                      >
                        View role

                        <ArrowUpRight
                          size={18}
                        />
                      </button>

                    </div>

                  </article>

                );
              })

            ) : (

              <div className="no-jobs">

                <h3>
                  No opportunities found
                </h3>

                <p>
                  Try changing your search or
                  filters to discover more
                  opportunities.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default FindJobs;