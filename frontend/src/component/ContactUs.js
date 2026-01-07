import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import client from '../api/client';

const ContactUs = () => {
  // ફોર્મ સ્ટેટ મેનેજમેન્ટ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  // Validation errors
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) errs.name = 'Name required';
    else if (name.length < 2) errs.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errs.email = 'Email required';
    else if (!emailRegex.test(email)) errs.email = 'Invalid email address';

    if (!subject) errs.subject = 'Subject required';
    else if (subject.length < 3) errs.subject = 'Subject must be at least 3 characters';

    if (!message) errs.message = 'Message required';
    else if (message.length < 10) errs.message = 'Message must be at least 10 characters';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    if (!validate()) return;

    try {
      setSubmitting(true);
      await client.post('/support/contacts', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to send message. Please try again.';
      setSubmitMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="d_contact-wrapper">
      <style>{`
        .d_contact-wrapper {
          color: #333;
          background-color: #fff;
        }

        /* --- Updated Header Section with Banner BG --- */
        .d_contact-header {
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                      url('https://i.pinimg.com/736x/ff/98/68/ff9868f1606a756920066392fce5e8fc.jpg');
          background-size: cover;
          background-position: center;
          padding: clamp(60px, 10vw, 100px) 0;
          text-align: center;
          color: #fff;
        }

        .d_page-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .d_breadcrumb {
          font-size: 14px;
          color: #ddd;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* --- Info Cards --- */
        .d_info-card {
          padding: 25px;
          background: #fff;
          border: 1px solid #eee;
          text-align: center;
          transition: 0.3s;
          height: 100%;
        }

        .d_info-card:hover {
          border-color: #c5a059;
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .d_icon-circle {
          width: 50px;
          height: 50px;
          background: #fdf8f3;
          color: #c5a059;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 15px auto;
        }

        /* --- Form Section --- */
        .d_contact-form-container {
          padding: clamp(40px, 8vw, 80px) 0;
        }

        .d_form-card {
          background: #fff;
          padding: clamp(20px, 5vw, 40px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border-radius: 12px;
        }

        .d_input-field {
          border: 1px solid #eee;
          background: #fcfcfc;
          padding: 14px;
          font-size: 14px;
          border-radius: 6px;
          width: 100%;
          margin-bottom: 20px;
          outline: none;
          transition: 0.3s;
        }

        .d_input-field:focus {
          border-color: #c5a059;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.1);
        }

        .d_submit-btn {
          background: #333;
          color: #fff;
          border: none;
          padding: 14px 30px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          transition: 0.3s;
          width: 100%;
          border-radius: 6px;
        }

        .d_submit-btn:hover {
          background: #000;
          transform: translateY(-2px);
        }

        .d_map-container {
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .d_info-card { margin-bottom: 10px; }
          .d_map-container { height: 300px; }
          .d_contact-form-container { padding-top: 20px; }
        }
      `}</style>

      {/* Header with Background Banner */}
      <section className="d_contact-header">
        <div className="container">
          <h1 className="d_page-title">Connect With Us</h1>
          <div className="d_breadcrumb">Home &nbsp; | &nbsp; Contact Us</div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="container" style={{ marginTop: '-40px' }}>
        <div className="row g-3 justify-content-center">
          {[
            { icon: <MapPin size={22} />, title: "Visit Store", text: "Poshvue Fashion, Sutaria Township, Ghod Dod Road, Surat" },
            { icon: <Phone size={22} />, title: "Call Support", text: "+91 81601 81706" },
            { icon: <Mail size={22} />, title: "Email Inquiry", text: "support@g3fashions.in" },
            { icon: <Clock size={22} />, title: "Store Timing", text: "10:00 AM - 8:00 PM" }
          ].map((item, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="d_info-card shadow-sm">
                <div className="d_icon-circle">{item.icon}</div>
                <h6 className="fw-bold small text-uppercase">{item.title}</h6>
                <p className="small text-muted mb-0 d-none d-md-block">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section className="d_contact-form-container container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="d_form-card">
              <div className="mb-4">
                <h3 className="fw-bold mb-2">Get In Touch</h3>
                <p className="text-muted small">Have questions about our bridal collection? We'd love to hear from you.</p>
              </div>
              {submitMessage && (
                <div className="alert alert-info py-2" role="alert">{submitMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input 
                      type="text" name="name" placeholder="Full Name" 
                      className="d_input-field" required 
                      value={formData.name} onChange={handleChange} 
                    />
                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="email" name="email" placeholder="Email Address" 
                      className="d_input-field" required 
                      value={formData.email} onChange={handleChange} 
                    />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                  </div>
                </div>
                <input 
                  type="text" name="subject" placeholder="Subject" 
                  className="d_input-field" 
                  value={formData.subject} onChange={handleChange} 
                />
                {errors.subject && <div className="text-danger small">{errors.subject}</div>}
                <textarea 
                  name="message" placeholder="Message" 
                  className="d_input-field" rows="4" required 
                  value={formData.message} onChange={handleChange}
                ></textarea>
                {errors.message && <div className="text-danger small">{errors.message}</div>}
                
                <button type="submit" className="d_submit-btn" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'} <Send size={16} className="ms-2" />
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ps-lg-4">
              <div className="d_map-container shadow-sm border mb-4">
                <iframe 
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.123!2d72.80!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzI0LjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1630000000000" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                ></iframe>
              </div>
              
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <h6 className="fw-bold mb-1">Follow Us</h6>
                  <div className="d-flex gap-3">
                    <Facebook size={18} className="cursor-pointer" />
                    <Instagram size={18} className="cursor-pointer" />
                    <Youtube size={18} className="cursor-pointer" />
                  </div>
                </div>
                <div className="text-end d-none d-sm-block">
                  <p className="small text-muted mb-0">Need urgent help?</p>
                  <h6 className="fw-bold">+91 81601 81706</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;