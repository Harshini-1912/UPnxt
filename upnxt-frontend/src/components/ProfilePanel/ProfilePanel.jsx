import {
  X,
  LayoutDashboard,
  UserRound,
  FileText,
  Bookmark,
  Sparkles,
  Bell,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./ProfilePanel.css";

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "U";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[1].charAt(0)
  ).toUpperCase();
}

function ProfilePanel({
  isOpen,
  onClose,
  userName = "Harshini Neeladhri",
  userEmail = "harshini@example.com",
}) {
  const navigate = useNavigate();

  const initials = getInitials(userName);

  const menuItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <UserRound size={18} />,
      label: "Personal Details",
      path: "/personal-details",
    },
    {
      icon: <FileText size={18} />,
      label: "My Applications",
      path: "/my-applications",
    },
    {
      icon: <Bookmark size={18} />,
      label: "Saved Jobs",
      path: "/saved-jobs",
    },
    {
      icon: <Sparkles size={18} />,
      label: "Career Insights",
      path: "/career-insights",
    },
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      path: "/notifications",
    },
  ];

  const bottomItems = [
    {
      icon: <Settings size={18} />,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: <ShieldCheck size={18} />,
      label: "Privacy & Security",
      path: "/privacy",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    navigate("/welcome");
    onClose();
  };

  return (
    <>
      {/* DARK BACKGROUND OVERLAY */}
      <div
        className={`profile-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      {/* SIDE PANEL */}
      <aside
        className={`profile-panel ${isOpen ? "open" : ""}`}
      >
        {/* HEADER */}
        <div className="profile-panel-header">
          <div className="panel-brand">
            <span>Up</span>Nxt
          </div>

          <button
            className="panel-close"
            onClick={onClose}
            aria-label="Close profile menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* USER INFO */}
        <div className="panel-user">
          <div className="panel-avatar">
            {initials}
          </div>

          <div className="panel-user-info">
            <h3>{userName}</h3>
            <p>{userEmail}</p>
          </div>
        </div>

        <div className="panel-divider" />

        {/* MAIN MENU */}
        <nav className="panel-navigation">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="panel-menu-item"
              onClick={() => handleNavigate(item.path)}
            >
              <span className="panel-menu-left">
                <span className="panel-menu-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </span>

              <ChevronRight size={16} />
            </button>
          ))}
        </nav>

        {/* BOTTOM MENU */}
        <div className="panel-bottom">
          <div className="panel-divider" />

          {bottomItems.map((item) => (
            <button
              key={item.label}
              className="panel-menu-item"
              onClick={() => handleNavigate(item.path)}
            >
              <span className="panel-menu-left">
                <span className="panel-menu-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </span>

              <ChevronRight size={16} />
            </button>
          ))}

          <button
            className="panel-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default ProfilePanel;