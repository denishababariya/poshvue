import React from 'react';
import { Heart, Star, Award, Users, ShieldCheck, ShoppingBag, Quote } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="d_about-wrapper">
      <style>{`
        .d_about-wrapper {
          color: #333;
          background-color: #fff;
          overflow-x: hidden;
        }

        /* --- Hero Section --- */
        .d_about-hero {
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                      url('https://i.pinimg.com/1200x/be/34/ed/be34edbe2b2332f1a250be9d9a82edbf.jpg');
          background-size: cover;
          background-position: center;
          height: clamp(250px, 40vh, 400px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .d_hero-title {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        /* --- Section Padding Management --- */
        .d_section-padding {
          padding: clamp(40px, 8vw, 80px) 0;
        }

        .d_story-img {
          width: 100%;
          height: clamp(300px, 40vw, 500px);
          object-fit: cover;
          border-radius: 8px;
          box-shadow: clamp(10px, 2vw, 20px) clamp(10px, 2vw, 20px) 0px #f8f4f0;
        }

        .d_section-subtitle {
          color: #c5a059;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: clamp(12px, 2vw, 14px);
          margin-bottom: 8px;
          display: block;
        }

        .d_section-title {
          font-size: clamp(1.4rem, 4vw, 2.5rem);
          margin-bottom: clamp(15px, 3vw, 25px);
          font-weight: 700;
          line-height: 1.2;
        }

        .d_text-muted {
          line-height: 1.6;
          color: #666;
          font-size: clamp(14px, 1.5vw, 16px);
        }

        /* --- Stats Card --- */
        .d_stat-card {
          padding: 15px;
          border-left: 3px solid #c5a059;
          background: #fafafa;
        }

        /* --- Features Section --- */
        .d_features-bg {
          background-color: #fcf9f6;
        }

        .d_icon-box {
          width: clamp(50px, 8vw, 65px);
          height: clamp(50px, 8vw, 65px);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px auto;
          border-radius: 50%;
          color: #c5a059;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        /* --- Enhanced Our Vision Section --- */
        .d_vision-section {
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
                      url('https://i.pinimg.com/1200x/d3/14/a2/d314a28c5dba7be6776cb93c3b4f9f9e.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: 80px 0;
          color: #fff;
          text-align: center;
        }

        .d_vision-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          padding: 20px;
        }

        .d_quote-icon {
          color: #c5a059;
          opacity: 0.5;
          margin-bottom: 20px;
        }

        .d_vision-text {
          font-size: clamp(1.1rem, 3vw, 1.8rem);
          font-style: italic;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .d_vision-hr {
          width: 50px;
          height: 3px;
          background: #c5a059;
          margin: 20px auto;
          border: none;
        }

        /* --- Mobile Adjustments --- */
        @media (max-width: 768px) {
          .d_story-img { 
            margin-bottom: 30px; 
            box-shadow: 10px 10px 0px #f8f4f0; 
          }
          .d_vision-section {
             background-attachment: scroll; /* મોબાઈલમાં પેરાલેક્સ ઈફેક્ટ બંધ કરી */
             padding: 50px 0;
          }
          .d_stat-flex {
            justify-content: center;
            gap: 20px !important;
          }
        }
      `}</style>

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
                Welcome to G3-Fashion. Our journey is fueled by a passion to make every bride feel like a queen. 
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
            <p className="text-uppercase small tracking-widest fw-bold">Founder, G3-Fashion</p>
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