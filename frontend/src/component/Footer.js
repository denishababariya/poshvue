import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="d_footer-wrapper">
      <style>{`
        .d_footer-wrapper {
          background-color: #f8f9fa;
          padding: 60px 0 20px 0;
          color: #333;
          border-top: 1px solid #ddd;
        }

        /* --- Newsletter Section --- */
        .d_newsletter-container {
          text-align: center;
          margin-bottom: 50px;
          padding: 0 15px;
        }

        .d_newsletter-title {
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 15px;
          letter-spacing: 0.5px;
        }

        .d_newsletter-sub {
          font-size: 14px;
          color: #666;
          max-width: 600px;
          margin: 0 auto 25px auto;
        }

        .d_input-group-custom {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
        }

        .d_newsletter-input {
          flex: 1;
          border: none;
          padding: 12px 15px;
          font-size: 14px;
          outline: none;
        }

        .d_subscribe-btn {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 0 25px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s;
        }

        .d_subscribe-btn:hover { background-color: #000; }

        .d_privacy-check {
          margin-top: 15px;
          font-size: 12px;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* --- Footer Main Grid --- */
        .d_footer-main {
          padding-top: 40px;
          border-top: 1px solid #e0e0e0;
        }

        .d_footer-col-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          position: relative;
        }

        .d_footer-links {
          list-style: none;
          padding: 0;
        }

        .d_footer-links li { margin-bottom: 12px; }

        .d_footer-links a {
          text-decoration: none;
          color: #555;
          font-size: 13px;
          transition: 0.3s;
        }

        .d_footer-links a:hover { color: #000; transform: translateX(5px); display: inline-block; }

        /* --- Contact Section --- */
        .d_contact-box {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #eee;
        }

        .d_info-item {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
          font-size: 14px;
          align-items: flex-start;
        }

        .d_social-flex {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .d_social-icon {
          width: 36px;
          height: 36px;
          background: #333;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          text-decoration: none;
          transition: 0.3s;
        }

        .d_social-icon:hover { background: #000; transform: translateY(-3px); }

        /* --- Footer Bottom --- */
        .d_footer-bottom {
          margin-top: 50px;
          padding: 20px 0;
          border-top: 1px solid #e0e0e0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #777;
        }

        .d_payment-methods img {
          height: 20px;
          margin-left: 15px;
          opacity: 0.8;
          filter: grayscale(1);
        }

        /* --- રિસ્પોન્સિવ મીડિયા ક્વેરીઝ --- */
        @media (max-width: 991px) {
          .d_footer-col-title { border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .d_footer-main > div { margin-bottom: 30px; }
        }

        @media (max-width: 576px) {
          .d_input-group-custom { flex-direction: column; border: none; background: transparent; gap: 10px; }
          .d_newsletter-input { border: 1px solid #ccc; border-radius: 4px; }
          .d_subscribe-btn { padding: 12px; border-radius: 4px; }
          .d_footer-main { text-align: center; }
          .d_info-item { justify-content: center; text-align: center; flex-direction: column; align-items: center; }
          .d_social-flex { justify-content: center; }
          .d_footer-bottom { justify-content: center; gap: 15px; }
        }
      `}</style>

      <div className="container">
        {/* Newsletter Section */}
        <section className="d_newsletter-container">
          <h2 className="d_newsletter-title">Sign up to get latest offers & discount</h2>
          <p className="d_newsletter-sub">
            Get updates on new arrivals and exclusive promos directly in your inbox.
          </p>
          <div className="d_input-group-custom">
            <input type="email" placeholder="Enter your Email Address" className="d_newsletter-input" />
            <button className="d_subscribe-btn">Subscribe</button>
          </div>
          <div className="d_privacy-check">
            <input type="checkbox" id="d_consent" />
            <label htmlFor="d_consent">I have read the Privacy Policy</label>
          </div>
        </section>

        {/* Links Grid */}
        <div className="row d_footer-main">
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="d_footer-col-title">Poshvue Fashion</h5>
            <ul className="d_footer-links">
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Video Shopping</a></li>
              <li><a href="#">Add Reviews</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="d_footer-col-title">Support</h5>
            <ul className="d_footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Wholesale</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Complain</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="d_footer-col-title">Policies</h5>
            <ul className="d_footer-links">
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">T&C</a></li>
              <li><a href="#">Payment</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-3 col-lg-6 ps-lg-5">
            <div className="d_contact-box">
              <h5 className="d_footer-col-title">Get in Touch</h5>
              <div className="d_info-item">
                <Phone size={18} className="text-secondary" />
                <strong>+91 81601 81706</strong>
              </div>
              <div className="d_info-item">
                <Mail size={18} className="text-secondary" />
                {/* <span>customercare@g3fashions.in</span> */}
              </div>
              <div className="d_info-item">
                <MapPin size={22} className="text-secondary" />
                <span className="small">Poshvue Fashion, Surat, Gujarat 395007</span>
              </div>
              
              <div className="d_social-flex">
                <span className="w-100 small text-muted mb-1 d-md-block d-none">FOLLOW US</span>
                <a href="#" className="d_social-icon"><Facebook size={18} /></a>
                <a href="#" className="d_social-icon"><Instagram size={18} /></a>
                <a href="#" className="d_social-icon"><Youtube size={18} /></a>
                <a href="#" className="d_social-icon" style={{background:'#25D366'}}><Send size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="d_footer-bottom">
          <p className="m-0">© 2026 Poshvue. All Rights Reserved.</p>
          <div className="d_payment-methods">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="paypal" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="visa" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;