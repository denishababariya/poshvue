import React, { useState, useRef, useEffect } from "react";

function Register() {
  const [mode, setMode] = useState("login");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRef = useRef([]);
  const modalRef = useRef(null);

  useEffect(() => {
    // પેજ લોડ થાય ત્યારે મોડલ ઓટોમેટિક ઓપન કરવા માટે
    if (typeof window !== "undefined" && window.bootstrap) {
      const myModal = new window.bootstrap.Modal(modalRef.current);
      myModal.show();

      // જો યુઝર ESC કી દબાવે અથવા ક્યાંય પણ રીતે મોડલ બંધ થાય ત્યારે
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        window.location.href = "/"; // પેજ રિલોડ સાથે હોમ પર નેવિગેટ કરશે
      });
    }
    
    // ક્લીનઅપ ફંક્શન
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("hidden.bs.modal", () => {});
      }
    };
  }, []);

  // ✕ બટન માટે સ્પેશિયલ હેન્ડલર
  const handleCloseAndReload = () => {
    window.location.href = "/";
  };

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
      {/* MODAL */}
      <div 
        className="modal fade" 
        id="zAuthModal" 
        tabIndex="-1" 
        ref={modalRef}
        data-bs-backdrop="static" // બહાર ક્લિક કરવાથી બંધ નહીં થાય (મેડમ ખીજાય નહીં એટલે Safe side)
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content z_glass_modal">
            
            {/* CLOSE BUTTON */}
            <button
              className="z_modal_close"
              type="button"
              onClick={handleCloseAndReload}
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
                <input type="text" placeholder="Full Name" className="z_auth_input" />
              )}

              {(mode === "login" || mode === "register" || mode === "forgot") && (
                <input type="email" placeholder="Email" className="z_auth_input" />
              )}

              {(mode === "login" || mode === "register") && (
                <input type="password" placeholder="Password" className="z_auth_input" />
              )}

              {/* OTP BOXES */}
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
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpBack(e, index)}
                    />
                  ))}
                </div>
              )}

              {mode === "reset" && (
                <>
                  <input type="password" placeholder="New Password" className="z_auth_input" />
                  <input type="password" placeholder="Confirm Password" className="z_auth_input" />
                </>
              )}

              {mode === "login" && (
                <div className="z_auth_options">
                  <label><input type="checkbox" /> Remember me</label>
                  <span className="z_auth_forgot" onClick={() => setMode("forgot")}>
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
                <>Don’t have an account? <span onClick={() => setMode("register")}> Register</span></>
              )}
              {mode === "register" && (
                <>Already have an account? <span onClick={() => setMode("login")}> Login</span></>
              )}
              {mode === "forgot" && (
                <>Remember password? <span onClick={() => setMode("login")}> Back to Login</span></>
              )}
              {mode === "otp" && (
                <>Didn’t receive OTP? <span onClick={() => setMode("forgot")}> Resend</span></>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;