import React from 'react'
import HeroSlider from '../component/HeroSlider'
import HomeSlider from '../component/HomeSlider'
import HomePoster from '../component/HomePoster'
import { Quote } from 'lucide-react';
import '../styles/d_style.css';
import { useNavigate } from 'react-router-dom';


function Main() {

  const navigate = useNavigate();

  return (
    <>
      <HomeSlider></HomeSlider>
      <HeroSlider></HeroSlider>
      <HomePoster></HomePoster>
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
            <button
              className="btn btn-outline-light mt-4 px-4 py-2 rounded-0 small"
              onClick={() => navigate("/ShopPage")}
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
