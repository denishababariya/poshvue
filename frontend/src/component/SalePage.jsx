import React, { useState, useEffect } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
export default function SalePage() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(100000);
  const [openCategories, setOpenCategories] = useState(["Price", "Colour"]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSort, setSelectedSort] = useState("NEWEST");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(100000);

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

  // Fetch products from backend and keep only discounted ones
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await client.get("/catalog/products", {
          params: { page: 1, limit: 1000 },
        });
        const items = Array.isArray(res.data.items) ? res.data.items : [];

        // Keep only products that have some discount
        const discounted = items.filter((p) => {
          const dp =
            typeof p.discountPercent === "number" ? p.discountPercent : 0;
          const hasDiscountPercent = dp > 0;
          const hasSalePrice =
            typeof p.salePrice === "number" &&
            typeof p.price === "number" &&
            p.salePrice < p.price;
          return hasDiscountPercent || hasSalePrice;
        });

        setAllProducts(discounted);
        setProducts(discounted);

        const prices = discounted.map((p) =>
          typeof p.salePrice === "number" ? p.salePrice : p.price || 0
        );
        const min = prices.length ? Math.min(...prices) : 2000;
        const max = prices.length ? Math.max(...prices) : 100000;
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange(max);
      } catch (err) {
        const msg =
          err?.response?.data?.message || "Failed to load sale products";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const products = [
  //     {
  //         id: 1,
  //         name: "Cream Embroidered Suit",
  //         price: "15,000",
  //         image: "https://i.pinimg.com/1200x/f6/af/75/f6af751307adf1ad60fab1e1c20a8103.jpg",
  //         price: 2000,
  //         salePrice: 1500
  //     },
  //     {
  //         id: 2,
  //         name: "Orange Traditional Set",
  //         price: "12,500",
  //         image: "https://i.pinimg.com/1200x/ef/c0/4e/efc04e6082393e91fbc688de96634dd6.jpg",
  //         price: 2000,
  //         salePrice: 1500
  //     },
  //     {
  //         id: 3,
  //         name: "Teal Designer Gown",
  //         price: "18,200",
  //         image: "https://i.pinimg.com/736x/12/db/7c/12db7c1771bd24b8804f828b65cc2bd0.jpg",
  //         price: 2000,
  //         salePrice: 1500
  //     },
  //     {
  //         id: 4,
  //         name: "Luxury Wedding Wear",
  //         price: "45,000",
  //         image: "https://i.pinimg.com/736x/bd/fd/a9/bdfda91bb756e9d04c3de18ca25f4bbf.jpg",
  //         price: 2000,
  //         salePrice: 1500
  //     },
  //     {
  //         id: 5,
  //         name: "Pink Floral Anarkali",
  //         price: "16,800",
  //         image: "https://i.pinimg.com/1200x/cc/99/d9/cc99d9dd2b1eb9006a6d7007784c73b1.jpg",
  //         price: 2000,
  //         salePrice: 1500
  //     },
  //     {
  //         id: 6,
  //         name: "Ivory Silk Lehenga",
  //         price: "38,000",
  //         image: "https://i.pinimg.com/736x/38/db/1f/38db1ffb00c2e992848cf38382b997c3.jpg",
  //     },
  //     {
  //         id: 7,
  //         name: "Red Bridal Lehenga",
  //         price: "65,000",
  //         image: "https://i.pinimg.com/736x/a3/2d/34/a32d34b1d280dedb881ca7cefe842dd9.jpg",
  //     },
  //     {
  //         id: 8,
  //         name: "Mint Green Gown",
  //         price: "21,500",
  //         image: "https://www.zapdress.com/cdn/shop/files/L6_RMF_PN_E80_S_5_V.png?v=1749620700",
  //     },
  //     {
  //         id: 9,
  //         name: "Mustard Yellow Kurta Set",
  //         price: "9,800",
  //         image: "https://i.pinimg.com/1200x/40/a4/15/40a415c7eefb0a7707e3a7603f66b972.jpg",
  //     },
  //     {
  //         id: 10,
  //         name: "Royal Blue Party Wear Gown",
  //         price: "24,000",
  //         image: "https://i.pinimg.com/1200x/17/d9/5c/17d95cdfb742037f9aeeaf2d4c3228e4.jpg",
  //     },
  //     {
  //         id: 11,
  //         name: "Peach Net Anarkali",
  //         price: "17,500",
  //         image: "https://i.pinimg.com/1200x/55/bf/ce/55bfce90f9698a9a109dd0b15d3d7be6.jpg",
  //     },
  //     {
  //         id: 12,
  //         name: "Bottle Green Velvet Suit",
  //         price: "22,800",
  //         image: "https://i.pinimg.com/1200x/36/e5/b4/36e5b4620976e056d9281b9469422a94.jpg",
  //     },
  //     {
  //         id: 13,
  //         name: "White Chikankari Kurta",
  //         price: "7,200",
  //         image: "https://i.pinimg.com/736x/b4/04/01/b404010c3b624824c8ff1c26b48f7e17.jpg",
  //     },
  //     {
  //         id: 14,
  //         name: "Black Sequin Party Gown",
  //         price: "29,500",
  //         image: "https://i.pinimg.com/736x/90/93/fd/9093fd2041a6e2c6e6a33b628f97c21b.jpg",
  //     },
  //     {
  //         id: 15,
  //         name: "Lavender Organza Saree",
  //         price: "19,000",
  //         image: "https://i.pinimg.com/1200x/a3/98/80/a3988042bc2db166bffa94c4ff8edee1.jpg",
  //     },
  //     {
  //         id: 16,
  //         name: "Beige Indo-Western Set",
  //         price: "14,600",
  //         image: "https://i.pinimg.com/736x/57/b9/06/57b906ff9073441e5b24b3d14660a908.jpg",
  //     },
  //     {
  //         id: 17,
  //         name: "Magenta Wedding Lehenga",
  //         price: "58,000",
  //         image: "https://i.pinimg.com/736x/02/17/df/0217df1119b7c981f09521d3db6eb005.jpg",
  //     },
  //     {
  //         id: 18,
  //         name: "Sky Blue Sharara Set",
  //         price: "13,900",
  //         image: "https://i.pinimg.com/1200x/84/3a/40/843a4069ff00da7756cee14d39bfb1a5.jpg",
  //     },
  //     {
  //         id: 19,
  //         name: "Rust Orange Festive Suit",
  //         price: "11,400",
  //         image: "https://i.pinimg.com/1200x/6e/ce/1e/6ece1e519fa1642dcd5e58b84f77dc99.jpg",
  //     },
  //     {
  //         id: 20,
  //         name: "Golden Banarasi Saree",
  //         price: "42,000",
  //         image: "https://i.pinimg.com/736x/6a/e1/a5/6ae1a5cac221a7223c775123369f162a.jpg",
  //     },
  //     {
  //         id: 21,
  //         name: "Pastel Pink Bridal Gown",
  //         price: "34,500",
  //         image: "https://i.pinimg.com/736x/d2/3b/f6/d23bf63bc13a6ee5b90d77ef2bd66338.jpg",
  //     },
  //     {
  //         id: 22,
  //         name: "Off-White Palazzo Suit",
  //         price: "10,800",
  //         image: "https://i.pinimg.com/1200x/88/69/9d/88699d2875d327baaf58c43dba07c8e7.jpg",
  //     },
  //     {
  //         id: 23,
  //         name: "Wine Color Velvet Lehenga",
  //         price: "49,000",
  //         image: "https://i.pinimg.com/736x/8a/6c/c1/8a6cc1317c0e27138e3295283719acbc.jpg",
  //     },
  //     {
  //         id: 24,
  //         name: "Turquoise Festive Gown",
  //         price: "20,300",
  //         image: "https://i.pinimg.com/1200x/ab/f9/fe/abf9fe74734cc2c0ad38419bb224b9cd.jpg",
  //     },
  //     {
  //         id: 25,
  //         name: "Classic Maroon Anarkali",
  //         price: "17,900",
  //         image: "https://i.pinimg.com/1200x/19/26/a3/1926a39a437858e0c15611734fcacfd3.jpg",
  //     },
  // ];

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
    setPriceRange(maxPrice);
  };

  // Apply price + discount filters and sorting to sale products
  useEffect(() => {
    let list = [...allProducts];

    // Price slider
    list = list.filter((p) => {
      const price =
        typeof p.salePrice === "number" ? p.salePrice : p.price || 0;
      return price <= Number(priceRange || 0);
    });

    const hasSel = (key) =>
      Array.isArray(selectedFilters[key]) && selectedFilters[key].length > 0;

    // Discount filter (10%, 20% etc)
    if (hasSel("Discount")) {
      const thresholds = selectedFilters["Discount"]
        .map((s) => parseInt(String(s).replace("%", ""), 10))
        .filter((n) => !isNaN(n));
      const minThreshold = thresholds.length ? Math.min(...thresholds) : null;
      if (minThreshold !== null) {
        list = list.filter((p) => {
          const dp =
            typeof p.discountPercent === "number"
              ? p.discountPercent
              : typeof p.salePrice === "number" && typeof p.price === "number"
              ? Math.round((1 - p.salePrice / p.price) * 100)
              : 0;
          return dp >= minThreshold;
        });
      }
    }

    // Sorting similar to shop page
    list.sort((a, b) => {
      const priceA =
        typeof a.salePrice === "number" ? a.salePrice : a.price || 0;
      const priceB =
        typeof b.salePrice === "number" ? b.salePrice : b.price || 0;
      switch (selectedSort) {
        case "PRICE_LOW_HIGH":
          return priceA - priceB;
        case "PRICE_HIGH_LOW":
          return priceB - priceA;
        case "DISCOUNT":
          return (b.discountPercent || 0) - (a.discountPercent || 0);
        case "NEWEST":
        default:
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
      }
    });

    setProducts(list);
  }, [allProducts, selectedFilters, priceRange, selectedSort, maxPrice]);

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
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                    <div className="d_price-inputs d-flex justify-content-between mt-2">
                      <div className="d_price-box small">2,000</div>
                      <div className="d_price-box small">
                        {Number(priceRange).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : cat === "Colour" ? (
                  <div className="row g-2 px-1">
                    {filterOptions.Colour.map((col) => (
                      <div key={col.name} className="col-6">
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
    <>
      <div className="d_shop-wrapper container-fluid p-0">
        <style>{`
        .d_shop-wrapper { background: #fff }
        
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
        .d_price-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .d_original-price {
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
        }

        .d_sale-badge {
            background: rgb(255, 233, 233);
            color: rgb(188, 52, 62) ;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 3px;
            line-height: 1;
            white-space: nowrap;
        }
        .d_sale-badge {
            border-radius: 12px;
            padding: 8px 8px;
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
          <h1>Exclusive Sale</h1>
          <div className="breadcrumb-text">HOME / SALE PRODUCTS</div>
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
                  className={`sort-option-item p-3 border-bottom d-flex justify-content-between align-items-center ${
                    selectedSort === opt.value ? "bg-light fw-bold" : ""
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
              {error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}
              {loading && (
                <div className="text-center py-4">Loading sale products...</div>
              )}
              <div className="row g-3 g-md-4 mb-5">
                {products.map((product) => {
                  const discountPercent =
                    typeof product.discountPercent === "number"
                      ? product.discountPercent
                      : typeof product.salePrice === "number" &&
                        typeof product.price === "number"
                      ? Math.round(
                          (1 - product.salePrice / product.price) * 100
                        )
                      : 0;

                  const salePrice =
                    typeof product.salePrice === "number"
                      ? product.salePrice
                      : product.price;

                  return (
                    <div
                      key={product._id}
                      className="col-6 col-md-4 col-xl-3"
                    >
                      <div className="d_product-card">
                        {/* IMAGE */}
                        <div className="d_img-container">
                          <img
                            src={
                              Array.isArray(product.images)
                                ? product.images[0]
                                : product.image
                            }
                            alt={product.title}
                            className="d_product-img"
                          />
                          {/* VIEW DETAIL OVERLAY */}
                          <div className="d_product-overlay d-none d-md-block">
                            <button
                              className="d_view-detail-btn"
                              onClick={() => navigate(`/product/${product._id}`)}
                            >
                              View Detail
                            </button>
                          </div>
                        </div>

                        {/* INFO */}
                        <div className="d_product-info px-2">
                          <div className="d_product-name text-truncate">
                            {product.title}
                          </div>

                          <div className="d_price-wrapper">
                            <span className="d_product-price">
                              ₹{salePrice}
                            </span>

                            <span className="d_original-price">
                              ₹{product.price}
                            </span>

                            {discountPercent > 0 && (
                              <span className="d_sale-badge">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
