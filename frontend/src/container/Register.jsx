import React, { useState, useRef } from "react";

function Register() {
  const [mode, setMode] = useState("login");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRef = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRef.current[index + 1].focus();
    }
  };

  const handleOtpBack = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRef.current[index - 1].focus();
    }
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <section className="z_auth_section text-center">
        <button
          className="z_auth_open_btn"
          data-bs-toggle="modal"
          data-bs-target="#zAuthModal"
        >
          Login / Register
        </button>
      </section>

      {/* MODAL */}
      <div className="modal fade" id="zAuthModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content z_glass_modal">

            {/* CLOSE */}
            <button
              className="z_modal_close"
              data-bs-dismiss="modal"
              onClick={() => {
                setMode("login");
                setOtp(["", "", "", ""]);
              }}
            >
              ✕
            </button>

            {/* TITLE */}
            <h4 className="z_auth_title">
              {mode === "login" && "Login"}
              {mode === "register" && "Create Account"}
              {mode === "forgot" && "Forgot Password"}
              {mode === "otp" && "Verify OTP"}
              {mode === "reset" && "Create New Password"}
            </h4>

            {/* FORM */}
            <form className="z_auth_form">

              {mode === "register" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="z_auth_input"
                />
              )}

              {(mode === "login" || mode === "register" || mode === "forgot") && (
                <input
                  type="email"
                  placeholder="Email"
                  className="z_auth_input"
                />
              )}

              {(mode === "login" || mode === "register") && (
                <input
                  type="password"
                  placeholder="Password"
                  className="z_auth_input"
                />
              )}

              {/* ✅ OTP BOXES */}
              {mode === "otp" && (
                <div className="z_otp_container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="z_otp_input"
                      value={digit}
                      ref={(el) => (otpRef.current[index] = el)}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleOtpBack(e, index)
                      }
                    />
                  ))}
                </div>
              )}

              {mode === "reset" && (
                <>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="z_auth_input"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="z_auth_input"
                  />
                </>
              )}

              {mode === "login" && (
                <div className="z_auth_options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <span
                    className="z_auth_forgot"
                    onClick={() => setMode("forgot")}
                  >
                    Forgot password?
                  </span>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="button"
                className="z_auth_submit"
                onClick={() => {
                  if (mode === "forgot") setMode("otp");
                  else if (mode === "otp") setMode("reset");
                  else if (mode === "reset") setMode("login");
                }}
              >
                {mode === "login" && "Login"}
                {mode === "register" && "Create Account"}
                {mode === "forgot" && "Send OTP"}
                {mode === "otp" && "Verify OTP"}
                {mode === "reset" && "Update Password"}
              </button>
            </form>

            {/* SWITCH */}
            <p className="z_auth_switch">
              {mode === "login" && (
                <>Don’t have an account?
                  <span onClick={() => setMode("register")}> Register</span>
                </>
              )}

              {mode === "register" && (
                <>Already have an account?
                  <span onClick={() => setMode("login")}> Login</span>
                </>
              )}

              {mode === "forgot" && (
                <>Remember password?
                  <span onClick={() => setMode("login")}> Back to Login</span>
                </>
              )}

              {mode === "otp" && (
                <>Didn’t receive OTP?
                  <span onClick={() => setMode("forgot")}> Resend</span>
                </>
              )}
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
