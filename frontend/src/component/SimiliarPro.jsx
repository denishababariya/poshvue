import React, { useRef, useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useCurrency } from "../context/CurrencyContext";

function SimiliarPro({ items, productId, category }) {
  const navigate = useNavigate();
  const { formatPrice, selectedCountry } = useCurrency(); // Add selectedCountry to trigger re-render
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render when country changes
  const scrollRef = useRef(null);
  
  // Listen for country changes and force re-render
  useEffect(() => {
    const handleCountryChange = () => {
      setRefreshKey(prev => prev + 1);
    };
    window.addEventListener('countryChanged', handleCountryChange);
    return () => window.removeEventListener('countryChanged', handleCountryChange);
  }, []);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [products, setProducts] = useState(items || []);

  // fetch related products from backend when items not provided
  useEffect(() => {
    let mounted = true;
    const fetchRelated = async () => {
      if (items && items.length) return; // items provided, don't fetch
      try {
        // try to fetch by category, fallback to all
        const params = {};
        if (category) params.category = category;
        params.limit = 12;
        const res = await client.get("/catalog/products", { params });
        const list = Array.isArray(res.data.items) ? res.data.items : (res.data?.items ?? res.data ?? []);
        if (!mounted) return;
        // exclude current product
        const filtered = list.filter((p) => String(p._id || p.id) !== String(productId)).slice(0, 12);
        setProducts(filtered.length ? filtered : (items || products));
      } catch (err) {
        // keep default items if fetch fails
        console.warn("Failed to load related products", err);
      }
    };
    fetchRelated();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, category, items]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
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
      const firstCard = scrollRef.current.querySelector(".sim-card");
      if (firstCard) {
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
          <button className="nav-btn" onClick={() => scroll("left")} disabled={!canScrollLeft} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-btn" onClick={() => scroll("right")} disabled={!canScrollRight} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="similiar-row" ref={scrollRef} onScroll={checkScroll}>
        {products.map((product) => (
          <div key={product._id || product.id} className="sim-card">
            <div className="d_product-card">
              <div className="d_img-container">
                <button className="d_wishlist-btn" aria-label="wishlist">
                  <Heart size={16} color="#000" />
                </button>
                <img src={product.images?.[0] || product.image} alt={product.name || product.title} className="d_product-img" />
                <div className="d_product-overlay">
                  <button
                    className="d_view-detail-btn"
                    onClick={() => navigate(`/product/${product._id || product.id}`)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
              <div className="d_product-info">
                <div className="d_product-name text-truncate">{product.name || product.title}</div>
                <div className="d_product-price">{formatPrice(product.salePrice || product.price)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimiliarPro;