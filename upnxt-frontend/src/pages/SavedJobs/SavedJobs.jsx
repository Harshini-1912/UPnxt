import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Clock3,
  Trash2,
  ArrowRight,
  Search,
} from "lucide-react";

import "./SavedJobs.css";

const getCurrentUser = () => {
  const keys = [
    "upnxtCurrentUser",
    "currentUser",
    "upnxtUser",
    "loggedInUser",
    "user",
  ];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    try {
      return JSON.parse(value);
    } catch {
      return { email: value };
    }
  }

  return {};
};

const getUserId = () => {
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

const getSavedJobs = () => {
  const userId = getUserId();

  const keys = [
    `upnxtSavedJobs_${userId}`,
    "upnxtSavedJobs",
    `savedJobs_${userId}`,
    "savedJobs",
  ];

  for (const key of keys) {
    const stored = localStorage.getItem(key);

    if (!stored) continue;

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return [];
    }
  }

  return [];
};

function SavedJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(
    getSavedJobs()
  );

  useEffect(() => {
    const refresh = () => {
      setJobs(getSavedJobs());
    };

    refresh();

    window.addEventListener(
      "focus",
      refresh
    );

    return () => {
      window.removeEventListener(
        "focus",
        refresh
      );
    };
  }, []);

  const removeJob = (jobToRemove) => {
    const userId = getUserId();

    const updated = jobs.filter(
      (job) =>
        String(job?.id) !==
        String(jobToRemove?.id)
    );

    localStorage.setItem(
      `upnxtSavedJobs_${userId}`,
      JSON.stringify(updated)
    );

    setJobs(updated);
  };

  return (
    <div className="saved-jobs-page">

      <section className="saved-jobs-header">

        <div>
          <p className="saved-eyebrow">
            YOUR COLLECTION
          </p>

          <h1>Saved Jobs</h1>

          <p>
            Keep the opportunities you want
            to come back to.
          </p>
        </div>

        <div className="saved-count">
          <Bookmark size={20} />
          <strong>{jobs.length}</strong>
          <span>saved</span>
        </div>

      </section>

      {jobs.length === 0 ? (
        <div className="saved-empty">

          <div className="saved-empty-icon">
            <Bookmark size={38} />
          </div>

          <h2>No saved jobs yet</h2>

          <p>
            When you find a job you want to
            revisit, save it here.
          </p>

          <button
            onClick={() => navigate("/jobs")}
          >
            Explore Jobs
            <ArrowRight size={18} />
          </button>

        </div>
      ) : (
        <div className="saved-jobs-list">

          {jobs.map((job, index) => {

            const title =
              job?.title ||
              job?.jobTitle ||
              "Untitled Position";

            const company =
              job?.company ||
              job?.companyName ||
              "Company";

            const location =
              job?.location ||
              "India";

            const type =
              job?.type ||
              job?.jobType ||
              "Full Time";

            return (
              <article
                className="saved-job-card"
                key={
                  job?.id ||
                  `${title}-${index}`
                }
              >

                <div className="saved-job-logo">
                  <BriefcaseBusiness
                    size={24}
                  />
                </div>

                <div className="saved-job-main">

                  <h2>{title}</h2>

                  <p className="saved-company">
                    {company}
                  </p>

                  <div className="saved-job-meta">

                    <span>
                      <MapPin size={14} />
                      {location}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {type}
                    </span>

                  </div>

                </div>

                <div className="saved-job-actions">

                  <button
                    className="remove-saved"
                    onClick={() =>
                      removeJob(job)
                    }
                    title="Remove saved job"
                  >
                    <Trash2 size={17} />
                  </button>

                  <button
                    className="view-saved"
                    onClick={() =>
                      navigate(
                        `/jobs/${job?.id || ""}`
                      )
                    }
                  >
                    View Job
                    <ArrowRight size={16} />
                  </button>

                </div>

              </article>
            );
          })}

        </div>
      )}

      <div className="saved-bottom-card">

        <Search size={22} />

        <div>
          <strong>
            Looking for something new?
          </strong>

          <p>
            Explore more opportunities on
            UPnxt.
          </p>
        </div>

        <button
          onClick={() => navigate("/jobs")}
        >
          Find Jobs
          <ArrowRight size={16} />
        </button>

      </div>

    </div>
  );
}

export default SavedJobs;