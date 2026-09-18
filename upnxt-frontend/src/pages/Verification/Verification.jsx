import { useState } from "react";
import { ArrowRight, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Verification.css";

function Verification() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const email = "neeladhriharshini@gmail.com";

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    // Temporary frontend verification.
    // Backend OTP verification can be connected later.
    navigate("/home");
  };

  return (
    <main className="verification-page">

      <section className="verification-card">

        {/* ICON */}

        <div className="verification-icon">
          <KeyRound size={31} strokeWidth={1.8} />
        </div>

        {/* HEADING */}

        <p className="verification-eyebrow">
          VERIFY YOUR ACCOUNT
        </p>

        <h1>
          One final step.
        </h1>

        <p className="verification-subtitle">
          Enter the 6-digit verification code sent to your email.
        </p>

        {/* OTP */}

        <div
          className={`otp-wrapper ${
            error ? "otp-error" : ""
          }`}
        >
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            aria-label="6-digit verification code"
          />

          <div className="otp-dots">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={
                  index < otp.length
                    ? "otp-dot filled"
                    : "otp-dot"
                }
              >
                {index < otp.length ? otp[index] : ""}
              </span>
            ))}
          </div>
        </div>

        {error && (
          <p className="verification-error">
            {error}
          </p>
        )}

        {/* EMAIL */}

        <p className="verification-email">
          Verification code sent to{" "}
          <strong>{email}</strong>
        </p>

        {/* VERIFY BUTTON */}

        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={otp.length !== 6}
        >
          Verify &amp; enter UPnxt
          <ArrowRight size={19} />
        </button>

        {/* CHANGE DETAILS */}

        <button
          className="change-details-button"
          onClick={() => navigate("/")}
        >
          Change details
        </button>

      </section>

    </main>
  );
}

export default Verification;