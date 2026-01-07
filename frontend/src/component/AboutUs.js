import React from 'react';
import { Heart, Star, Award, Users, ShieldCheck, ShoppingBag, Quote } from 'lucide-react';
import '../styles/d_style.css';

const AboutUs = () => {
  return (
    <div className="d_about-wrapper">
 

      {/* Hero Header */}
      <section className="d_about-hero">
        <div className="container">
          <h1 className="d_hero-title">Our Legacy</h1>
          <p className="lead small text-uppercase tracking-wider">Crafting Dreams Since 2010</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="d_section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                src="https://i.pinimg.com/1200x/51/af/ad/51afad40af61143805d996b127ae4951.jpg" 
                alt="Wedding Dress" 
                className="d_story-img"
              />
            </div>
            <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0">
              <span className="d_section-subtitle">The Journey</span>
              <h2 className="d_section-title">Defining Elegance in Wedding Wear</h2>
              <p className="d_text-muted">
                Welcome to Poshvue. Our journey is fueled by a passion to make every bride feel like a queen. 
                What started as a small dream is now a premier destination for bridal couture.
              </p>
              <p className="d_text-muted">
                We blend timeless Indian craftsmanship with modern silhouettes to create outfits that are 
                as unique as your love story.
              </p>
              
              <div className="d-flex gap-3 mt-4 d_stat-flex">
                <div className="d_stat-card">
                  <h4 className="fw-bold mb-0">15k+</h4>
                  <small className="text-muted text-uppercase">Brides</small>
                </div>
                <div className="d_stat-card">
                  <h4 className="fw-bold mb-0">25+</h4>
                  <small className="text-muted text-uppercase">Designers</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Compact */}
      <section className="d_features-bg d_section-padding">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: <Award />, title: "Premium Quality", desc: "Finest fabrics and hand-work." },
              { icon: <Users />, title: "Custom Styling", desc: "Made-to-measure perfection." },
              { icon: <ShieldCheck />, title: "Secure Delivery", desc: "Insured global shipping." }
            ].map((item, index) => (
              <div key={index} className="col-md-4 text-center">
                <div className="d_icon-box">{item.icon}</div>
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="d_text-muted small mb-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modified Our Vision Section */}
      <section className="d_vision-section">
        <div className="container">
          <div className="d_vision-content">
            <Quote className="d_quote-icon" size={40} fill="currentColor" />
            <span className="d_section-subtitle text-white opacity-75">Our Vision</span>
            <h2 className="d_vision-text">
              "To be the global heart of Indian bridal wear, empowering every woman to celebrate her 
              heritage with grace, ethical fashion, and unmatched luxury."
            </h2>
            <hr className="d_vision-hr" />
            <button className="btn btn-outline-light mt-4 px-4 py-2 rounded-0 small">DISCOVER MORE</button>
          </div>
        </div>
      </section>

      {/* Experience Banner */}
      <div className="text-center py-5">
        <ShoppingBag size={28} className="text-muted mb-3" />
        <h5 className="fw-bold text-uppercase">Experience Luxury</h5>
        <p className="text-muted small">Flagship Store: Surat, Gujarat, India</p>
      </div>
    </div>
  );
};

export default AboutUs;