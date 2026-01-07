import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

function Complain() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      orderNo: "",
      subject: "",
      complainType: "",
      comments: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile number is required"),
      orderNo: Yup.string().required("Order number is required"),
      subject: Yup.string().required("Subject is required"),
      complainType: Yup.string().required("Please select complain type"),
      comments: Yup.string()
        .min(10, "Minimum 10 characters required")
        .required("Comments are required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("Complain Data:", values);
      alert("Complain submitted successfully!");
      resetForm();
    },
  });

  return (
    <>
      <section className="z_complain_section py-5">
        <Container>
          <Row className="align-items-center">

            {/* LEFT SIDE */}
            <Col lg={7} md={12} className="mb-4">
              <h2 className="z_complain_title">SEND YOUR QUERY TO US</h2>
              <div className="z_complain_line"></div>

              <div className="z_complain_info d-flex flex-wrap justify-content-between mb-4">
                <div>
                  <p className="mb-1">
                    <strong>CUSTOMER CARE NO.</strong> : +91 9513805407
                  </p>
                  <p className="mb-0">
                    <strong>Emergency Contact No.</strong> : +91 7984097311
                  </p>
                </div>
                <div className="mt-2 mt-md-0">
                  <p className="mb-0">
                    <strong>TIMINGS</strong> - Mon to Sun: 7:00 AM - 1:00 AM IST
                  </p>
                </div>
              </div>

              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      name="name"
                      placeholder="Enter Name *"
                      className="z_complain_input"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter Email *"
                      className="z_complain_input"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Control
                      name="mobile"
                      placeholder="Enter Mobile No *"
                      className="z_complain_input"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.mobile && formik.errors.mobile}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.mobile}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Control
                      name="orderNo"
                      placeholder="Enter Order Number *"
                      className="z_complain_input"
                      value={formik.values.orderNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.orderNo && formik.errors.orderNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.orderNo}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Control
                      name="subject"
                      placeholder="Enter Subject *"
                      className="z_complain_input"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.subject && formik.errors.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.subject}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Select
                      name="complainType"
                      className="z_complain_input"
                      value={formik.values.complainType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.complainType &&
                        formik.errors.complainType
                      }
                    >
                      <option value="">Select Complain Type *</option>
                      <option value="Delivery Issue">Delivery Issue</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Product Issue">Product Issue</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.complainType}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={12} className="mb-4">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="comments"
                      placeholder="Enter Comments *"
                      className="z_complain_input"
                      value={formik.values.comments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.comments && formik.errors.comments
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.comments}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={12}>
                    <Button type="submit" className="z_complain_btn w-100">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>

            {/* RIGHT IMAGE */}
            <Col lg={5} md={12} className="text-center d-md-block d-none">
              <div className="z_complain_img_wrap">
                <img
                  src="https://i.pinimg.com/736x/0d/f5/bf/0df5bfa5e44d8f65b117d07af063a0db.jpg"
                  alt="Complain"
                  className="z_complain_img img-fluid"
                />
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      <style jsx="true">{`
        .row {
          --bs-gutter-x: 1.5rem !important;
        }
      `}</style>
    </>
  );
}

export default Complain;
