import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  ShieldCheck,
  Bell,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";


/* =========================================================
   GET CURRENT USER
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
      return {
        email: stored,
      };
    }
  }

  return {};
};


/* =========================================================
   GET USER PROFILE
========================================================= */

const getUserProfile = () => {
  const user = getCurrentUser();

  const email =
    user?.email ||
    user?.username ||
    user?.userEmail ||
    "";

  if (!email) {
    return {
      ...user,
      photo: "",
      gender: "Female",
    };
  }

  const profileKey =
    `upnxtProfile_${email.toLowerCase().trim()}`;

  const storedProfile =
    localStorage.getItem(profileKey);

  if (!storedProfile) {
    return {
      ...user,
      photo: "",
      gender: "Female",
    };
  }

  try {
    const profile =
      JSON.parse(storedProfile);

    return {
      ...user,
      ...profile,
    };
  } catch {
    return {
      ...user,
      photo: "",
      gender: "Female",
    };
  }
};


/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar = ({ isOpen, onToggle }) => {

  const location = useLocation();

  const [profile, setProfile] = useState(
    getUserProfile()
  );


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={21} />,
    },
    {
      name: "Find Jobs",
      path: "/jobs",
      icon: <Search size={21} />,
    },
    {
      name: "My Applications",
      path: "/applications",
      icon: <FileText size={21} />,
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      icon: <Bookmark size={21} />,
    },
    {
      name: "Assessments",
      path: "/assessments",
      icon: <ShieldCheck size={21} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <Bell size={21} />,
    },
    {
      name: "Career Insights",
      path: "/career-insights",
      icon: <Sparkles size={21} />,
    },
  ];


  /* =======================================================
     REFRESH PROFILE WHEN ROUTE CHANGES
     
     This means when the user saves their profile and
     returns to Dashboard, the sidebar immediately reads
     the updated photo/name/gender.
  ======================================================= */

  useEffect(() => {
    setProfile(getUserProfile());
  }, [location.pathname]);


  /* =======================================================
     ALSO REFRESH WHEN TAB GETS FOCUS
  ======================================================= */

  useEffect(() => {

    const refreshProfile = () => {
      setProfile(getUserProfile());
    };

    window.addEventListener(
      "focus",
      refreshProfile
    );

    return () => {
      window.removeEventListener(
        "focus",
        refreshProfile
      );
    };

  }, []);


  /* =======================================================
     USER NAME
  ======================================================= */

  const firstName =
    profile?.firstName ||
    profile?.name?.split(" ")[0] ||
    "User";


  const lastName =
    profile?.lastName ||
    profile?.name
      ?.split(" ")
      .slice(1)
      .join(" ") ||
    "";


  const fullName =
    `${firstName} ${lastName}`.trim();


  const email =
    profile?.email ||
    "Add your email";


  /* =======================================================
     GENDER AVATAR
  ======================================================= */

  const getGenderIcon = () => {

    if (profile?.gender === "Female") {
      return "👩🏻";
    }

    if (profile?.gender === "Male") {
      return "👨🏻";
    }

    return "👤";
  };


  /* =======================================================
     SIDEBAR CONTENT
  ======================================================= */

  return (
    <>

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`sidebar ${
          isOpen ? "open" : "closed"
        }`}
      >

        <div className="sidebar-inner">


          {/* ==============================================
              HEADER
          ============================================== */}

          <div className="sidebar-top">

            <h1 className="sidebar-logo">
              UpNxt
            </h1>


            <button
              className="sidebar-hide-btn"
              onClick={onToggle}
              aria-label="Close sidebar"
              title="Hide sidebar"
            >
              <ChevronLeft size={22} />
            </button>

          </div>


          {/* ==============================================
              USER
          ============================================== */}

          <div className="sidebar-user">


            {/* PROFILE PHOTO / GENDER AVATAR */}

            <div className="sidebar-avatar">

              {profile?.photo ? (

                <img
                  src={profile.photo}
                  alt={`${fullName} profile`}
                  className="sidebar-profile-image"
                />

              ) : (

                <span className="sidebar-gender-avatar">
                  {getGenderIcon()}
                </span>

              )}

            </div>


            {/* USER DETAILS */}

            <div className="sidebar-user-info">

              <h3 title={fullName}>
                {fullName}
              </h3>

              <p title={email}>
                {email}
              </p>

            </div>

          </div>


          {/* ==============================================
              NAVIGATION
          ============================================== */}

          <nav className="sidebar-nav">

            {navigation.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >

                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </NavLink>

            ))}

          </nav>


          {/* ==============================================
              BOTTOM
          ============================================== */}

          <div className="sidebar-bottom">

            <button
              className="sidebar-link logout-btn"
              onClick={() => {
                localStorage.removeItem(
                  "upnxtCurrentUser"
                );

                window.location.href = "/";
              }}
            >

              <span className="sidebar-icon">

                <LogOut size={21} />

              </span>

              <span>
                Logout
              </span>

            </button>

          </div>

        </div>

      </aside>


      {/* ===================================================
          EXPAND BUTTON WHEN SIDEBAR IS CLOSED
      =================================================== */}

      {!isOpen && (
        <button
          className="sidebar-expand-btn"
          onClick={onToggle}
          aria-label="Open sidebar"
          title="Show sidebar"
        >
          <ChevronRight size={21} />
        </button>
      )}

    </>
  );
};


export default Sidebar;