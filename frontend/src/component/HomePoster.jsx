import React from "react";
import { Award, Users, ShieldCheck } from 'lucide-react';
import '../styles/d_style.css';

function HomePoster() {
  return (
    <>
      <section className="z_poster_section">
        {/* TOP TEXT */}
        <div className="row w-100 mb-5">
          <div className="col-12 text-center">
            <h6 className="z_poster_top_title">
              Traditional Ethnic Wear for Women
            </h6>
            <p className="z_poster_top_desc">
              Shop sarees, salwars, lehengas, and the latest trends—your go-to
              women’s ethnic styles are here. Upgrade your wardrobe with
              must-have looks that blend tradition and today’s fashion.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="row w-100 align-items-center mt-4 z_poster_main_bg ">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 col-md-6 col-12  p-0">
            <div className="text-center z_poster_content_wrap">
              <h2 className="z_poster_title">Complete Indian Wear Wardrobe</h2>
              <p className="z_poster_desc">
                Shop Sarees, Lehengas, Suits & Kurtis
              </p>
              <button className="z_poster_btn">SHOP NOW</button>
            </div>
          </div>
          {/* RIGHT IMAGE */}
          <div className="col-lg-6 col-md-6 col-12  p-0">
            <img
              src="https://i.pinimg.com/1200x/59/9c/8c/599c8cd0645006f231f4cda408c5287f.jpg"
              alt="Ethnic Wear"
              className="z_poster_img"
            />
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

      {/* 4 cards section */}
      <section className="z_cards_section">
        <div className="container-fluid">
          <div className="row z_cards_wrapper ">
            {/* CARD 1 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="z_cards_item">
                <img
                  src="https://i.pinimg.com/736x/b7/3a/67/b73a6758225e0ee8063768b3e1fae234.jpg"
                  alt="Salwar Suit"
                  className="z_cards_img"
                />
                <div className="z_cards_content">
                  <h4 className="z_cards_title">SALWAR SUIT</h4>
                  <button className="z_cards_btn">SHOP NOW</button>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="z_cards_item">
                <img
                  src="https://i.pinimg.com/736x/ad/05/26/ad0526bef8e0513ded97a312cebde552.jpg"
                  alt="Kurti Sets"
                  className="z_cards_img"
                />
                <div className="z_cards_content">
                  <h4 className="z_cards_title">KURTI SETS</h4>
                  <button className="z_cards_btn">SHOP NOW</button>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="z_cards_item">
                <img
                  src="https://i.pinimg.com/736x/f1/56/4c/f1564c099ffa7ff94258ef36f16a02a2.jpg"
                  alt="Sarees"
                  className="z_cards_img"
                />
                <div className="z_cards_content">
                  <h4 className="z_cards_title">SAREES</h4>
                  <button className="z_cards_btn">SHOP NOW</button>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="z_cards_item">
                <img
                  src="https://i.pinimg.com/736x/6d/92/52/6d9252ddbe90bf144e25505c229e174b.jpg"
                  alt="Lehengas"
                  className="z_cards_img"
                />
                <div className="z_cards_content">
                  <h4 className="z_cards_title">LEHENGAS</h4>
                  <button className="z_cards_btn">SHOP NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePoster;
