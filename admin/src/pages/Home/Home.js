import React, { useState, useEffect } from "react";
import { FiEdit2, FiSave, FiEye, FiPlus, FiTrash2, FiImage, FiType } from "react-icons/fi";
import client from "../../api/client";

function Home() {
  const [homePoster, setHomePoster] = useState({
    topText: { title: '', desc: '' },
    mainContent: { title: '', desc: '', buttonText: '', image: '' },
    whyChooseUs: [{ icon: '', title: '', desc: '' }],
    cards: [{ image: '', title: '', buttonText: '' }],
    slider: [{ title: '', subtitle: '', image: '', buttonText: '' }]
  });
  const [slider, setSlider] = useState({
    slides: [{ title: '', subtitle: '', image: '', buttonText: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState('edit');

  useEffect(() => {
    const fetchHomePoster = async () => {
      try {
        setLoading(true);
        const res = await client.get("/home-poster");
        if (res.data) setHomePoster(res.data);
      } catch (err) {
        setError("Failed to load home poster");
      } finally {
        setLoading(false);
      }
    };
    fetchHomePoster();
  }, []);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await client.get("/slider");
        if (res.data && res.data.slides && res.data.slides.length > 0) {
          setSlider(res.data);
        } else {
          // Keep default data if no data from API
          console.log("No slider data found, using default");
        }
      } catch (err) {
        console.log("Failed to load slider, using default data");
      }
    };
    fetchSlider();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      // Save both home poster and slider data
      await Promise.all([
        client.put("/home-poster", homePoster),
        client.put("/slider", slider)
      ]);
      alert("Home content and slider updated successfully");
    } catch (err) {
      setError("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      setHomePoster(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item)
      }));
    } else if (section.includes('.')) {
      const [parent, child] = section.split('.');
      setHomePoster(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setHomePoster(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const addItem = (section) => {
    const newItem = section === 'whyChooseUs' ? { icon: '', title: '', desc: '' } : { image: '', title: '', buttonText: '' };
    setHomePoster(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setHomePoster(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSliderChange = (index, field, value) => {
    setSlider(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => i === index ? { ...slide, [field]: value } : slide)
    }));
  };

  const addSlide = () => {
    setSlider(prev => ({
      ...prev,
      slides: [...prev.slides, { title: '', subtitle: '', image: '', buttonText: '' }]
    }));
  };

  const removeSlide = (index) => {
    setSlider(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }));
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Home Poster Management</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}>
            <FiEye /> {mode === 'edit' ? 'Preview' : 'Edit'}
          </button>
          <button className="btn btn-success" onClick={handleSave} disabled={saving}>
            <FiSave /> {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {mode === 'preview' ? (
        // Preview Mode - Render the HomePoster component design
        <div>
          <style>{`
            .z_poster_section { padding: 50px 0; }
            .z_poster_top_title { font-size: 1.5rem; color: #333; margin-bottom: 10px; }
            .z_poster_top_desc { font-size: 1rem; color: #666; line-height: 1.6; }
            .z_poster_main_bg { background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 50px 0; }
            .z_poster_title { font-size: 2.5rem; color: #4a0404; margin-bottom: 15px; }
            .z_poster_desc { font-size: 1.2rem; color: #666; margin-bottom: 20px; }
            .z_poster_btn { background: #b08d57; color: white; border: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; cursor: pointer; }
            .z_poster_img { width: 100%; height: 400px; object-fit: cover; border-radius: 10px; }
            .d_features-bg { background: #f8f9fa; padding: 50px 0; }
            .d_icon-box { font-size: 2rem; color: #b08d57; margin-bottom: 15px; }
            .d_text-muted { color: #6c757d; }
            .z_cards_section { padding: 50px 0; }
            .z_cards_wrapper { display: flex; flex-wrap: wrap; }
            .z_cards_item { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); flex: 1 1 300px; }
            .z_cards_img { width: 100%; height: 250px; object-fit: cover; }
            .z_cards_content { padding: 20px; text-align: center; }
            .z_cards_title { font-size: 1.5rem; color: #4a0404; margin-bottom: 15px; }
            .z_cards_btn { background: #b08d57; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; cursor: pointer; }
            .hero-slider-section { padding: 50px 0; background: #f8f9fa; }
            .hero-slide { display: flex; align-items: center; min-height: 400px; background-size: cover; background-position: center; border-radius: 10px; margin-bottom: 20px; position: relative; }
            .hero-slide-image { position: absolute; width: 100%; height: 100%; object-fit: cover; border-radius: 10px; z-index: 1; }
            .hero-slide-content { position: relative; z-index: 2; flex: 1; padding: 50px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            .hero-slide-title { font-size: 3rem; font-weight: bold; margin-bottom: 15px; }
            .hero-slide-subtitle { font-size: 1.5rem; margin-bottom: 20px; }
            .hero-slide-btn { background: #b08d57; color: white; border: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; cursor: pointer; }
          `}</style>

          {/* Hero Slider Preview */}
          <section className="hero-slider-section">
            <div className="container">
              {slider && slider.slides && slider.slides.length > 0 && slider.slides[0].title ? (
                // Show actual slider data if it exists and has content
                slider.slides.map((slide, index) => (
                  <div key={index} className="hero-slide">
                    <img 
                      src={slide.image || 'https://via.placeholder.com/1200x400/cccccc/666666?text=No+Image'} 
                      alt={slide.title || 'Slide'} 
                      className="hero-slide-image"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x400/cccccc/666666?text=No+Image';
                      }}
                    />
                    <div className="hero-slide-content">
                      <h1 className="hero-slide-title">{slide.title || 'Sample Title'}</h1>
                      <p className="hero-slide-subtitle">{slide.subtitle || 'Sample subtitle for the slide'}</p>
                      <button className="hero-slide-btn">{slide.buttonText || 'Learn More'}</button>
                    </div>
                  </div>
                ))
              ) : (
                // Show fallback content
                <div className="hero-slide">
                  <img 
                    src="https://via.placeholder.com/1200x400/b08d57/ffffff?text=Hero+Slider" 
                    alt="Hero Slider" 
                    className="hero-slide-image"
                    crossOrigin="anonymous"
                  />
                  <div className="hero-slide-content">
                    <h1 className="hero-slide-title">Welcome to Our Store</h1>
                    <p className="hero-slide-subtitle">Discover amazing products and great deals</p>
                    <button className="hero-slide-btn">Shop Now</button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="z_poster_section">
            <div className="container">
              <div className="row w-100 mb-5">
                <div className="col-12 text-center">
                  <h6 className="z_poster_top_title">
                    {homePoster.topText?.title}
                  </h6>
                  <p className="z_poster_top_desc">
                    {homePoster.topText?.desc}
                  </p>
                </div>
              </div>

              <div className="row w-100 align-items-center mt-4 z_poster_main_bg">
                <div className="col-lg-6 col-md-6 col-12 p-0">
                  <div className="text-center" style={{ padding: '50px' }}>
                    <h2 className="z_poster_title">{homePoster.mainContent?.title}</h2>
                    <p className="z_poster_desc">
                      {homePoster.mainContent?.desc}
                    </p>
                    <button className="z_poster_btn">{homePoster.mainContent?.buttonText}</button>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 p-0">
                  <img
                    src={homePoster.mainContent?.image}
                    alt="Ethnic Wear"
                    className="z_poster_img"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="d_features-bg d_section-padding">
            <div className="container">
              <div className="row g-4">
                {homePoster.whyChooseUs?.map((item, index) => (
                  <div key={index} className="col-md-4 text-center">
                    <div className="d_icon-box">{item.icon}</div>
                    <h5 className="fw-bold mb-2">{item.title}</h5>
                    <p className="d_text-muted small mb-0">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="z_cards_section">
            <div className="container-fluid">
              <div className="row z_cards_wrapper">
                {homePoster.cards?.map((card, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-12">
                    <div className="z_cards_item">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="z_cards_img"
                      />
                      <div className="z_cards_content">
                        <h4 className="z_cards_title">{card.title}</h4>
                        <button className="z_cards_btn">{card.buttonText}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : mode === 'edit' ? (
        // Edit Mode - Form
        <div>
            

      {/* Hero Slider */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Hero Slider</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={addSlide}>
              <FiPlus /> Add Slide
            </button>
          )}
        </div>
        <div className="card-body">
          {slider.slides.map((slide, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.title}
                    onChange={(e) => handleSliderChange(index, 'title', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.subtitle}
                    onChange={(e) => handleSliderChange(index, 'subtitle', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Button Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.buttonText}
                    onChange={(e) => handleSliderChange(index, 'buttonText', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-2">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://example.com/banner-image.jpg"
                    value={slide.image}
                    onChange={(e) => handleSliderChange(index, 'image', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-1 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeSlide(index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Text */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Top Text</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.topText.title}
                onChange={(e) => handleInputChange('topText', 'title', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={homePoster.topText.desc}
                onChange={(e) => handleInputChange('topText', 'desc', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Main Content</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.title}
                onChange={(e) => handleInputChange('mainContent', 'title', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={homePoster.mainContent.desc}
                onChange={(e) => handleInputChange('mainContent', 'desc', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label>Button Text</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.buttonText}
                onChange={(e) => handleInputChange('mainContent', 'buttonText', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.image}
                onChange={(e) => handleInputChange('mainContent', 'image', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Why Choose Us</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => addItem('whyChooseUs')}>
              <FiPlus /> Add Item
            </button>
          )}
        </div>
        <div className="card-body">
          {homePoster.whyChooseUs.map((item, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-3">
                  <label>Icon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.icon}
                    onChange={(e) => handleInputChange('whyChooseUs', 'icon', e.target.value, index)}
                    disabled={mode === 'view'}
                    placeholder="e.g., Award"
                  />
                </div>
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.title}
                    onChange={(e) => handleInputChange('whyChooseUs', 'title', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-5">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.desc}
                    onChange={(e) => handleInputChange('whyChooseUs', 'desc', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-1 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem('whyChooseUs', index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Cards</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => addItem('cards')}>
              <FiPlus /> Add Card
            </button>
          )}
        </div>
        <div className="card-body">
          {homePoster.cards.map((card, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-4">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.image}
                    onChange={(e) => handleInputChange('cards', 'image', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.title}
                    onChange={(e) => handleInputChange('cards', 'title', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Button Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.buttonText}
                    onChange={(e) => handleInputChange('cards', 'buttonText', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem('cards', index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Slider */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Hero Slider</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={addSlide}>
              <FiPlus /> Add Slide
            </button>
          )}
        </div>
        <div className="card-body">
          {slider.slides.map((slide, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.title}
                    onChange={(e) => handleSliderChange(index, 'title', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.subtitle}
                    onChange={(e) => handleSliderChange(index, 'subtitle', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Button Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.buttonText}
                    onChange={(e) => handleSliderChange(index, 'buttonText', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-2">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slide.image}
                    onChange={(e) => handleSliderChange(index, 'image', e.target.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-1 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeSlide(index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    // Edit Mode - Form
    <>
      {/* Top Text */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Top Text</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.topText.title}
                onChange={(e) => handleInputChange('topText', 'title', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={homePoster.topText.desc}
                onChange={(e) => handleInputChange('topText', 'desc', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Main Content</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.title}
                onChange={(e) => handleInputChange('mainContent', 'title', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={homePoster.mainContent.desc}
                onChange={(e) => handleInputChange('mainContent', 'desc', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label>Button Text</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.buttonText}
                onChange={(e) => handleInputChange('mainContent', 'buttonText', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            <div className="col-md-6">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={homePoster.mainContent.image}
                onChange={(e) => handleInputChange('mainContent', 'image', e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Why Choose Us</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => addItem('whyChooseUs')}>
              <FiPlus /> Add Item
            </button>
          )}
        </div>
        <div className="card-body">
          {homePoster.whyChooseUs.map((item, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-3">
                  <label>Icon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.icon}
                    onChange={(e) => handleInputChange('whyChooseUs', 'icon', e.target.value, index)}
                    disabled={mode === 'view'}
                    placeholder="e.g., Award"
                  />
                </div>
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.title}
                    onChange={(e) => handleInputChange('whyChooseUs', 'title', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-5">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.desc}
                    onChange={(e) => handleInputChange('whyChooseUs', 'desc', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-1 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem('whyChooseUs', index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Cards</h5>
          {mode === 'edit' && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => addItem('cards')}>
              <FiPlus /> Add Card
            </button>
          )}
        </div>
        <div className="card-body">
          {homePoster.cards.map((card, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="row">
                <div className="col-md-4">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.image}
                    onChange={(e) => handleInputChange('cards', 'image', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.title}
                    onChange={(e) => handleInputChange('cards', 'title', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                <div className="col-md-3">
                  <label>Button Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={card.buttonText}
                    onChange={(e) => handleInputChange('cards', 'buttonText', e.target.value, index)}
                    disabled={mode === 'view'}
                  />
                </div>
                {mode === 'edit' && (
                  <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem('cards', index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
  </div>
);
}

export default Home;