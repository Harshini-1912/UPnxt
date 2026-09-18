import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  LockKeyhole,
  Mail,
  Phone,
  User,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

// Change this path according to where you keep your illustration
import welcomePerson from "../../assets/welcome-person.png";

const quotes = [
  "Your next opportunity may be one decision away.",
  "Great careers are built one bold step at a time.",
  "The right opportunity can change your entire journey.",
  "Every application is a step closer to where you belong.",
  "Your skills have value. The right place is waiting.",
  "Small progress today can become a remarkable career tomorrow.",
  "The future belongs to those willing to move forward.",
];

function Welcome() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [quote, setQuote] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Dynamic quote
  const generateQuote = () => {
    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    setQuote(randomQuote);
  };

  useEffect(() => {
    generateQuote();
  }, []);

  const changeTab = (tab) => {
    setActiveTab(tab);
    setMessage("");
    generateQuote();

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login / Register
  const handleContinue = async (e) => {
    e.preventDefault();

    setMessage("");

    const email = formData.email.trim().toLowerCase();

    // ================================
    // REGISTER VALIDATION
    // ================================
    

    if (activeTab === "register") {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.password
      ) {
        setMessage("Please fill in all required fields.");
        return;
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        setMessage("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      /*
        FRONTEND DEMO AUTHENTICATION

        Accounts are stored separately from profiles.

        accounts:
        [
          {
            name,
            email,
            phone,
            password
          }
        ]

        current user:
        {
          name,
          email,
          phone
        }
      */

      const existingAccounts =
        JSON.parse(
          localStorage.getItem("upnxtAccounts")
        ) || [];


      // ==================================================
      // REGISTER
      // ==================================================

      if (activeTab === "register") {
        const existingUser =
          existingAccounts.find(
            (account) =>
              account.email.toLowerCase() === email
          );

        if (existingUser) {
          setMessage(
            "An account with this email already exists. Please login."
          );

          setLoading(false);
          return;
        }

        const newUser = {
          name: formData.name.trim(),
          email: email,
          phone: formData.phone.trim(),
          password: formData.password,
        };

        const updatedAccounts = [
          ...existingAccounts,
          newUser,
        ];

        localStorage.setItem(
          "upnxtAccounts",
          JSON.stringify(updatedAccounts)
        );


        // Save currently logged-in user
        const currentUser = {
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        };

        localStorage.setItem(
          "upnxtCurrentUser",
          JSON.stringify(currentUser)
        );


        /*
          Also create an empty profile for this
          specific user.

          Education, experience and skills
          are NOT hardcoded.
        */

        const profileKey =
          `upnxtProfile_${email}`;

        const emptyProfile = {
          firstName:
            newUser.name.split(" ")[0] || "",

          lastName:
            newUser.name
              .split(" ")
              .slice(1)
              .join(" ") || "",

          email: newUser.email,

          phone: newUser.phone,

          gender: "Female",

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
        };

        localStorage.setItem(
          profileKey,
          JSON.stringify(emptyProfile)
        );
      }


      // ==================================================
      // LOGIN
      // ==================================================

      if (activeTab === "login") {
        const existingUser =
          existingAccounts.find(
            (account) =>
              account.email.toLowerCase() === email
          );


        /*
          If the account exists, check password.
        */

        if (existingUser) {
          if (
            existingUser.password !==
            formData.password
          ) {
            setMessage(
              "Incorrect email or password."
            );

            setLoading(false);
            return;
          }


          const currentUser = {
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone || "",
          };

          localStorage.setItem(
            "upnxtCurrentUser",
            JSON.stringify(currentUser)
          );
        }


        /*
          If there is no account yet, we still allow
          the demo login so you can test the application.

          The email becomes the user's identity.
        */

        if (!existingUser) {
          const currentUser = {
            name:
              formData.email
                .split("@")[0]
                .replace(/[._-]/g, " "),
            email: email,
            phone: "",
          };

          localStorage.setItem(
            "upnxtCurrentUser",
            JSON.stringify(currentUser)
          );


          /*
            Create an empty profile for this
            new email if one doesn't already exist.
          */

          const profileKey =
            `upnxtProfile_${email}`;

          const existingProfile =
            localStorage.getItem(profileKey);

          if (!existingProfile) {
            const emptyProfile = {
              firstName:
                currentUser.name
                  .split(" ")[0] || "",

              lastName:
                currentUser.name
                  .split(" ")
                  .slice(1)
                  .join(" ") || "",

              email: email,

              phone: "",

              gender: "Female",

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
            };

            localStorage.setItem(
              profileKey,
              JSON.stringify(emptyProfile)
            );
          }
        }
      }


      // Small loading effect
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );


      // ================================
      // ENTER UPnxt
      // ================================

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="welcome-page">

      <div className="welcome-background-glow glow-one"></div>

      <div className="welcome-background-glow glow-two"></div>


      <div className="welcome-shell">
        <button
  type="button"
  className="welcome-home-button"
  onClick={() => navigate("/home")}
  title="Go to Home"
>
  Home
</button>


        {/* ==========================================
            LEFT CARD
        ========================================== */}

        <section className="welcome-story-card">

          <div className="welcome-brand">

            <div className="welcome-brand-icon">
              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <span>
              UpNxt
            </span>

          </div>


          <div className="story-content">

            <div className="story-label">

              <BriefcaseBusiness size={15} />

              YOUR CAREER JOURNEY

            </div>


            <div className="quote-mark">
              "
            </div>


            <h1 className="career-quote">
              {quote}
            </h1>


            <div className="quote-line"></div>


            <button
              className="new-quote-button"
              onClick={generateQuote}
            >
              New perspective

              <RefreshCw size={15} />

            </button>

          </div>


          {/* Illustration */}

          <div className="welcome-illustration">

            <img
              src={welcomePerson}
              alt="Career journey"
            />

          </div>

        </section>


        {/* ==========================================
            RIGHT CARD
        ========================================== */}

        <section className="auth-card">


          <div className="auth-heading">

            <span className="auth-eyebrow">

              {activeTab === "login"
                ? "WELCOME BACK"
                : "START YOUR JOURNEY"}

            </span>


            <h2>

              {activeTab === "login"
                ? "Welcome back."
                : "Create your account."}

            </h2>


            <p>

              {activeTab === "login"
                ? "Your next opportunity is waiting."
                : "Your next chapter starts here."}

            </p>

          </div>


          {/* ==========================================
              TABS
          ========================================== */}

          <div className="auth-tabs">

            <button
              type="button"
              className={
                activeTab === "login"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                changeTab("login")
              }
            >
              Login
            </button>


            <button
              type="button"
              className={
                activeTab === "register"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                changeTab("register")
              }
            >
              Register
            </button>

          </div>


          {/* ==========================================
              FORM
          ========================================== */}

          <form
            className="auth-form"
            onSubmit={handleContinue}
          >


            {/* NAME */}

            {activeTab === "register" && (
              <label className="input-group">

                <span>
                  Name
                </span>


                <div className="input-box">

                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </label>
            )}


            {/* EMAIL */}

            <label className="input-group">

              <span>
                Email address
              </span>


              <div className="input-box">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </label>


            {/* PHONE */}

            {activeTab === "register" && (
              <label className="input-group">

                <span>
                  Phone number
                </span>


                <div className="input-box">

                  <Phone size={18} />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </label>
            )}


            {/* PASSWORD */}

            <label className="input-group">

              <span>
                Password
              </span>


              <div className="input-box">

                <LockKeyhole size={18} />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </label>


            {/* CONFIRM PASSWORD */}

            {activeTab === "register" && (
              <label className="input-group">

                <span>
                  Confirm password
                </span>


                <div className="input-box">

                  <LockKeyhole size={18} />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

              </label>
            )}


            {/* MESSAGE */}

            {message && (
              <p className="auth-message">
                {message}
              </p>
            )}


            {/* SUBMIT */}

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >

              {loading
                ? activeTab === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : activeTab === "login"
                ? "Continue securely"
                : "Create account"}

              <ArrowRight size={18} />

            </button>

          </form>

        </section>

      </div>

    </main>
  );
}

export default Welcome;