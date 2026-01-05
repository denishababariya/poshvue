import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wishEmptyImg from "../img/image.png";

function Wishlist(props) {
  const navigate = useNavigate();

  // sample wishlist items
  const wishlistItems = [
    {
      id: 2,
      name: "Orange Traditional Set",
      price: "₹ 12,500",
      image: "https://i.pinimg.com/1200x/ef/c0/4e/efc04e6082393e91fbc688de96634dd6.jpg",
    },
    {
      id: 3,
      name: "Teal Designer Gown",
      price: "₹ 18,200",
      image: "https://i.pinimg.com/736x/12/db/7c/12db7c1771bd24b8804f828b65cc2bd0.jpg",
    },
    {
      id: 5,
      name: "Pink Floral Anarkali",
      price: "₹ 16,800",
      image: "https://i.pinimg.com/1200x/cc/99/d9/cc99d9dd2b1eb9006a6d7007784c73b1.jpg",
    },
    {
      id: 6,
      name: "Ivory Silk Lehenga",
      price: "₹ 38,000",
      image: "https://i.pinimg.com/736x/38/db/1f/38db1ffb00c2e992848cf38382b997c3.jpg",
    },
    {
      id: 9,
      name: "Mustard Yellow Kurta Set",
      price: "₹ 9,800",
      image: "https://i.pinimg.com/1200x/40/a4/15/40a415c7eefb0a7707e3a7603f66b972.jpg",
    },
    {
      id: 15,
      name: "Lavender Organza Saree",
      price: "₹ 19,000",
      image: "https://i.pinimg.com/1200x/a3/98/80/a3988042bc2db166bffa94c4ff8edee1.jpg",
    },
  ];

  return (
    <>
      <section className="z_wish_section py-5">
        <Container>
          {wishlistItems.length === 0 ? (
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="z_wish_empty_wrap text-center py-5">
                  <div className="z_wish_empty_icon_box mb-4">
                    <img src={wishEmptyImg} alt="Empty Wishlist" className="empty-img-style" />
                  </div>
                  <h3 className="z_wish_heading">Your wishlist is empty</h3>
                  <p className="z_wish_text text-muted mb-4">
                    Save your favorite items by tapping the heart icon. <br />
                    Start exploring and build your dream collection today.
                  </p>
                  <Button className="btn-dark px-4 py-2 rounded-pill" onClick={() => navigate("/")}>
                    Explore Collection <ArrowRight size={18} className="ms-2" />
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-end mb-4 pb-2 border-bottom">
                <div>
                  <h2 className="fw-bold mb-1">My Wishlist</h2>
                  <p className="text-muted small mb-0">{wishlistItems.length} Items saved</p>
                </div>
                <Button variant="link" className="text-dark fw-semibold text-decoration-none p-0" onClick={() => navigate("/")}>
                  Continue Shopping
                </Button>
              </div>

              {/* Added xs={6} for 2 columns on mobile */}
              <Row className="g-3 g-md-4">
                {wishlistItems.map((p) => (
                  <Col key={p.id} lg={3} md={4} sm={6} xs={6}>
                    <div className="d_product-card">
                      <div className="d_img-container">
                        <button
                          className="d_remove-btn"
                          aria-label="remove"
                          onClick={() => { /* Remove logic */ }}
                        >
                          <X size={18} />
                        </button>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="d_product-img"
                          onClick={() => navigate(`/product/${p.id}`)}
                          loading="lazy"
                        />
                        <div className="d_product-overlay d-none d-md-flex">
                          <button className="d_quick-view-btn" onClick={() => navigate(`/product/${p.id}`)}>
                            View Product
                          </button>
                        </div>
                      </div>

                      <div className="d_product-info">
                        <h6 className="d_product-name" title={p.name}>{p.name}</h6>
                        <p className="d_product-price">{p.price}</p>
                        
                        <div className="mt-2 mt-md-3">
                          <Button 
                            variant="dark" 
                            className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 add-bag-btn"
                          >
                            <ShoppingBag size={16} className="bag-icon" /> 
                            <span className="btn-text">Add to Bag</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </section>

      <style>{`
        .z_wish_section { background-color: #fdfdfd; min-height: 80vh; }
        
        /* Empty State */
        .empty-img-style { height: 120px; width: 120px; object-fit: contain; opacity: 0.8; }
        .z_wish_heading { font-weight: 700; letter-spacing: -0.5px; }
        .z_wish_text { font-size: 15px; line-height: 1.6; }

        /* Card Styles */
        .d_product-card { 
          background: #fff; 
          border: 1px solid #eee;
          overflow: hidden; 
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .d_product-card:hover { 
          border-color: #ddd;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          transform: translateY(-5px);
        }

        .d_img-container { 
          position: relative; 
          width: 100%; 
          aspect-ratio: 3/4; 
          background: #f8f8f8; 
          overflow: hidden;
        }

        .d_product-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          cursor: pointer;
          transition: transform 0.6s ease;
          display: block;
        }

        .d_product-card:hover .d_product-img { transform: scale(1.08); }

        /* Remove Button */
        .d_remove-btn { 
          position: absolute; 
          top: 8px; 
          right: 8px; 
          background: rgba(255, 255, 255, 0.9); 
          color: #000;
          width: 28px; 
          height: 28px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: none; 
          z-index: 10;
          transition: all 0.2s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .d_remove-btn:hover { background: #ff4d4d; color: #fff; }

        /* Overlay - Hidden on mobile for better UX */
        .d_product-overlay { 
          position: absolute; 
          bottom: 0; 
          left: 0; 
          width: 100%; 
          padding: 15px; 
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          opacity: 0; 
          transition: all 0.3s ease; 
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 40%;
        }
        .d_product-card:hover .d_product-overlay { opacity: 1; }

        .d_quick-view-btn { 
          background: #fff; 
          color: #000; 
          border: none; 
          padding: 8px 18px; 
          font-size: 12px; 
          font-weight: 600; 
          border-radius: 2px;
          text-transform: uppercase;
        }

        /* Product Info */
        .d_product-info { padding: 12px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .d_product-name { 
          font-size: 14px; 
          color: #444; 
          font-weight: 500; 
          margin-bottom: 4px; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }
        .d_product-price { 
          font-weight: 700; 
          color: #000; 
          font-size: 15px; 
          margin-bottom: 0;
        }

        .add-bag-btn {
          font-size: 13px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        /* Responsive Adjustments */
        @media (max-width: 576px) {
          .d_product-info { padding: 10px; }
          .d_product-name { font-size: 12px; }
          .d_product-price { font-size: 13px; }
          .btn-text { font-size: 11px; }
          .bag-icon { width: 14px; height: 14px; }
          .d_img-container { aspect-ratio: 2/3; } /* Slightly taller on mobile */
          .d_remove-btn { width: 24px; height: 24px; top: 5px; right: 5px; }
          .d_remove-btn svg { width: 14px; height: 14px; }
        }
      `}</style>
    </> 
  );
}

export default Wishlist;