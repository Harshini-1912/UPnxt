import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  GraduationCap,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  UserRound,
  X,
  FileText,
  Globe,
  Sparkles,
  Phone,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./PersonalDetails.css";

/* =========================================================
   EMPTY PROFILE
   No user's education, experience or skills are hardcoded.
========================================================= */

const createEmptyProfile = (user = {}) => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  email: user.email || "",
  phone: user.phone || "",
  gender: user.gender || "Female",

  headline: "",
  location: "",

  about: "",

  photo: "",

  skills: [],

  education: [],

  experience: [],

  resumeName: "",

  linkedin: "",
  github: "",
  portfolio: "",

  preferredRole: "",
  preferredLocation: "",
  workMode: "Hybrid",
});


/* =========================================================
   FIND CURRENT LOGGED-IN USER
   This supports common localStorage formats.
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
   USER-SPECIFIC PROFILE KEY
========================================================= */

const getProfileKey = (user) => {
  const email =
    user?.email ||
    user?.username ||
    user?.userEmail ||
    "";

  if (email) {
    return `upnxtProfile_${email.toLowerCase().trim()}`;
  }

  return "upnxtProfile_guest";
};


/* =========================================================
   PROFILE PAGE
========================================================= */

function PersonalDetails() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [currentUser, setCurrentUser] = useState({});
  const [profileKey, setProfileKey] = useState(
    "upnxtProfile_guest"
  );

  const [profile, setProfile] = useState(
    createEmptyProfile()
  );

  const [draft, setDraft] = useState(
    createEmptyProfile()
  );

  const [editing, setEditing] = useState(false);

  const [activeSection, setActiveSection] =
    useState("personal");

  const [newSkill, setNewSkill] = useState("");

  const [saved, setSaved] = useState(false);


  /* =========================================================
     EDUCATION FORM
  ========================================================= */

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    year: "",
    description: "",
  });


  /* =========================================================
     EXPERIENCE FORM
  ========================================================= */

  const [experienceForm, setExperienceForm] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });


  /* =========================================================
     LOAD USER PROFILE
  ========================================================= */

  useEffect(() => {
    const user = getCurrentUser();

    const key = getProfileKey(user);

    setCurrentUser(user);
    setProfileKey(key);

    const storedProfile = localStorage.getItem(key);

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);

        const safeProfile = {
          ...createEmptyProfile(user),
          ...parsedProfile,

          skills: Array.isArray(parsedProfile.skills)
            ? parsedProfile.skills
            : [],

          education: Array.isArray(parsedProfile.education)
            ? parsedProfile.education
            : [],

          experience: Array.isArray(parsedProfile.experience)
            ? parsedProfile.experience
            : [],
        };

        setProfile(safeProfile);
        setDraft(safeProfile);
      } catch {
        const emptyProfile = createEmptyProfile(user);

        setProfile(emptyProfile);
        setDraft(emptyProfile);
      }
    } else {
      const emptyProfile = createEmptyProfile(user);

      setProfile(emptyProfile);
      setDraft(emptyProfile);
    }
  }, []);


  /* =========================================================
     UPDATE PROFILE
  ========================================================= */

  const updateDraft = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };


  /* =========================================================
     PROFILE COMPLETION
  ========================================================= */

  const completion = useMemo(() => {
    const checks = [
      draft.firstName,
      draft.lastName,
      draft.email,
      draft.phone,
      draft.gender,
      draft.headline,
      draft.location,
      draft.about,
      draft.skills?.length > 0,
      draft.education?.length > 0,
      draft.experience?.length > 0,
      draft.resumeName,
      draft.linkedin,
      draft.github,
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round(
      (completed / checks.length) * 100
    );
  }, [draft]);


  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const saveProfile = () => {
    /*
      Always save using the user's own profile key.
    */

    let finalKey = profileKey;

    /*
      If the user entered an email manually,
      use that email as their profile identity.
    */

    if (draft.email?.trim()) {
      finalKey = `upnxtProfile_${draft.email
        .toLowerCase()
        .trim()}`;

      setProfileKey(finalKey);
    }

    localStorage.setItem(
      finalKey,
      JSON.stringify(draft)
    );

    /*
      Also keep the active user available for
      future pages.
    */

    if (draft.email?.trim()) {
      const updatedUser = {
        ...currentUser,
        email: draft.email,
        firstName: draft.firstName,
        lastName: draft.lastName,
      };

      localStorage.setItem(
        "upnxtCurrentUser",
        JSON.stringify(updatedUser)
      );

      setCurrentUser(updatedUser);
    }

    setProfile(draft);

    setEditing(false);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  /* =========================================================
     CANCEL
  ========================================================= */

  const cancelEditing = () => {
    setDraft(profile);

    setEditing(false);

    setNewSkill("");

    setEducationForm({
      degree: "",
      institution: "",
      year: "",
      description: "",
    });

    setExperienceForm({
      role: "",
      company: "",
      duration: "",
      description: "",
    });
  };


  /* =========================================================
     PROFILE PHOTO
  ========================================================= */

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile photo must be smaller than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateDraft("photo", reader.result);
    };

    reader.readAsDataURL(file);
  };


  const removePhoto = () => {
    updateDraft("photo", "");
  };


  /* =========================================================
     RESUME
  ========================================================= */

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Resume must be smaller than 10MB.");
      return;
    }

    updateDraft("resumeName", file.name);
  };


  /* =========================================================
     SKILLS
  ========================================================= */

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    const exists = draft.skills.some(
      (item) =>
        item.toLowerCase() === skill.toLowerCase()
    );

    if (exists) {
      setNewSkill("");
      return;
    }

    updateDraft("skills", [
      ...draft.skills,
      skill,
    ]);

    setNewSkill("");
  };


  const removeSkill = (skillToRemove) => {
    updateDraft(
      "skills",
      draft.skills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };


  /* =========================================================
     EDUCATION
  ========================================================= */

  const addEducation = () => {
    if (
      !educationForm.degree.trim() ||
      !educationForm.institution.trim()
    ) {
      alert(
        "Please enter your degree and institution."
      );

      return;
    }

    const newEducation = {
      id: Date.now(),
      degree: educationForm.degree.trim(),
      institution:
        educationForm.institution.trim(),
      year: educationForm.year.trim(),
      description:
        educationForm.description.trim(),
    };

    updateDraft("education", [
      ...draft.education,
      newEducation,
    ]);

    setEducationForm({
      degree: "",
      institution: "",
      year: "",
      description: "",
    });
  };


  const removeEducation = (id) => {
    updateDraft(
      "education",
      draft.education.filter(
        (item) => item.id !== id
      )
    );
  };


  /* =========================================================
     EXPERIENCE
  ========================================================= */

  const addExperience = () => {
    if (
      !experienceForm.role.trim() ||
      !experienceForm.company.trim()
    ) {
      alert(
        "Please enter your role and company."
      );

      return;
    }

    const newExperience = {
      id: Date.now(),
      role: experienceForm.role.trim(),
      company:
        experienceForm.company.trim(),
      duration:
        experienceForm.duration.trim(),
      description:
        experienceForm.description.trim(),
    };

    updateDraft("experience", [
      ...draft.experience,
      newExperience,
    ]);

    setExperienceForm({
      role: "",
      company: "",
      duration: "",
      description: "",
    });
  };


  const removeExperience = (id) => {
    updateDraft(
      "experience",
      draft.experience.filter(
        (item) => item.id !== id
      )
    );
  };


  /* =========================================================
     INITIALS
  ========================================================= */

  const getInitials = () => {
    const first =
      draft.firstName?.charAt(0) || "";

    const last =
      draft.lastName?.charAt(0) || "";

    const initials =
      `${first}${last}`.toUpperCase();

    return initials || "U";
  };


  /* =========================================================
     GENDER AVATAR
  ========================================================= */

  const getGenderIcon = () => {
    if (draft.gender === "Female") {
      return "👩🏻";
    }

    if (draft.gender === "Male") {
      return "👨🏻";
    }

    return "👤";
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="profile-page">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="profile-topbar">

        <button
          className="profile-back-button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>


        <div className="profile-topbar-title">
          <span>YOUR PROFILE</span>

          <h1>
            Personal details
          </h1>
        </div>


        <div className="profile-actions">

          {saved && (
            <div className="profile-saved-message">
              <CheckCircle2 size={17} />
              Saved successfully
            </div>
          )}


          {!editing ? (
            <button
              className="profile-edit-button"
              onClick={() =>
                setEditing(true)
              }
            >
              <Pencil size={17} />
              Edit profile
            </button>
          ) : (
            <>
              <button
                className="profile-cancel-button"
                onClick={cancelEditing}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={saveProfile}
              >
                <Save size={17} />
                Save changes
              </button>
            </>
          )}

        </div>

      </header>


      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <section className="profile-hero">

        <div className="profile-hero-left">

          <div className="profile-avatar-wrapper">

            {draft.photo ? (
              <img
                src={draft.photo}
                alt="Profile"
                className="profile-avatar-image"
              />
            ) : (
              <div className="profile-avatar-default">

                <span className="profile-gender-avatar">
                  {getGenderIcon()}
                </span>

                <span className="profile-initials">
                  {getInitials()}
                </span>

              </div>
            )}


            {editing && (
              <>
                <button
                  className="profile-camera-button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  title="Change profile photo"
                >
                  <Camera size={17} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoUpload}
                />
              </>
            )}

          </div>


          <div className="profile-identity">

            <div className="profile-name-row">

              <h2>
                {draft.firstName ||
                  "Your name"}{" "}
                {draft.lastName || ""}
              </h2>

              <span className="profile-verified">
                <Check size={13} />
                Profile
              </span>

            </div>


            <p className="profile-headline">

              {draft.headline ||
                "Add your professional headline"}

            </p>


            <div className="profile-location">

              <MapPin size={15} />

              {draft.location ||
                "Add your location"}

            </div>


            {editing && draft.photo && (
              <button
                className="remove-photo-button"
                onClick={removePhoto}
              >
                <Trash2 size={14} />
                Remove photo
              </button>
            )}

          </div>

        </div>


        {/* PROFILE COMPLETION */}

        <div className="profile-completion-card">

          <div className="completion-top">

            <div>

              <span>
                PROFILE STRENGTH
              </span>

              <strong>
                {completion}%
              </strong>

            </div>


            <div className="completion-icon">
              <Sparkles size={19} />
            </div>

          </div>


          <div className="completion-track">

            <div
              className="completion-fill"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>


          <p>

            {completion >= 90
              ? "Your profile is looking complete."
              : "Complete more details to improve your job matches."}

          </p>

        </div>

      </section>


      {/* =====================================================
          PROFILE CONTENT
      ===================================================== */}

      <section className="profile-layout">

        {/* LEFT NAV */}

        <aside className="profile-section-nav">

          <button
            className={
              activeSection === "personal"
                ? "profile-nav-item active"
                : "profile-nav-item"
            }
            onClick={() =>
              setActiveSection("personal")
            }
          >
            <UserRound size={18} />
            Personal information
          </button>


          <button
            className={
              activeSection === "professional"
                ? "profile-nav-item active"
                : "profile-nav-item"
            }
            onClick={() =>
              setActiveSection(
                "professional"
              )
            }
          >
            <BriefcaseBusiness size={18} />
            Professional
          </button>


          <button
            className={
              activeSection === "education"
                ? "profile-nav-item active"
                : "profile-nav-item"
            }
            onClick={() =>
              setActiveSection("education")
            }
          >
            <GraduationCap size={18} />
            Education
          </button>


          <button
            className={
              activeSection === "experience"
                ? "profile-nav-item active"
                : "profile-nav-item"
            }
            onClick={() =>
              setActiveSection("experience")
            }
          >
            <BriefcaseBusiness size={18} />
            Experience
          </button>


          <button
            className={
              activeSection === "preferences"
                ? "profile-nav-item active"
                : "profile-nav-item"
            }
            onClick={() =>
              setActiveSection(
                "preferences"
              )
            }
          >
            <Sparkles size={18} />
            Career preferences
          </button>

        </aside>


        {/* MAIN CONTENT */}

        <div className="profile-main">


          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          {activeSection === "personal" && (
            <section className="profile-section-card">

              <div className="profile-card-heading">

                <div>

                  <span>
                    01 · PERSONAL
                  </span>

                  <h2>
                    Personal information
                  </h2>

                  <p>
                    Keep your contact and identity
                    details up to date.
                  </p>

                </div>


                {!editing && (
                  <button
                    className="small-edit-button"
                    onClick={() =>
                      setEditing(true)
                    }
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                )}

              </div>


              <div className="profile-form-grid">

                <ProfileField
                  label="First name"
                  value={draft.firstName}
                  editing={editing}
                  onChange={(value) =>
                    updateDraft(
                      "firstName",
                      value
                    )
                  }
                />


                <ProfileField
                  label="Last name"
                  value={draft.lastName}
                  editing={editing}
                  onChange={(value) =>
                    updateDraft(
                      "lastName",
                      value
                    )
                  }
                />


                <ProfileField
                  label="Email address"
                  value={draft.email}
                  editing={editing}
                  type="email"
                  icon={<Mail size={16} />}
                  onChange={(value) =>
                    updateDraft(
                      "email",
                      value
                    )
                  }
                />


                <ProfileField
                  label="Phone number"
                  value={draft.phone}
                  editing={editing}
                  icon={<Phone size={16} />}
                  onChange={(value) =>
                    updateDraft(
                      "phone",
                      value
                    )
                  }
                />


                {/* GENDER */}

                <div className="profile-field">

                  <label>
                    Gender
                  </label>


                  {editing ? (
                    <select
                      value={draft.gender}
                      onChange={(e) =>
                        updateDraft(
                          "gender",
                          e.target.value
                        )
                      }
                    >

                      <option value="Female">
                        Female
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>

                    </select>
                  ) : (
                    <div className="profile-read-value">

                      <span className="gender-mini-icon">
                        {getGenderIcon()}
                      </span>

                      {draft.gender ||
                        "Not specified"}

                    </div>
                  )}

                </div>


                <ProfileField
                  label="Location"
                  value={draft.location}
                  editing={editing}
                  icon={<MapPin size={16} />}
                  onChange={(value) =>
                    updateDraft(
                      "location",
                      value
                    )
                  }
                />

              </div>

            </section>
          )}


          {/* =================================================
              PROFESSIONAL
          ================================================= */}

          {activeSection === "professional" && (
            <>

              <section className="profile-section-card">

                <div className="profile-card-heading">

                  <div>

                    <span>
                      02 · PROFESSIONAL
                    </span>

                    <h2>
                      Professional profile
                    </h2>

                    <p>
                      Tell recruiters what you do and
                      what you bring to the table.
                    </p>

                  </div>

                </div>


                <div className="profile-single-form">

                  <ProfileField
                    label="Professional headline"
                    value={draft.headline}
                    editing={editing}
                    onChange={(value) =>
                      updateDraft(
                        "headline",
                        value
                      )
                    }
                  />


                  <div className="profile-field">

                    <label>
                      About me
                    </label>


                    {editing ? (
                      <textarea
                        rows="6"
                        value={draft.about}
                        onChange={(e) =>
                          updateDraft(
                            "about",
                            e.target.value
                          )
                        }
                        placeholder="Tell recruiters about yourself..."
                      />
                    ) : (
                      <p className="profile-about-text">

                        {draft.about ||
                          "Add a short professional introduction."}

                      </p>
                    )}

                  </div>

                </div>

              </section>


              {/* SKILLS */}

              <section className="profile-section-card">

                <div className="profile-card-heading">

                  <div>

                    <span>
                      YOUR TOOLKIT
                    </span>

                    <h2>
                      Skills
                    </h2>

                    <p>
                      Add the skills you want recruiters
                      to know about.
                    </p>

                  </div>

                </div>


                <div className="skills-container">

                  {draft.skills.length === 0 ? (

                    <div className="empty-profile-state">

                      <Sparkles size={26} />

                      <h3>
                        No skills added yet
                      </h3>

                      <p>
                        Add your technical and
                        professional skills below.
                      </p>

                    </div>

                  ) : (

                    draft.skills.map((skill) => (

                      <div
                        className="profile-skill"
                        key={skill}
                      >

                        <Check size={14} />

                        {skill}


                        {editing && (
                          <button
                            onClick={() =>
                              removeSkill(skill)
                            }
                          >
                            <X size={13} />
                          </button>
                        )}

                      </div>

                    ))

                  )}

                </div>


                {editing && (
                  <div className="add-skill-row">

                    <input
                      type="text"
                      placeholder="Add a skill e.g. Java"
                      value={newSkill}
                      onChange={(e) =>
                        setNewSkill(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {

                        if (
                          e.key === "Enter"
                        ) {
                          e.preventDefault();
                          addSkill();
                        }

                      }}
                    />


                    <button
                      onClick={addSkill}
                    >
                      <Plus size={17} />
                      Add skill
                    </button>

                  </div>
                )}

              </section>


              {/* PROFESSIONAL LINKS */}

              <section className="profile-section-card">

                <div className="profile-card-heading">

                  <div>

                    <span>
                      ONLINE PRESENCE
                    </span>

                    <h2>
                      Professional links
                    </h2>

                    <p>
                      Help recruiters learn more
                      about your work.
                    </p>

                  </div>

                </div>


                <div className="profile-form-grid">

                  <ProfileField
                    label="LinkedIn"
                    value={draft.linkedin}
                    editing={editing}
                    icon={
                      <ExternalLink size={16} />
                    }
                    placeholder="linkedin.com/in/yourname"
                    onChange={(value) =>
                      updateDraft(
                        "linkedin",
                        value
                      )
                    }
                  />


                  <ProfileField
                    label="GitHub"
                    value={draft.github}
                    editing={editing}
                    icon={
                      <ExternalLink size={16} />
                    }
                    placeholder="github.com/yourusername"
                    onChange={(value) =>
                      updateDraft(
                        "github",
                        value
                      )
                    }
                  />


                  <ProfileField
                    label="Portfolio"
                    value={draft.portfolio}
                    editing={editing}
                    icon={<Globe size={16} />}
                    placeholder="yourportfolio.com"
                    onChange={(value) =>
                      updateDraft(
                        "portfolio",
                        value
                      )
                    }
                  />

                </div>

              </section>


              {/* RESUME */}

              <section className="profile-section-card">

                <div className="profile-card-heading">

                  <div>

                    <span>
                      CAREER DOCUMENT
                    </span>

                    <h2>
                      Resume
                    </h2>

                    <p>
                      Keep your latest resume
                      ready for applications.
                    </p>

                  </div>

                </div>


                <div className="resume-profile-card">

                  <div className="resume-profile-icon">
                    <FileText size={23} />
                  </div>


                  <div className="resume-profile-info">

                    <strong>

                      {draft.resumeName ||
                        "No resume uploaded"}

                    </strong>


                    <span>

                      {draft.resumeName
                        ? "Ready for job applications"
                        : "PDF, DOC or DOCX · Maximum 10MB"}

                    </span>

                  </div>


                  {editing && (
                    <>
                      <button
                        className="resume-upload-button"
                        onClick={() =>
                          resumeInputRef.current?.click()
                        }
                      >
                        <Upload size={16} />

                        {draft.resumeName
                          ? "Replace"
                          : "Upload"}

                      </button>


                      <input
                        ref={resumeInputRef}
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={
                          handleResumeUpload
                        }
                      />
                    </>
                  )}

                </div>

              </section>

            </>
          )}


          {/* =================================================
              EDUCATION
          ================================================= */}

          {activeSection === "education" && (
            <section className="profile-section-card">

              <div className="profile-card-heading">

                <div>

                  <span>
                    03 · EDUCATION
                  </span>

                  <h2>
                    Education
                  </h2>

                  <p>
                    Add your own academic background
                    and qualifications.
                  </p>

                </div>

              </div>


              <div className="timeline">

                {draft.education.length === 0 ? (

                  <div className="empty-profile-state">

                    <GraduationCap size={32} />

                    <h3>
                      No education added yet
                    </h3>

                    <p>
                      Click Edit profile to add
                      your degree or qualification.
                    </p>

                  </div>

                ) : (

                  draft.education.map((item) => (

                    <article
                      className="timeline-item"
                      key={item.id}
                    >

                      <div className="timeline-icon">
                        <GraduationCap size={18} />
                      </div>


                      <div className="timeline-content">

                        <div className="timeline-title-row">

                          <div>

                            <h3>
                              {item.degree}
                            </h3>

                            <span>
                              {item.institution}
                            </span>

                          </div>


                          {editing && (
                            <button
                              className="delete-item-button"
                              onClick={() =>
                                removeEducation(
                                  item.id
                                )
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          )}

                        </div>


                        {item.year && (
                          <small>
                            {item.year}
                          </small>
                        )}


                        {item.description && (
                          <p>
                            {item.description}
                          </p>
                        )}

                      </div>

                    </article>

                  ))

                )}

              </div>


              {/* ADD EDUCATION */}

              {editing && (
                <div className="add-record-box">

                  <h3>
                    <Plus size={18} />
                    Add education
                  </h3>


                  <div className="profile-form-grid">

                    <input
                      placeholder="Degree / qualification"
                      value={
                        educationForm.degree
                      }
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          degree:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Institution"
                      value={
                        educationForm.institution
                      }
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          institution:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Year e.g. 2022 - 2026"
                      value={
                        educationForm.year
                      }
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          year:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Specialization / description"
                      value={
                        educationForm.description
                      }
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          description:
                            e.target.value,
                        })
                      }
                    />

                  </div>


                  <button
                    className="add-record-button"
                    onClick={addEducation}
                  >
                    <Plus size={16} />
                    Add education
                  </button>

                </div>
              )}

            </section>
          )}


          {/* =================================================
              EXPERIENCE
          ================================================= */}

          {activeSection === "experience" && (
            <section className="profile-section-card">

              <div className="profile-card-heading">

                <div>

                  <span>
                    04 · EXPERIENCE
                  </span>

                  <h2>
                    Experience
                  </h2>

                  <p>
                    Add internships, projects and
                    professional experience.
                  </p>

                </div>

              </div>


              <div className="timeline">

                {draft.experience.length === 0 ? (

                  <div className="empty-profile-state">

                    <BriefcaseBusiness size={32} />

                    <h3>
                      No experience added yet
                    </h3>

                    <p>
                      Click Edit profile to add
                      internships, projects or work.
                    </p>

                  </div>

                ) : (

                  draft.experience.map((item) => (

                    <article
                      className="timeline-item"
                      key={item.id}
                    >

                      <div className="timeline-icon">
                        <BriefcaseBusiness
                          size={18}
                        />
                      </div>


                      <div className="timeline-content">

                        <div className="timeline-title-row">

                          <div>

                            <h3>
                              {item.role}
                            </h3>

                            <span>
                              {item.company}
                            </span>

                          </div>


                          {editing && (
                            <button
                              className="delete-item-button"
                              onClick={() =>
                                removeExperience(
                                  item.id
                                )
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          )}

                        </div>


                        {item.duration && (
                          <small>
                            {item.duration}
                          </small>
                        )}


                        {item.description && (
                          <p>
                            {item.description}
                          </p>
                        )}

                      </div>

                    </article>

                  ))

                )}

              </div>


              {/* ADD EXPERIENCE */}

              {editing && (
                <div className="add-record-box">

                  <h3>
                    <Plus size={18} />
                    Add experience
                  </h3>


                  <div className="profile-form-grid">

                    <input
                      placeholder="Role / position"
                      value={
                        experienceForm.role
                      }
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          role:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Company / organization"
                      value={
                        experienceForm.company
                      }
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          company:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Duration"
                      value={
                        experienceForm.duration
                      }
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          duration:
                            e.target.value,
                        })
                      }
                    />


                    <input
                      placeholder="Short description"
                      value={
                        experienceForm.description
                      }
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          description:
                            e.target.value,
                        })
                      }
                    />

                  </div>


                  <button
                    className="add-record-button"
                    onClick={addExperience}
                  >
                    <Plus size={16} />
                    Add experience
                  </button>

                </div>
              )}

            </section>
          )}


          {/* =================================================
              CAREER PREFERENCES
          ================================================= */}

          {activeSection === "preferences" && (
            <section className="profile-section-card">

              <div className="profile-card-heading">

                <div>

                  <span>
                    05 · CAREER DIRECTION
                  </span>

                  <h2>
                    Career preferences
                  </h2>

                  <p>
                    Tell UPnxt what kind of
                    opportunities you're interested in.
                  </p>

                </div>

              </div>


              <div className="profile-form-grid">

                <ProfileField
                  label="Preferred role"
                  value={
                    draft.preferredRole
                  }
                  editing={editing}
                  onChange={(value) =>
                    updateDraft(
                      "preferredRole",
                      value
                    )
                  }
                />


                <ProfileField
                  label="Preferred location"
                  value={
                    draft.preferredLocation
                  }
                  editing={editing}
                  onChange={(value) =>
                    updateDraft(
                      "preferredLocation",
                      value
                    )
                  }
                />


                <div className="profile-field">

                  <label>
                    Preferred work mode
                  </label>


                  {editing ? (
                    <select
                      value={
                        draft.workMode
                      }
                      onChange={(e) =>
                        updateDraft(
                          "workMode",
                          e.target.value
                        )
                      }
                    >

                      <option value="Hybrid">
                        Hybrid
                      </option>

                      <option value="Remote">
                        Remote
                      </option>

                      <option value="On-site">
                        On-site
                      </option>

                    </select>
                  ) : (
                    <div className="profile-read-value">

                      {draft.workMode ||
                        "Not specified"}

                    </div>
                  )}

                </div>

              </div>


              <div className="preference-highlight">

                <div className="preference-highlight-icon">
                  <Sparkles size={20} />
                </div>


                <div>

                  <strong>
                    Smart recommendations
                  </strong>

                  <p>
                    Your skills, education and
                    career preferences can later
                    be used to personalize job
                    recommendations.
                  </p>

                </div>

              </div>

            </section>
          )}

        </div>

      </section>


      {/* MOBILE SAVE */}

      {editing && (
        <div className="profile-mobile-save">

          <button
            className="profile-cancel-button"
            onClick={cancelEditing}
          >
            Cancel
          </button>


          <button
            className="profile-save-button"
            onClick={saveProfile}
          >
            <Save size={17} />
            Save changes
          </button>

        </div>
      )}

    </main>
  );
}


/* =========================================================
   REUSABLE FIELD
========================================================= */

function ProfileField({
  label,
  value,
  editing,
  onChange,
  type = "text",
  icon = null,
  placeholder = "",
}) {
  return (
    <div className="profile-field">

      <label>
        {label}
      </label>


      {editing ? (

        <div className="profile-input-wrapper">

          {icon}

          <input
            type={type}
            value={value || ""}
            placeholder={
              placeholder ||
              `Enter ${label.toLowerCase()}`
            }
            onChange={(e) =>
              onChange(e.target.value)
            }
          />

        </div>

      ) : (

        <div className="profile-read-value">

          {icon}

          <span>

            {value ||
              `Add ${label.toLowerCase()}`}

          </span>

        </div>

      )}

    </div>
  );
}


export default PersonalDetails;