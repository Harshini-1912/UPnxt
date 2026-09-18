import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyApplications.css";

function MyApplications() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: 1,
      title: "Backend Engineer",
      company: "Nova Systems",
      location: "Hyderabad, India",
      type: "Full-time",
      appliedDate: "Today",
      status: "Under Review",
      logo: "N",
    },
    {
      id: 2,
      title: "Java Developer",
      company: "TechSphere",
      location: "Bangalore, India",
      type: "Full-time",
      appliedDate: "2 days ago",
      status: "Application Viewed",
      logo: "T",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "CloudStack",
      location: "Remote",
      type: "Full-time",
      appliedDate: "5 days ago",
      status: "Interview",
      logo: "C",
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Pixel Labs",
      location: "Chennai, India",
      type: "Full-time",
      appliedDate: "1 week ago",
      status: "Rejected",
      logo: "P",
    },
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesFilter =
        activeFilter === "All" ||
        application.status === activeFilter;

      const search = (searchTerm || "").toLowerCase();

      const title = (
        application.title || ""
      ).toLowerCase();

      const company = (
        application.company || ""
      ).toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        company.includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status === "Under Review" ||
      application.status === "Application Viewed" ||
      application.status === "Interview"
  ).length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "Under Review":
        return "status-review";

      case "Application Viewed":
        return "status-viewed";

      case "Interview":
        return "status-interview";

      case "Rejected":
        return "status-rejected";

      default:
        return "";
    }
  };

  return (
    <div className="my-applications-page">
      {/* HEADER */}

      <div className="my-applications-header">
        <div>
          <p className="applications-eyebrow">
            APPLICATION DASHBOARD
          </p>

          <h1>My applications.</h1>

          <p className="applications-subtitle">
            Track every opportunity and stay updated on your
            application progress.
          </p>
        </div>

        <button
          className="explore-jobs-button"
          onClick={() => navigate("/")}
        >
          Explore jobs
          <span>↗</span>
        </button>
      </div>

      {/* STATS */}

      <div className="applications-stats">
        <div className="application-stat-card">
          <div className="stat-icon total-icon">
            📄
          </div>

          <div>
            <span>Total applications</span>
            <strong>{totalApplications}</strong>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="stat-icon active-icon">
            ◉
          </div>

          <div>
            <span>Active applications</span>
            <strong>{activeApplications}</strong>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="stat-icon interview-icon">
            ✦
          </div>

          <div>
            <span>Interviews</span>
            <strong>{interviews}</strong>
          </div>
        </div>
      </div>

      {/* APPLICATION CONTENT */}

      <div className="applications-content">
        <div className="applications-toolbar">
          <div>
            <h2>Applications</h2>

            <p>
              {filteredApplications.length} opportunities found
            </p>
          </div>

          <div className="applications-actions">
            <div className="application-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* FILTERS */}

        <div className="application-filters">
          {[
            "All",
            "Under Review",
            "Application Viewed",
            "Interview",
            "Rejected",
          ].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "application-filter active"
                  : "application-filter"
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* APPLICATION LIST */}

        <div className="applications-list">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(
              (application) => (
                <div
                  className="my-application-card"
                  key={application.id}
                >
                  <div className="application-main-info">
                    <div className="application-company-logo">
                      {application.logo}
                    </div>

                    <div className="application-info">
                      <div className="application-title-row">
                        <h3>
                          {application.title}
                        </h3>

                        <span
                          className={`application-status ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </div>

                      <p className="application-company">
                        {application.company}
                      </p>

                      <div className="application-meta">
                        <span>
                          {application.location}
                        </span>

                        <span className="meta-divider">
                          •
                        </span>

                        <span>
                          {application.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="application-right">
                    <div className="application-date">
                      <span>Applied</span>

                      <strong>
                        {application.appliedDate}
                      </strong>
                    </div>

                    <button
                      className="view-job-button"
                      onClick={() =>
                        navigate(
                          `/jobs/${encodeURIComponent(
                            application.title || ""
                          )}`
                        )
                      }
                    >
                      View job
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="applications-empty-state">
              <div className="empty-icon">
                ⌕
              </div>

              <h3>
                No applications found
              </h3>

              <p>
                Try searching for another role or change
                your filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplications;