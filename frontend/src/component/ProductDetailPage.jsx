import React, { useState } from "react";
import { Container, Row, Col, Button, Accordion, Modal, Tabs, Tab, Table } from "react-bootstrap";
import { 
  FaHeart, FaShoppingBag, FaTruck, FaUndo, FaGlobe,
  FaRulerHorizontal, FaCheckCircle, FaChevronRight, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaClock, FaInfoCircle
} from "react-icons/fa";
import SimiliarPro from "./SimiliarPro";

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("40");
  const [activeImg, setActiveImg] = useState(0);

  // Size Guide modal state
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const handleCloseSizeGuide = () => setShowSizeGuide(false);
  const handleShowSizeGuide = () => setShowSizeGuide(true);

  const product = {
    name: "Off White Silk Palazzo Suit",
    subtitle: "Resham Embellished Festive Collection",
    sku: "AS3545707",
    price: 10800,
    originalPrice: 13500,
    discount: "20% OFF",
    images: [
      "https://i.pinimg.com/1200x/88/69/9d/88699d2875d327baaf58c43dba07c8e7.jpg",
      "https://i.pinimg.com/1200x/a3/98/80/a3988042bc2db166bffa94c4ff8edee1.jpg",
      "https://i.pinimg.com/1200x/cc/99/d9/cc99d9dd2b1eb9006a6d7007784c73b1.jpg",
    ],
    sizes: ["36", "38", "40", "42", "44"],
    description: "Experience elegance with this Off White Silk Palazzo Suit. The rich silk fabric is adorned with delicate Resham embroidery, offering a perfect blend of tradition and modernity for any celebratory occasion.",
    specifications: [
      { label: "Fabric", value: "Pure Silk" },
      { label: "Work", value: "Handcrafted Resham" },
      { label: "Occasion", value: "Festive, Wedding" },
      { label: "Set Includes", value: "Kurta, Palazzo & Dupatta" },
    ]
  };

  const sizeChart = [
    { size: "36", bust: 88, waist: 70, hip: 94, kurtaLength: 92, palazzoLength: 100 },
    { size: "38", bust: 92, waist: 74, hip: 98, kurtaLength: 93, palazzoLength: 101 },
    { size: "40", bust: 96, waist: 78, hip: 102, kurtaLength: 94, palazzoLength: 102 },
    { size: "42", bust: 100, waist: 82, hip: 106, kurtaLength: 95, palazzoLength: 103 },
    { size: "44", bust: 104, waist: 86, hip: 110, kurtaLength: 96, palazzoLength: 104 },
  ];

  return (
    <div className="g3-pdp-wrapper">
      <Container className="g3-main-content py-lg-5 py-3">
        {/* BREADCRUMB */}
        <nav className="g3-breadcrumb mb-lg-4 mb-3">
          Home <FaChevronRight size={7} /> Salwar Kameez <FaChevronRight size={7} /> <span>Palazzo Suits</span>
        </nav>

        <Row className="gx-lg-5 gy-4">
          {/* LEFT: IMAGE SECTION */}
          <Col lg={7} md={12} className="pe-lg-3">
            <div className="g3-sticky-image-container">
              <Row className="gx-3">
                <Col md={2} className="d-none d-md-block pe-2">
                  <div className="g3-thumb-stack">
                    {product.images.map((img, i) => (
                      <div 
                        key={i} 
                        className={`g3-thumb-wrapper ${activeImg === i ? 'active' : ''}`}
                        onMouseEnter={() => setActiveImg(i)}
                      >
                        <img src={img} alt={`view-${i}`} />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col md={10} xs={12}>
                  <div className="g3-main-viewport">
                    <img src={product.images[activeImg]} alt={product.name} className="g3-featured-img" />
                    <div className="g3-mobile-dots d-md-none">
                      {product.images.map((_, i) => (
                        <span key={i} className={`dot ${activeImg === i ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>

                  <div className="g3-mobile-thumbs d-flex d-md-none overflow-auto mt-3 gap-2 pb-2">
                    {product.images.map((img, i) => (
                      <img 
                        key={i} src={img} 
                        className={`g3-m-thumb ${activeImg === i ? 'active' : ''}`} 
                        onClick={() => setActiveImg(i)} alt="thumb"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* RIGHT: DETAILS SECTION */}
          <Col lg={5} md={12}>
            <div className="g3-details-sidebar">
              <header className="mb-4">
                <h1 className="g3-product-name">{product.name}</h1>
                <p className="g3-product-subtitle">{product.subtitle}</p>
                <div className="g3-price-container mt-3">
                  <span className="g3-price-now">₹{product.price.toLocaleString()}</span>
                  <span className="g3-price-was ms-3">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="g3-discount-pill ms-2">{product.discount}</span>
                </div>
              </header>

              <hr className="my-4" />

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold small tracking-wider">SELECT SIZE</span>
                  <button className="g3-link-btn small border-0 bg-transparent text-decoration-underline" onClick={handleShowSizeGuide}>
                    <FaRulerHorizontal className="me-1" /> SIZE CHART
                  </button>
                </div>
                <div className="g3-size-grid">
                  {product.sizes.map(size => (
                    <button key={size} className={`g3-size-pill ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
                  ))}
                </div>
              </div>

              <div className="g3-cta-row mb-4">
                <Button className="g3-btn-cart"><FaShoppingBag className="me-2" /> ADD TO BAG</Button>
                <Button variant="outline-dark" className="g3-btn-wish"><FaHeart /></Button>
              </div>

              <div className="g3-perks-box p-3 mb-4">
                <Row className="g-0 text-center align-items-center">
                  <Col>
                    <FaUndo className="mb-1 d-block mx-auto text-muted" />
                    <small className="d-block">Easy Returns</small>
                  </Col>
                  <Col className="border-start border-end">
                    <FaGlobe className="mb-1 d-block mx-auto text-muted" />
                    <small className="d-block">World Wide Shipping</small>
                  </Col>
                  <Col>
                    <FaCheckCircle className="mb-1 d-block mx-auto text-muted" />
                    <small className="d-block">Made in India</small>
                  </Col>
                </Row>
              </div>

              <div className="g3-shipping-info mb-4">
                <h6 className="fw-bold small mb-3">Shipping and Delivery Details</h6>
                <div className="d-flex align-items-start mb-2 small text-muted">
                  <FaClock className="me-2 mt-1 flex-shrink-0" />
                  <span>Additional 5 - 6 business days is required for delivery.</span>
                </div>
                <div className="d-flex align-items-start small text-muted">
                  <FaTruck className="me-2 mt-1 flex-shrink-0" />
                  <span>Plus Size Extra 5 - 10 business days is required for delivery.</span>
                </div>
              </div>

              <div className="g3-promo-banner p-4 text-center mb-4">
                <p className="mb-1 tracking-widest small">WANT TO <strong>SHOP</strong></p>
                <h4 className="fw-bold mb-2">PREMIUM STORE COLLECTION?</h4>
                <p className="mb-3 small">SHIP IN 48H</p>
                <Button variant="dark" className="rounded-0 px-4 py-2 small fw-bold">BOOK A LIVE VIDEO CALL</Button>
              </div>

              <div className="g3-support-section mb-4">
                <h6 className="fw-bold small mb-3">Customer Support</h6>
                <Row className="g-2">
                  <Col xs={4}>
                    <button className="g3-support-btn w-100"><FaWhatsapp className="text-success me-1" /> Chat</button>
                  </Col>
                  <Col xs={4}>
                    <button className="g3-support-btn w-100"><FaPhoneAlt className="text-muted me-1" /> Call us</button>
                  </Col>
                  <Col xs={4}>
                    <button className="g3-support-btn w-100"><FaEnvelope className="text-danger me-1" /> Mail Us</button>
                  </Col>
                </Row>
              </div>

              <Accordion flush className="g3-pdp-accordion border-top">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Product Description</Accordion.Header>
                  <Accordion.Body className="text-muted small lh-lg">
                    {product.description}
                    <div className="mt-3">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="d-flex justify-content-between border-bottom py-2">
                          <span className="text-muted">{spec.label}</span>
                          <span className="fw-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Return/ Exchange Policy</Accordion.Header>
                  <Accordion.Body className="small text-muted">
                    Our policy lasts 7 days. If 7 days have gone by since your delivery, unfortunately, we can’t offer you a refund or exchange.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Shipping</Accordion.Header>
                  <Accordion.Body className="small text-muted">
                    We ship worldwide. Standard delivery takes 5-7 business days.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>

      {/* SIZE GUIDE MODAL - DESIGN MODIFIED */}
      <Modal show={showSizeGuide} onHide={handleCloseSizeGuide} size="lg" centered className="g3-size-modal">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-4">Size Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Tabs defaultActiveKey="chart" id="size-guide-tabs" className="g3-custom-tabs mb-4">
            <Tab eventKey="chart" title="Size Chart">
              <div className="g3-alert-info d-flex align-items-center p-3 mb-4">
                <FaInfoCircle className="me-2" />
                <span>All measurements are in <strong>centimeters (cm)</strong>. Measure your body for the best fit.</span>
              </div>

              <div className="table-responsive g3-chart-container">
                <Table className="g3-refined-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Bust</th>
                      <th>Waist</th>
                      <th>Hip</th>
                      <th>Kurta</th>
                      <th>Palazzo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, idx) => (
                      <tr key={idx} className={selectedSize === row.size ? 'g3-row-selected' : ''}>
                        <td className="fw-bold">{row.size}</td>
                        <td>{row.bust}</td>
                        <td>{row.waist}</td>
                        <td>{row.hip}</td>
                        <td>{row.kurtaLength}</td>
                        <td>{row.palazzoLength}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="mt-4 p-3 bg-light rounded border-start border-dark border-4">
                <h6 className="fw-bold mb-1">Choosing the right size?</h6>
                <p className="small text-muted mb-0">If you fall between two sizes, we recommend going for the larger size for a relaxed festive fit.</p>
              </div>
            </Tab>

            <Tab eventKey="measurements" title="How to Measure">
              <p className="small text-muted mb-4">Follow these steps to ensure you select the perfect size for your body type.</p>

              <Row className="gx-3">
                <Col md={6} className="mb-3">
                  <div className="g3-measure-card p-3 h-100">
                    <div className="g3-measure-img-placeholder mb-3">
                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8z"/><path d="M12 2v16"/><path d="M4 10h16"/></svg>
                    </div>
                    <h6 className="fw-bold mb-1 text-uppercase small">Bust Measurement</h6>
                    <p className="text-muted small mb-0">Measure around the fullest part of your chest while keeping the tape horizontal.</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="g3-measure-card p-3 h-100">
                    <div className="g3-measure-img-placeholder mb-3">
                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M12 7v10"/></svg>
                    </div>
                    <h6 className="fw-bold mb-1 text-uppercase small">Waist Measurement</h6>
                    <p className="text-muted small mb-0">Measure at your natural waistline, typically the narrowest part of your torso.</p>
                  </div>
                </Col>
              </Row>

              <Table borderless size="sm" className="mt-3 g3-how-to-table">
                <thead>
                  <tr className="border-bottom">
                    <th className="pb-2">Part</th>
                    <th className="pb-2">Instruction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold py-2">Hips</td>
                    <td className="text-muted py-2">Measure around the fullest part of your hips/bottom.</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Length</td>
                    <td className="text-muted py-2">Measure from the high point of your shoulder to the hem.</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="dark" className="w-100 rounded-0 py-3 fw-bold" onClick={handleCloseSizeGuide}>GOT IT</Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@600&display=swap');

        .g3-pdp-wrapper { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #fff; }
        .g3-main-content { max-width: 1400px; margin: 0 auto; }

        .g3-sticky-image-container { position: sticky; top: 20px; }
        .g3-thumb-stack { display: flex; flex-direction: column; gap: 10px; }
        .g3-thumb-wrapper { aspect-ratio: 3/4; width: 100%; overflow: hidden; cursor: pointer; border: 1.5px solid transparent; transition: 0.2s ease; background: #f4f4f4; }
        .g3-thumb-wrapper img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
        .g3-thumb-wrapper.active { border-color: #000; }
        .g3-thumb-wrapper.active img { opacity: 1; }
        .g3-main-viewport { position: relative; aspect-ratio: 3/4.2; overflow: hidden; background: #f9f9f9; }
        .g3-featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
        .g3-main-viewport:hover .g3-featured-img { transform: scale(1.04); }

        .g3-breadcrumb { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #999; }
        .g3-breadcrumb span { color: #1a1a1a; font-weight: 700; }
        .g3-product-name { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 600; }
        .g3-price-now { font-size: 1.8rem; font-weight: 400; }
        .g3-price-was { text-decoration: line-through; color: #adb5bd; font-size: 1.2rem; }
        .g3-discount-pill { background: #fff1f1; color: #d9534f; padding: 4px 10px; font-size: 0.8rem; font-weight: 700; }

        .g3-size-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(55px, 1fr)); gap: 10px; }
        .g3-size-pill { height: 50px; border: 1px solid #ddd; background: #fff; font-weight: 600; transition: 0.2s; }
        .g3-size-pill.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .g3-cta-row { display: flex; gap: 12px; }
        .g3-btn-cart { flex: 1; height: 56px; background: #1a1a1a; border: none; border-radius: 0; font-weight: 700; }
        .g3-btn-wish { width: 56px; border-radius: 0; border-color: #ddd; }
        
        .g3-perks-box { background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; font-size: 10px; text-transform: uppercase; font-weight: 600; }
        .g3-promo-banner { background: #fde2b9; border-radius: 4px; border: 1px solid #f9d5a2; }
        .g3-support-btn { background: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 10px; font-size: 12px; font-weight: 600; }

        /* ACCORDION DESIGN IMPROVEMENTS */
        .g3-pdp-accordion { margin-top: 12px; }
        .g3-pdp-accordion .accordion-item { border: none; margin-bottom: 12px; }
        .g3-pdp-accordion .accordion-button {
          background: #fff;
          border: 1px solid #eef0f2;
          border-radius: 10px;
          padding: 14px 16px;
          box-shadow: 0 1px 2px rgba(20,20,20,0.03);
          color: #222;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .g3-pdp-accordion .accordion-button:focus {
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          outline: none;
        }
        /* When expanded */
        .g3-pdp-accordion .accordion-button:not(.collapsed) {
          background: linear-gradient(180deg,#ffffff,#fbfbfb);
          border-color: #e6e9eb;
          box-shadow: 0 6px 20px rgba(0,0,0,0.04);
        }
        /* rotate bootstrap chevron for clear state */
        .g3-pdp-accordion .accordion-button::after {
          transition: transform .25s ease;
          width: 16px;
          height: 16px;
        }
        .g3-pdp-accordion .accordion-button.collapsed::after {
          transform: rotate(0deg);
        }
        .g3-pdp-accordion .accordion-button:not(.collapsed)::after {
          transform: rotate(90deg);
        }
        .g3-pdp-accordion .accordion-body {
          background: #fff;
          border: 1px solid #f1f3f4;
          border-top: none;
          margin-top: 8px;
          padding: 16px;
          border-radius: 0 0 10px 10px;
          color: #616161;
          line-height: 1.6;
        }
        .g3-pdp-accordion .accordion-body .border-bottom.py-2 {
          border-color: #f1f2f3 !important;
        }

        .g3-pdp-accordion .accordion-button svg {
          flex-shrink: 0;
        }

        .g3-pdp-accordion .accordion-item:first-of-type .accordion-button {
          margin-top: 0;
        }

        .g3-pdp-accordion .accordion-button + .accordion-collapse {
          margin-top: 0;
        }

        .g3-pdp-accordion .accordion-body small,
        .g3-pdp-accordion .accordion-body p {
          font-size: 13px;
          color: #6b6b6b;
        }

        /* MODIFIED SIZE MODAL STYLES (existing) */
        .g3-custom-tabs .nav-link { border: none; color: #999; font-weight: 600; border-bottom: 2px solid transparent; padding: 10px 20px; }
        .g3-custom-tabs .nav-link.active { color: #000; border-bottom-color: #000; background: transparent; }
        .g3-alert-info { background: #f8f9fa; border-radius: 8px; font-size: 13px; }
        .g3-refined-table { margin-bottom: 0; }
        .g3-refined-table thead th { background: #fdfdfd; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; border-top: 0; padding: 15px; }
        .g3-refined-table tbody td { padding: 15px; font-size: 14px; vertical-align: middle; }
        .g3-row-selected { background-color: #000 !important; color: #fff; }
        .g3-measure-card { background: #f9f9f9; border-radius: 8px; transition: 0.3s; border: 1px solid #eee; }
        .g3-measure-img-placeholder { background: #fff; height: 100px; display: flex; align-items: center; justify-content: center; border-radius: 4px; border: 1px dashed #ddd; }
        .g3-how-to-table td { font-size: 13px; }

        @media (max-width: 767px) {
          .g3-main-viewport { aspect-ratio: 3/4; margin: 0 -15px; }
          .g3-cta-row { flex-direction: column; }
          .g3-btn-wish { width: 100%; height: 50px; }
          .g3-mobile-dots { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
          .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(0,0,0,0.2); }
          .dot.active { background: #000; width: 18px; border-radius: 4px; }
          .g3-m-thumb { aspect-ratio: 3/4; width: 80px; flex-shrink: 0; overflow: hidden; border: 1.5px solid transparent; background: #f4f4f4; }
          .g3-m-thumb.active { border-color: #000; }
        }
      `}</style>

      <Container className="g3-main-content pb-lg-3 pb-3">
        <SimiliarPro />
      </Container>
      </div>
  );
};

export default ProductDetailPage;