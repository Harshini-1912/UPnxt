import { ArrowUpRight, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      {/* Background */}
      <div className="home-bg-glow home-glow-one"></div>
      <div className="home-bg-glow home-glow-two"></div>

      {/* Main content */}
      <div className="home-wrapper">

        {/* Center content */}
        <section className="home-center">

          <div className="home-logo-icon">
            <ArrowUpRight size={25} strokeWidth={1.7} />
          </div>

          <h1 className="home-logo">
            UpNxt
          </h1>

          <div className="home-line"></div>

          <p className="home-tagline">
            Your Next Opportunity Starts Here.
          </p>

          <button
            className="explore-button"
            onClick={() => navigate("/welcome")}
          >
            <span>Explore opportunities</span>
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>

        </section>

        {/* Animated briefcase */}
        <section className="bag-section">

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="bag-glow"></div>

          <div className="bag-animation">
            <BriefcaseBusiness
              className="briefcase"
              strokeWidth={1.25}
            />
          </div>

          <span className="spark spark-one"></span>
          <span className="spark spark-two"></span>

        </section>

      </div>
    </main>
  );
}

export default Home;