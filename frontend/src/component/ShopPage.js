import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState(39435);
  const [openCategories, setOpenCategories] = useState(["Price", "Colour"]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSort, setSelectedSort] = useState("NEWEST");
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await client.get("/wishlist");
        const ids = res.data?.items?.map(i => i.product._id) || [];
        setWishlistIds(ids);
      } catch (err) {
        // user not logged in or empty wishlist
      }
    };

    fetchWishlist();
  }, []);
  const toggleWishlist = async (productId) => {
    try {
      await client.post("/wishlist/toggle", { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setWishlistIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to use wishlist");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    }
  };
  const addToCart = async (productId) => {
    try {
      setCartLoadingId(productId);
      await client.post("/cart/add", { productId, qty: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      alert("Added to cart");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to add items to cart");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setCartLoadingId(null);
    }
  };


  const filterOptions = {
    Colour: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Black", hex: "#000000" },
      { name: "Blue", hex: "#0000FF" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Gold", hex: "#FFD700" },
      { name: "Green", hex: "#008000" },
      { name: "Grey", hex: "#808080" },
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Maroon", hex: "#800000" },
      { name: "Multicolor", isMulti: true },
      { name: "Navy", hex: "#000080" },
    ],
    Size: ["36", "38", "40", "42", "44", "46", "48", "50"],
    Fabric: [
      "Chiffon",
      "Cotton Silk",
      "Crepe",
      "Georgette",
      "Linen",
      "Modal Silk",
      "Muslin",
      "Organza",
      "Velvet",
    ],
    Occasion: [
      "Bridal",
      "Casual",
      "Cocktail",
      "Engagement",
      "Festival",
      "Mehendi",
      "Partywear",
      "Reception",
      "Sangeet",
      "Wedding",
    ],
    Work: [
      "Aabla",
      "Beads",
      "Coins",
      "Cowrie shells",
      "Cut Work",
      "Cutdana",
      "Embroidered",
      "Gota Patti",
      "Mirror Work",
      "Zardosi",
    ],
    Style: [
      "Anarkali",
      "Designer",
      "Gown",
      "Indo-Western",
      "Jacket Style",
      "Jumpsuit",
      "Lehenga Choli",
      "Pakistani",
      "Printed",
      "Punjabi",
      "Sharara",
    ],
    Discount: ["10%", "20%", "30%", "40%", "50%"],
  };

  const sortOptions = [
    { label: "NEWEST", value: "NEWEST" },
    { label: "PRICE: LOW TO HIGH", value: "PRICE_LOW_HIGH" },
    { label: "PRICE: HIGH TO LOW", value: "PRICE_HIGH_LOW" },
    { label: "DISCOUNT", value: "DISCOUNT" },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await client.get("/catalog/products", { params: { page: 1, limit: 24 } });
        setProducts(Array.isArray(res.data.items) ? res.data.items : []);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load products";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);




  const filterCategories = [
    "Price",
    "Colour",
    "Size",
    "Fabric",
    "Occasion",
    "Work",
    "Style",
    "Discount",
  ];

  const toggleCategory = (catName) => {
    setOpenCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((item) => item !== catName)
        : [...prev, catName]
    );
  };

  const handleFilterClick = (category, value) => {
    setSelectedFilters((prev) => {
      const currentCat = prev[category] || [];
      return currentCat.includes(value)
        ? { ...prev, [category]: currentCat.filter((v) => v !== value) }
        : { ...prev, [category]: [...currentCat, value] };
    });
  };

  const removeFilter = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange(100000);
  };

  const FilterContent = () => (
    <div className="p-3 p-lg-0">
      <div className="d_filter-title d-flex justify-content-between align-items-center">
        <span>All Filters</span>
        <button
          className="btn btn-link btn-sm text-danger fw-bold p-0 text-decoration-none"
          onClick={clearAllFilters}
        >
          CLEAR ALL
        </button>
      </div>

      {filterCategories.map((cat) => {
        const isOpen = openCategories.includes(cat);
        return (
          <div key={cat} className="d_filter-group">
            <div
              className="d_filter-header"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isOpen && (
              <div className="d_filter-options pt-3">
                {cat === "Price" ? (
                  <div className="px-2 pb-2">
                    <input
                      type="range"
                      className="d_price-slider w-100"
                      min="2000"
                      max="100000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <div className="d_price-inputs d-flex justify-content-between mt-2">
                      <div className="d_price-box small">₹ 2,000</div>
                      <div className="d_price-box small">
                        ₹ {Number(priceRange).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : cat === "Colour" ? (
                  <div className="row g-2 px-1">
                    {filterOptions.Colour.map((col) => (
                      <div key={col.name} className="col-12 col-xl-6">
                        <label className="d_checkbox-item">
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[cat]?.includes(col.name) || false
                            }
                            onChange={() => handleFilterClick(cat, col.name)}
                          />
                          <span
                            className="d_color-swatch"
                            style={{
                              background: col.isMulti
                                ? "linear-gradient(45deg, red, blue, green)"
                                : col.hex,
                            }}
                          ></span>
                          <span className="ms-1 text-truncate">{col.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="d_scroll-options"
                    style={{ maxHeight: "180px", overflowY: "auto" }}
                  >
                    {filterOptions[cat]?.map((item) => (
                      <label key={item} className="d_checkbox-item">
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[cat]?.includes(item) || false
                          }
                          onChange={() => handleFilterClick(cat, item)}
                        />
                        {item} {cat === "Discount" && " & Above"}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="d_shop-wrapper container-fluid p-0">
      <style>{`
        .d_shop-wrapper { background: #fff; }
        
        /* Banner Styles */
        .shop-hero-banner {
            height: 300px;
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.prismic.io/milanmagic/2f153233-cb33-4a1b-b095-98fbd5b0dee8_Untitled%20design%20(29).png?auto=compress,format&rect=0,0,1200,600&w=1200&h=600');
            background-size: cover;
            background-position:center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            text-align: center;
            margin-bottom: 40px;
        }
        .shop-hero-banner h1 { font-size: 3rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
        .breadcrumb-text { font-size: 14px; opacity: 0.9; margin-top: 10px; letter-spacing: 1px; }

        .d_filter-sidebar { border-right: 1px solid #eee; position: sticky; top: 20px; height: calc(100vh - 40px); overflow-y: auto; }
        .d_filter-title { font-weight: 700; font-size: 13px; letter-spacing: 0.5px; border-bottom: 2px solid #eee; padding-bottom: 12px; }
        .d_filter-group { border-bottom: 1px solid #f8f8f8; padding: 12px 0; }
        .d_filter-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; cursor: pointer; text-transform: uppercase; }
        .d_checkbox-item { display: flex; gap: 8px; font-size: 12px; margin-bottom: 8px; cursor: pointer; align-items: center; }
        .d_color-swatch { width: 14px; height: 14px; border-radius: 50%; border: 1px solid #ddd; display: inline-block; }
        .d_price-box { border: 1px solid #eee; padding: 4px 8px; border-radius: 4px; background: #fafafa; }
        .d_price-slider { accent-color: #000; }
        .d_applied-filter-tag { background: #f0f0f0; padding: 6px 14px; border-radius: 20px; font-size: 11px; display: flex; align-items: center; gap: 8px; font-weight: 600; text-transform: uppercase; }
        .d_product-card { position: relative; border: none; overflow: hidden; cursor: pointer; }
        .d_img-container { position: relative; width: 100%; overflow: hidden; }
        .d_product-img { width: 100%; height: 450px; object-fit: cover; transition: transform 0.5s ease; }
        .d_wishlist-btn { position: absolute; top: 15px; right: 15px; background: #fff; width: 35px; height: 35px; border-radius: 50% !important; display: flex; align-items: center; justify-content: center; z-index: 5; border: none; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .d_wishlist-btn:hover { background: #000; }
        .d_wishlist-btn:hover svg { stroke: #fff; }
        .d_product-overlay { position: absolute; bottom: -50px; left: 0; width: 100%; background: rgb(0 0 0 / 30%); padding: 12px; text-align: center; transition: all 0.3s ease; opacity: 0; }
        .d_product-card:hover .d_product-overlay { bottom: 0; opacity: 1; }
        .d_product-card:hover .d_product-img { transform: scale(1.05); }
        .d_view-detail-btn { background: #000; color: #fff; border: none; font-size: 11px; font-weight: 700; padding: 8px 20px; text-transform: uppercase; letter-spacing: 1px; }
        .d_product-info { padding: 15px 0; text-align: center; }
        .d_product-name { font-size: 13px; color: #555; margin-bottom: 5px; }
        .d_product-price { font-weight: 700; color: #000; font-size: 14px; }
        .d_cart-btn {
          position: absolute;
          top: 60px; /* wishlist ni niche */
          right: 15px;
          background: #fff;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .d_cart-btn:hover {
          background: #000;
        }

        .d_cart-btn:hover svg {
          stroke: #fff;
        }

        .d_cart-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        @media (max-width: 991px) {
          .shop-hero-banner { height: 200px; }
          .shop-hero-banner h1 { font-size: 2rem; }
          .d_filter-sidebar { display: none; }
          .d_product-img { height: 320px; }
          .mobile-filter-bar { background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; margin-bottom: 20px; position: sticky; top: 0; z-index: 100; }
          .mobile-filter-btn { flex: 1; text-align: center; padding: 12px; font-size: 12px; font-weight: 700; border-right: 1px solid #eee; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; justify-content: center; }
        }
      `}</style>

      {/* NEW HERO BANNER */}
      <section className="shop-hero-banner">
        <h1>Our Collection</h1>
        <div className="breadcrumb-text">HOME / SHOP / ALL PRODUCTS</div>
      </section>

      <div className="container-fluid px-lg-5">
        {/* MOBILE FILTER & SORT BAR */}
        <div className="d-lg-none d-flex mobile-filter-bar">
          <div
            className="mobile-filter-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasFilters"
          >
            <Filter size={14} className="me-2" /> Filter
          </div>
          <div
            className="mobile-filter-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSort"
          >
            <ArrowUpDown size={14} className="me-2" /> Sort
          </div>
        </div>

        {/* OFFCANVAS FOR FILTERS (Mobile) */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasFilters"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title fw-bold small">FILTERS</h5>
            <button
              type="button"
              className="btn-close text-reset shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <FilterContent />
          </div>
          <div className="p-3 border-top">
            <button
              className="btn btn-dark w-100 py-2 fw-bold"
              data-bs-dismiss="offcanvas"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>

        {/* OFFCANVAS FOR SORT (Mobile Bottom Sheet) */}
        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="offcanvasSort"
          style={{ height: "auto" }}
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title fw-bold small text-uppercase">
              Sort By
            </h5>
            <button
              type="button"
              className="btn-close text-reset shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            {sortOptions.map((opt) => (
              <div
                key={opt.value}
                className={`sort-option-item p-3 border-bottom d-flex justify-content-between align-items-center ${selectedSort === opt.value ? "bg-light fw-bold" : ""
                  }`}
                onClick={() => setSelectedSort(opt.value)}
                data-bs-dismiss="offcanvas"
              >
                {opt.label}
                {selectedSort === opt.value && (
                  <Check size={16} className="text-success" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          {/* DESKTOP SIDEBAR */}
          <aside className="col-lg-2 d-none d-lg-block d_filter-sidebar">
            <FilterContent />
          </aside>

          {/* MAIN CONTENT */}
          <main className="col-lg-10 ps-lg-4">
            {/* APPLIED FILTERS */}
            <div className="d_applied-filters mb-3 d-flex flex-wrap gap-2 align-items-center">
              {Object.entries(selectedFilters).map(([category, values]) =>
                values.map((val) => (
                  <div key={val} className="d_applied-filter-tag">
                    {val}{" "}
                    <X
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFilter(category, val)}
                    />
                  </div>
                ))
              )}
              {Object.values(selectedFilters).flat().length > 0 && (
                <button
                  className="btn btn-link btn-sm text-dark fw-bold small text-decoration-none"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* DESKTOP SORT BAR */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <div
                className="text-muted small fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                {products.length} PRODUCTS FOUND
              </div>
              <select
                className="form-select form-select-sm w-auto border-0 fw-bold cursor-pointer shadow-none d-none d-lg-block"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    SORT: {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* PRODUCT GRID */}
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="text-center py-4">Loading products...</div>}
            <div className="row g-3 g-md-4 mb-5">
              {products.map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-xl-3">
                  <div className="d_product-card">
                    <div className="d_img-container">
                      {/* <button className="d_wishlist-btn">
                        <Heart size={18} color="#000" />
                      </button>
                      <button className="d_cart-btn">
                        <ShoppingCart size={18} color="#000" />
                      </button> */}
                      <button
                        className="d_wishlist-btn"
                        onClick={() => toggleWishlist(product._id)}
                      >
                        <Heart
                          size={18}
                          fill={wishlistIds.includes(product._id) ? "black" : "none"}
                          stroke="black"
                        />
                      </button>

                      <button
                        className="d_cart-btn"
                        disabled={cartLoadingId === product._id}
                        onClick={() => addToCart(product._id)}
                      >
                        <ShoppingCart size={18} color="#000" />
                      </button>
                      <img
                        src={(Array.isArray(product.images) ? product.images[0] : product.image)}
                        alt={product.title}
                        className="d_product-img"
                      />
                      <div className="d_product-overlay d-none d-md-block">
                        <button
                          className="d_view-detail-btn"
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                    <div className="d_product-info">
                      <div className="d_product-name text-truncate px-2">
                        {product.title}
                      </div>
                      <div className="d_product-price">
                        ₹ {(product.salePrice || product.price)?.toLocaleString?.() || product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
