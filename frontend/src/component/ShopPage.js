import React, { useState, useEffect } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState(39435);
  // Initialized with 2 open as requested
  const [openCategories, setOpenCategories] = useState(["Price", "Colour"]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterOptions = {
    Colour: [
      { name: "Beige", hex: "#F5F5DC" }, { name: "Black", hex: "#000000" }, { name: "Blue", hex: "#0000FF" },
      { name: "Brown", hex: "#8B4513" }, { name: "Cream", hex: "#FFFDD0" }, { name: "Gold", hex: "#FFD700" },
      { name: "Green", hex: "#008000" }, { name: "Grey", hex: "#808080" }, { name: "Magenta", hex: "#FF00FF" },
      { name: "Maroon", hex: "#800000" }, { name: "Multicolor", isMulti: true }, { name: "Navy", hex: "#000080" },
    ],
    "Delivery Days": ["2 Days", "4 Days", "7 Days", "10 Days", "20 Days", "30 Days"],
    Size: ["36", "38", "40", "42", "44", "46", "48", "50"],
    Fabric: ["Chiffon", "Cotton Silk", "Crepe", "Georgette", "Linen", "Modal Silk", "Muslin", "Organza", "Velvet"],
    Occasion: ["Bridal", "Casual", "Cocktail", "Engagement", "Festival", "Mehendi", "Partywear", "Reception", "Sangeet", "Wedding"],
    Work: ["Aabla", "Beads", "Coins", "Cowrie shells", "Cut Work", "Cutdana", "Embroidered", "Gota Patti", "Mirror Work", "Zardosi"],
    Style: ["Anarkali", "Designer", "Gown", "Indo-Western", "Jacket Style", "Jumpsuit", "Lehenga Choli", "Pakistani", "Printed", "Punjabi", "Sharara"],
    Discount: ["10%", "20%", "30%", "40%", "50%"]
  };

   const products = [
    {
      id: 1,
      name: "Cream Embroidered Suit",
      price: "₹ 15,000",
      image: "https://i.pinimg.com/1200x/f6/af/75/f6af751307adf1ad60fab1e1c20a8103.jpg",
    },
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
      id: 4,
      name: "Luxury Wedding Wear",
      price: "₹ 45,000",
      image: "https://i.pinimg.com/736x/bd/fd/a9/bdfda91bb756e9d04c3de18ca25f4bbf.jpg",
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
      id: 7,
      name: "Red Bridal Lehenga",
      price: "₹ 65,000",
      image: "https://i.pinimg.com/736x/a3/2d/34/a32d34b1d280dedb881ca7cefe842dd9.jpg",
    },
    {
      id: 8,
      name: "Mint Green Gown",
      price: "₹ 21,500",
      image: "https://www.zapdress.com/cdn/shop/files/L6_RMF_PN_E80_S_5_V.png?v=1749620700",
    },
    {
      id: 9,
      name: "Mustard Yellow Kurta Set",
      price: "₹ 9,800",
      image: "https://i.pinimg.com/1200x/40/a4/15/40a415c7eefb0a7707e3a7603f66b972.jpg",
    },
    {
      id: 10,
      name: "Royal Blue Party Wear Gown",
      price: "₹ 24,000",
      image: "https://i.pinimg.com/1200x/17/d9/5c/17d95cdfb742037f9aeeaf2d4c3228e4.jpg",
    },
    {
      id: 11,
      name: "Peach Net Anarkali",
      price: "₹ 17,500",
      image: "https://i.pinimg.com/1200x/55/bf/ce/55bfce90f9698a9a109dd0b15d3d7be6.jpg",
    },
    {
      id: 12,
      name: "Bottle Green Velvet Suit",
      price: "₹ 22,800",
      image: "https://i.pinimg.com/1200x/36/e5/b4/36e5b4620976e056d9281b9469422a94.jpg",
    },
    {
      id: 13,
      name: "White Chikankari Kurta",
      price: "₹ 7,200",
      image: "https://i.pinimg.com/736x/b4/04/01/b404010c3b624824c8ff1c26b48f7e17.jpg",
    },
    {
      id: 14,
      name: "Black Sequin Party Gown",
      price: "₹ 29,500",
      image: "https://i.pinimg.com/736x/90/93/fd/9093fd2041a6e2c6e6a33b628f97c21b.jpg",
    },
    {
      id: 15,
      name: "Lavender Organza Saree",
      price: "₹ 19,000",
      image: "https://i.pinimg.com/1200x/a3/98/80/a3988042bc2db166bffa94c4ff8edee1.jpg",
    },
    {
      id: 16,
      name: "Beige Indo-Western Set",
      price: "₹ 14,600",
      image: "https://i.pinimg.com/736x/57/b9/06/57b906ff9073441e5b24b3d14660a908.jpg",
    },
    {
      id: 17,
      name: "Magenta Wedding Lehenga",
      price: "₹ 58,000",
      image: "https://i.pinimg.com/736x/02/17/df/0217df1119b7c981f09521d3db6eb005.jpg",
    },
    {
      id: 18,
      name: "Sky Blue Sharara Set",
      price: "₹ 13,900",
      image: "https://i.pinimg.com/1200x/84/3a/40/843a4069ff00da7756cee14d39bfb1a5.jpg",
    },
    {
      id: 19,
      name: "Rust Orange Festive Suit",
      price: "₹ 11,400",
      image: "https://i.pinimg.com/1200x/6e/ce/1e/6ece1e519fa1642dcd5e58b84f77dc99.jpg",
    },
    {
      id: 20,
      name: "Golden Banarasi Saree",
      price: "₹ 42,000",
      image: "https://i.pinimg.com/736x/6a/e1/a5/6ae1a5cac221a7223c775123369f162a.jpg",
    },
    {
      id: 21,
      name: "Pastel Pink Bridal Gown",
      price: "₹ 34,500",
      image: "https://i.pinimg.com/736x/d2/3b/f6/d23bf63bc13a6ee5b90d77ef2bd66338.jpg",
    },
    {
      id: 22,
      name: "Off-White Palazzo Suit",
      price: "₹ 10,800",
      image: "https://i.pinimg.com/1200x/88/69/9d/88699d2875d327baaf58c43dba07c8e7.jpg",
    },
    {
      id: 23,
      name: "Wine Color Velvet Lehenga",
      price: "₹ 49,000",
      image: "https://i.pinimg.com/736x/8a/6c/c1/8a6cc1317c0e27138e3295283719acbc.jpg",
    },
    {
      id: 24,
      name: "Turquoise Festive Gown",
      price: "₹ 20,300",
      image: "https://i.pinimg.com/1200x/ab/f9/fe/abf9fe74734cc2c0ad38419bb224b9cd.jpg",
    },
    {
      id: 25,
      name: "Classic Maroon Anarkali",
      price: "₹ 17,900",
      image: "https://i.pinimg.com/1200x/19/26/a3/1926a39a437858e0c15611734fcacfd3.jpg",
    },
  ];

  const filterCategories = ["Price", "Colour", "Size", "Fabric", "Occasion", "Work", "Style", "Delivery Days", "Discount"];

  // Logic: Max 2 dropdowns open at once
  const toggleCategory = (catName) => {
    setOpenCategories((prev) => {
      if (prev.includes(catName)) {
        return prev.filter((item) => item !== catName);
      } else {
        const newArr = [...prev, catName];
        return newArr.length > 2 ? newArr.slice(1) : newArr;
      }
    });
  };

  const handleFilterClick = (category, value) => {
    setSelectedFilters(prev => {
      const currentCat = prev[category] || [];
      if (currentCat.includes(value)) {
        return { ...prev, [category]: currentCat.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...currentCat, value] };
      }
    });
  };

  const removeFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange(100000);
  };

  const FilterContent = () => (
    <>
      <div className="d_filter-title d-flex justify-content-between align-items-center">
        <span>All Filters</span>
        <button className="btn btn-link btn-sm text-danger fw-bold p-0" onClick={clearAllFilters}>CLEAR ALL</button>
      </div>

      {filterCategories.map((cat) => {
        const isOpen = openCategories.includes(cat);
        return (
          <div key={cat} className="d_filter-group">
            <div className="d_filter-header" onClick={() => toggleCategory(cat)}>
              {cat}
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isOpen && (
              <div className="d_filter-options pt-3">
                {cat === "Price" ? (
                  <div className="px-2 pb-2">
                    <input type="range" className="d_price-slider w-100" min="2000" max="100000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                    <div className="d_price-inputs d-flex justify-content-between mt-2">
                      <div className="d_price-box small">₹ 2,000</div>
                      <div className="d_price-box small">₹ {Number(priceRange).toLocaleString()}</div>
                    </div>
                  </div>
                ) : cat === "Colour" ? (
                  <div className="row g-2 px-1">
                    {filterOptions.Colour.map((col) => (
                      <div key={col.name} className="col-6">
                        <label className="d_checkbox-item">
                          <input type="checkbox" checked={selectedFilters[cat]?.includes(col.name) || false} onChange={() => handleFilterClick(cat, col.name)} />
                          <span className="d_color-swatch" style={{ background: col.isMulti ? 'linear-gradient(45deg, red, blue, green)' : col.hex }}></span>
                          <span className="ms-1 text-truncate">{col.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="d_scroll-options" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    {filterOptions[cat]?.map((item) => (
                      <label key={item} className="d_checkbox-item">
                        <input type="checkbox" checked={selectedFilters[cat]?.includes(item) || false} onChange={() => handleFilterClick(cat, item)} />
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
    </>
  );

  return (
    <div className="d_shop-wrapper container-fluid py-4">
      <style>{`
        .d_shop-wrapper { background: #fff; font-family: 'Inter', sans-serif; }
        .d_filter-sidebar { border-right: 1px solid #eee; position: sticky; top: 20px; height: calc(100vh - 40px); overflow-y: auto; }
        .d_filter-title { font-weight: 700; font-size: 13px; letter-spacing: 0.5px; border-bottom: 2px solid #eee; padding-bottom: 12px; }
        .d_filter-group { border-bottom: 1px solid #f8f8f8; padding: 12px 0; }
        .d_filter-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; cursor: pointer; text-transform: uppercase; }
        .d_checkbox-item { display: flex; gap: 8px; font-size: 12px; margin-bottom: 8px; cursor: pointer; align-items: center; }
        .d_color-swatch { width: 14px; height: 14px; border-radius: 50%; border: 1px solid #ddd; display: inline-block; }
        .d_price-box { border: 1px solid #eee; padding: 4px 8px; border-radius: 4px; background: #fafafa; }
        .d_price-slider { accent-color: #000; }
        .d_applied-filter-tag { background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 11px; display: flex; align-items: center; gap: 6px; font-weight: 600; }
        .d_product-card { border: none; transition: transform 0.3s ease; }
        .d_product-img { width: 100%; height: 450px; object-fit: cover; }
        .d_product-info { padding: 12px 0; text-align: center; }
      `}</style>

      <div className="row">
        {/* SIDEBAR */}
        <aside className="col-lg-2 d-none d-lg-block d_filter-sidebar">
          <FilterContent />
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-lg-10 ps-lg-4">
          {/* APPLIED FILTERS AREA */}
          <div className="d_applied-filters mb-3 d-flex flex-wrap gap-2 align-items-center">
            {Object.entries(selectedFilters).map(([category, values]) => 
              values.map(val => (
                <div key={val} className="d_applied-filter-tag">
                  {val} <X size={12} style={{cursor:'pointer'}} onClick={() => removeFilter(category, val)} />
                </div>
              ))
            )}
            {Object.values(selectedFilters).flat().length > 0 && (
              <button className="btn btn-link btn-sm text-dark fw-bold small" onClick={clearAllFilters}>Clear All</button>
            )}
          </div>

          {/* SORT BAR */}
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <div className="text-muted small fw-bold">{products.length} PRODUCTS</div>
            <select className="form-select form-select-sm w-auto border-0 fw-bold">
              <option>SORT: NEWEST</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-xl-3">
                <div className="d_product-card">
                  <div style={{position:'relative'}}>
                    <img src={product.image} alt={product.name} className="d_product-img" />
                    <div className="p-2" style={{position:'absolute', top:10, right:10, background:'#fff', borderRadius:'50%'}}><Heart size={16}/></div>
                  </div>
                  <div className="d_product-info">
                    <div className="small text-muted">{product.name}</div>
                    <div className="fw-bold">₹ {product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      {/* Mobile elements remain mostly unchanged but will pull from the same dynamic FilterContent */}
    </div>
  );
};

export default ShopPage;