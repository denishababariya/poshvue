import React, { useRef, useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SimiliarPro({ items }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products =
    items || [
      { id: 101, name: "Cream Embroidered Suit", price: "₹ 15,000", image: "https://i.pinimg.com/1200x/f6/af/75/f6af751307adf1ad60fab1e1c20a8103.jpg" },
      { id: 102, name: "Orange Traditional Set", price: "₹ 12,500", image: "https://i.pinimg.com/1200x/ef/c0/4e/efc04e6082393e91fbc688de96634dd6.jpg" },
      { id: 103, name: "Teal Designer Gown", price: "₹ 18,200", image: "https://i.pinimg.com/736x/12/db/7c/12db7c1771bd24b8804f828b65cc2bd0.jpg" },
      { id: 104, name: "Pink Floral Anarkali", price: "₹ 16,800", image: "https://i.pinimg.com/1200x/cc/99/d9/cc99d9dd2b1eb9006a6d7007784c73b1.jpg" },
      { id: 105, name: "Ivory Silk Lehenga", price: "₹ 38,000", image: "https://i.pinimg.com/736x/38/db/1f/38db1ffb00c2e992848cf38382b997c3.jpg" },
      { id: 106, name: "Red Bridal Set", price: "₹ 45,000", image: "https://i.pinimg.com/1200x/88/69/9d/88699d2875d327baaf58c43dba07c8e7.jpg" },
    ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Using a slightly larger buffer for fractional pixel calculations
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Find the first product card to get its exact width
      const firstCard = scrollRef.current.querySelector(".sim-card");
      if (firstCard) {
        // Card width + the gap (20px defined in CSS)
        const cardWidth = firstCard.offsetWidth + 20; 
        
        scrollRef.current.scrollBy({
          left: direction === "left" ? -cardWidth : cardWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="similiar-products my-5">
      <style>{`
        .similiar-row::-webkit-scrollbar { display: none; }
        .similiar-row { 
          display: flex; 
          gap: 20px; 
          overflow-x: auto; 
          scroll-behavior: smooth; 
          -ms-overflow-style: none; 
          scrollbar-width: none;
          padding: 10px 0;
          /* Ensures snapping to cards for better UX */
          scroll-snap-type: x mandatory;
        }

        .sim-card { 
          flex: 0 0 calc(25% - 15px); 
          min-width: 250px; 
          scroll-snap-align: start;
        }

        .similiar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .similiar-header h5 { font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0; font-size: 1.1rem; }
        
        .nav-arrows { display: flex; gap: 10px; }
        .nav-btn { 
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; 
          display: flex; align-items: center; justify-content: center; 
          background: #fff; cursor: pointer; transition: all 0.3s ease; 
          color: #000;
        }
        .nav-btn:hover:not(:disabled) { background: #000; border-color: #000; color: #fff; }
        .nav-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .d_product-card { position: relative; border: none; overflow: hidden; cursor: pointer; background: #fff; }
        .d_img-container { position: relative; width: 100%; overflow: hidden; aspect-ratio: 3/4; }
        .d_product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        
        .d_wishlist-btn { position: absolute; top: 12px; right: 12px; background: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 5; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .d_product-overlay { position: absolute; bottom: -50px; left: 0; width: 100%; background: rgb(76 76 76 / 47%); padding: 10px; text-align: center; transition: all 0.3s ease; opacity: 0; }
        .d_product-card:hover .d_product-overlay { bottom: 0; opacity: 1; }
        .d_view-detail-btn { background: #000; color: #fff; border: none; font-size: 10px; font-weight: 700; padding: 8px 15px; text-transform: uppercase; width: 100%; }
        
        .d_product-info { padding: 15px 0; text-align: left; }
        .d_product-name { font-size: 14px; color: #333; margin-bottom: 4px; font-weight: 500; }
        .d_product-price { font-weight: 700; color: #000; font-size: 15px; }

        @media (max-width: 992px) {
          .sim-card { flex: 0 0 calc(33.33% - 14px); }
        }

        @media (max-width: 768px) {
          .sim-card { flex: 0 0 55%; }
          .similiar-row { gap: 15px; }
        }
      `}</style>

      <div className="similiar-header">
        <h5>Similar Products</h5>
        <div className="nav-arrows">
          <button 
            className="nav-btn" 
            onClick={() => scroll("left")} 
            disabled={!canScrollLeft}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="nav-btn" 
            onClick={() => scroll("right")} 
            disabled={!canScrollRight}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="similiar-row" ref={scrollRef} onScroll={checkScroll}>
        {products.map((product) => (
          <div key={product.id} className="sim-card">
            <div className="d_product-card">
              <div className="d_img-container">
                <button className="d_wishlist-btn" aria-label="wishlist">
                  <Heart size={16} color="#000" />
                </button>
                <img src={product.image} alt={product.name} className="d_product-img" />
                <div className="d_product-overlay">
                  <button
                    className="d_view-detail-btn"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
              <div className="d_product-info">
                <div className="d_product-name text-truncate">{product.name}</div>
                <div className="d_product-price">{product.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimiliarPro;