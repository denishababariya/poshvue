import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaCrown,
  FaHeart,
  FaLeaf,
  FaGem,
  FaHandsHelping,
  FaStar,
} from "react-icons/fa";
import heroBg from "../img/download1.jpg";

const OurStory = () => {
  return (
    <div className="d_story_wrapper">
      {/* INLINE CSS */}
      <style>{`
        .d_story_wrapper {
          font-family: 'Playfair Display', serif;
          overflow-x: hidden;
        }

        /* --- Hero Section --- */
        .d_story_hero {
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBg});
          background-size: cover;
          background-position: center;
          padding: clamp(80px, 15vw, 150px) 0;
          text-align: center;
          color: #fff;
        }

        .d_story_hero h1 {
          font-size: clamp(32px, 5vw, 60px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 15px;
        }

        .d_story_hero p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 2vw, 20px);
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.9;
        }

        /* --- Story Section --- */
        .d_story_section {
          padding: clamp(50px, 10vw, 100px) 0;
        }

        .d_story_section h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #4a0404; /* Deep Maroon */
          margin-bottom: 25px;
          position: relative;
        }

        .d_story_section p {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #444;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .d_story_img {
          width: 100%;
          border-radius: 4px;
          box-shadow: 20px 20px 0px #f4e6d6;
          object-fit: cover;
          height: 500px;
        }

        /* --- Values Section --- */
        .d_story_values {
          background: #fdf8f3;
          padding: 80px 0;
        }

        .d_value_card {
          background: #fff;
          padding: 40px 25px;
          border-bottom: 4px solid #b08d57;
          height: 100%;
          transition: all 0.4s ease;
          text-align: center;
        }

        .d_value_card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .d_value_icon {
          font-size: 45px;
          color: #b08d57;
          margin-bottom: 20px;
        }

        .d_value_card h4 {
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 15px;
          color: #333;
        }

        /* --- Craftmanship Section --- */
        .d_craft_img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 50% 50% 0 0;
            border: 8px solid #fff;
        }

        /* --- Why Us Section --- */
        .d_story_why {
          padding: 80px 0;
          background: #fff;
        }

        .d_why_box {
            padding: 20px;
            border: 1px dashed #b08d57;
            height: 100%;
        }

        .d_why_icon {
          font-size: 30px;
          color: #b08d57;
          margin-bottom: 15px;
        }

        /* --- CTA Section --- */
        .d_story_cta {
          background: linear-gradient(rgba(74, 4, 4, 0.9), rgba(74, 4, 4, 0.9)),
          url("https://images.unsplash.com/photo-1594142404832-731338604d53?q=80&w=1974&auto=format&fit=crop");
          background-size: cover;
          background-attachment: fixed;
          color: #fff;
          text-align: center;
          padding: 100px 20px;
        }

        .d_story_btn {
          background: #b08d57;
          color: #fff;
          border: none;
          padding: 15px 45px;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 25px;
          transition: 0.3s;
        }

        .d_story_btn:hover {
          background: #fff;
          color: #4a0404;
        }

        @media (max-width: 768px) {
          .d_story_img { height: 350px; box-shadow: 10px 10px 0px #f4e6d6; }
          .d_craft_img { height: 300px; border-radius: 10px; }
        }
      `}</style>

      {/* HERO */}
      <section className="d_story_hero">
        <Container>
          <h1 className="animate__animated animate__fadeInDown">Heritage in Every Thread</h1>
          <p className="animate__animated animate__fadeInUp">
            Celebrating the timeless beauty of Indian traditions through handcrafted bridal luxury and ethnic elegance.
          </p>
        </Container>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="d_story_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0 text-center text-lg-start">
              <span className="text-uppercase mb-2 d-block" style={{color: '#b08d57', letterSpacing: '2px', fontWeight: '600'}}>Est. 2010</span>
              <h2>A Legacy of Indian Couture</h2>
              <p>
                From the narrow lanes of artisan clusters to the grand aisles of wedding venues, our journey has been a celebration of Indian craftsmanship. We specialize in creating wedding heirlooms—from <b>Zardosi Lehengas</b> that tell tales of royalty to <b>Handloom Sarees</b> that whisper elegance.
              </p>
              <p>
                We believe that a wedding outfit is not just a garment; it is a memory. That’s why we blend centuries-old techniques with modern silhouettes, ensuring every Indian bride feels like a queen on her special day.
              </p>
            </Col>
            <Col lg={6}>
              <img
                src="https://i.pinimg.com/1200x/c2/75/b7/c275b778422a8849fe5a6ddac6d7eaac.jpg"
                alt="Indian Bridal Lehenga"
                className="d_story_img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CORE VALUES */}
      <section className="d_story_values">
        <Container>
          <div className="text-center mb-5">
             <h2 style={{color: '#4a0404'}}>The G3 Promise</h2>
             <p className="text-muted">What makes our wedding wear truly special</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <div className="d_value_card">
                <FaCrown className="d_value_icon" />
                <h4>Royal Aesthetics</h4>
                <p className="text-muted">Inspired by Indian royalty, featuring heavy borders, intricate motifs, and rich fabrics like Silk and Velvet.</p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="d_value_card">
                <FaStar className="d_value_icon" />
                <h4>Artisanal Mastery</h4>
                <p className="text-muted">Every piece is hand-detailed by master karigars, preserving the art of Gota Patti, Resham, and Mirror work.</p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="d_value_card">
                <FaHeart className="d_value_icon" />
                <h4>Customized Fit</h4>
                <p className="text-muted">We understand the diverse Indian beauty; offering bespoke tailoring to ensure your outfit fits like a dream.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CRAFTMANSHIP */}
      <section className="d_story_section" style={{background: '#fff'}}>
        <Container>
          <Row className="align-items-center flex-column-reverse flex-lg-row">
            <Col lg={5} className="mt-5 mt-lg-0">
                <img 
                    src="https://i.pinimg.com/736x/74/0f/27/740f276b3b5054817b6a6c70e058c5bd.jpg 0" 
                    alt="Hand Embroidery" 
                    className="d_craft_img"
                />
            </Col>
            <Col lg={{span: 6, offset: 1}}>
              <h2 style={{color: '#4a0404'}}>The Art of Karigari</h2>
              <p>
                The heartbeat of our brand lies in the hands of our artisans. Behind every 10-kilogram Lehenga are hundreds of hours of painstaking labor.
              </p>
              <div className="mt-4">
                  <div className="d-flex mb-3">
                      <FaGem className="mt-1 me-3" style={{color: '#b08d57'}} />
                      <div>
                          <h6>Finest Embellishments</h6>
                          <p className="small text-muted">Using authentic Swarovski crystals, Japanese beads, and pure metallic threads.</p>
                      </div>
                  </div>
                  <div className="d-flex mb-3">
                      <FaLeaf className="mt-1 me-3" style={{color: '#b08d57'}} />
                      <div>
                          <h6>Sustainable Textiles</h6>
                          <p className="small text-muted">Sourcing ethically produced Banarasi silks and organic cotton blends.</p>
                      </div>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WHY CHOOSE US */}
      <section className="d_story_why">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <div className="d_why_box">
                <FaGem className="d_why_icon" />
                <h5>Luxury Fabrics</h5>
                <p className="small text-muted mb-0">Premium Pure Silks, Chiffons, and Organzas sourced from across India.</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="d_why_box">
                <FaHandsHelping className="d_why_icon" />
                <h5>Fair Trade</h5>
                <p className="small text-muted mb-0">Directly supporting 500+ weaver families and local craft clusters.</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="d_why_box">
                <FaCrown className="d_why_icon" />
                <h5>Bridal Concierge</h5>
                <p className="small text-muted mb-0">Personal styling sessions for your Engagement, Mehendi, and Wedding.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="d_story_cta">
        <Container>
          <h2 className="mb-3">Begin Your Forever Story</h2>
          <p className="lead">Browse our latest collection of Bridal Lehengas and Festive Couture.</p>
          <button className="d_story_btn">Explore Collections</button>
        </Container>
      </section>        
    </div>
  );
};

export default OurStory;                                         