import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* =======================
   Yup Validation Schemas
======================= */
const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Min 3 characters")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const forgotSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const resetSchema = Yup.object({
  newPassword: Yup.string().min(6).required("New password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password required"),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be 4 digits")
    .required("OTP is required"),
});

function Register() {
  const [mode, setMode] = useState("login");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRef = useRef([]);
  const modalRef = useRef(null);

  /* =======================
     Bootstrap Modal Init
  ======================= */
  useEffect(() => {
    if (window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();

      modalRef.current.addEventListener("hidden.bs.modal", () => {
        window.location.href = "/";
      });
    }
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRef.current[index + 1].focus();
  };

  const handleOtpBack = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRef.current[index - 1].focus();
    }
  };

  /* =======================
     Dynamic Validation
  ======================= */
  const getSchema = () => {
    if (mode === "login") return loginSchema;
    if (mode === "register") return registerSchema;
    if (mode === "forgot") return forgotSchema;
    if (mode === "reset") return resetSchema;
    return null;
  };

  return (
    <div
      className="modal fade"
      id="zAuthModal"
      tabIndex="-1"
      ref={modalRef}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content z_glass_modal">
          <button
            className="z_modal_close"
            onClick={() => (window.location.href = "/")}
          >
            ✕
          </button>

          <h4 className="z_auth_title">
            {mode === "login" && "Login"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Forgot Password"}
            {mode === "otp" && "Verify OTP"}
            {mode === "reset" && "Create New Password"}
          </h4>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              otp: "",    
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={getSchema()}
            onSubmit={(values) => {
              if (mode === "forgot") setMode("otp");
              else if (mode === "otp") setMode("reset");
              else if (mode === "reset") setMode("login");
              else console.log(values);
            }}
          >
            <Form className="z_auth_form">
              {mode === "register" && (
                <>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="z_auth_input"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="z_error"
                  />
                </>
              )}

              {(mode === "login" ||
                mode === "register" ||
                mode === "forgot") && (
                <>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="z_auth_input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="z_error"
                  />
                </>
              )}

              {(mode === "login" || mode === "register") && (
                <>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="z_auth_input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="z_error"
                  />
                </>
              )}

              {mode === "otp" && (
                <div className="z_otp_container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      value={digit}
                      ref={(el) => (otpRef.current[index] = el)}
                      className="z_otp_input"
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpBack(e, index)}
                    />
                  ))}
                </div>
              )}

              {mode === "reset" && (
                <>
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="z_auth_input"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="z_error"
                  />

                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="z_auth_input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="z_error"
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

              <button type="submit" className="z_auth_submit">
                {mode === "login" && "Login"}
                {mode === "register" && "Create Account"}
                {mode === "forgot" && "Send OTP"}
                {mode === "otp" && "Verify OTP"}
                {mode === "reset" && "Update Password"}
              </button>
            </Form>
          </Formik>

          <p className="z_auth_switch">
            {mode === "login" && (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setMode("register")}>Register</span>
              </>
            )}
            {mode === "register" && (
              <>
                Already have an account?{" "}
                <span onClick={() => setMode("login")}>Login</span>
              </>
            )}
            {mode === "forgot" && (
              <>
                Remember password?{" "}
                <span onClick={() => setMode("login")}>Back to Login</span>
              </>
            )}
            {mode === "otp" && (
              <>
                Didn’t receive OTP?{" "}
                <span onClick={() => setMode("forgot")}>Resend</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
