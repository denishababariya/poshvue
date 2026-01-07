import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Checkout() {
  const { state } = useLocation();

  const {
    cartItems = [],
    subTotal = 0,
    discount = 0,
    deliveryFee = 0,
    total = 0,
  } = state || {};

  /* ================= Billing Validation ================= */
  const billingValidationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Name too short")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),

    address: Yup.string()
      .min(10, "Address too short")
      .required("Address is required"),
  });

  return (
    <section className="z_chck_section">
      <div className="z_chck_container">
        <h2 className="z_chck_heading">Checkout</h2>

        <div className="z_chck_main">
          {/* ================= Billing Details ================= */}
          <div className="z_chck_billing">
            <h3>Billing Details</h3>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                address: "",
              }}
              validationSchema={billingValidationSchema}
              onSubmit={(values) => {
                console.log("Billing Details:", values);
                alert("Billing details submitted successfully");
              }}
            >
              {() => (
                <Form className="z_chck_form">
                  <div className="z_chck_form_group">
                    <label>Full Name</label>
                    <Field type="text" name="fullName" />
                    <ErrorMessage
                      name="fullName"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="z_chck_form_group">
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="z_chck_form_group">
                    <label>Phone</label>
                    <Field type="tel" name="phone" />
                    <ErrorMessage
                      name="phone"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="z_chck_form_group">
                    <label>Address</label>
                    <Field type="text" name="address" />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <button type="submit" className="z_chck_pay_btn mt-3">
                    Continue to Pay
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* ================= Order Summary ================= */}
          <div className="z_chck_summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.id} className="z_chck_summary_item">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div className="z_chck_summary_item">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_item">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_item">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_total">
              <span>Total</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
