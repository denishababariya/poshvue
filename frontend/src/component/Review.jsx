import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { Star, Camera, X } from "lucide-react";

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const purchasedItems = [
    {
      id: "WD-101",
      name: "Red Bridal Lehenga",
      image:
        "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f05?q=80&w=50&h=50&fit=crop",
    },
    {
      id: "WD-202",
      name: "Floral Net Saree",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=50&h=50&fit=crop",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(purchasedItems[0]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="d_review_page">
      <Container>
        <div className="text-center mb-4">
          <h2 className="d_title">Your Purchases</h2>
          <p className="text-muted small">
            Rate & share your experience with photos
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={7}>
            {purchasedItems.map((item) => (
              <Card key={item.id} className="d_review-card">
                <div className="d-flex align-items-center gap-3">
                  <img src={item.image} alt={item.name} />
                  <div className="flex-grow-1">
                    <h6>{item.name}</h6>
                    <small>ID: {item.id}</small>
                  </div>
                  <Button
                    size="sm"
                    className="d_review-btn"
                    onClick={() => {
                      setSelectedProduct(item);
                      setSelectedImages([]);
                      setUserRating(0);
                      setShowModal(true);
                    }}
                  >
                    Write Review
                  </Button>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      {/* MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="border-0 pb-1">
          <Modal.Title className="fw-bold fs-6">
            Review {selectedProduct.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0">
          <Form>
            {/* RATING */}
            <div className="d_rating-box">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={26}
                  onClick={() => setUserRating(star)}
                  fill={star <= userRating ? "#c59d5f" : "none"}
                  stroke={star <= userRating ? "#c59d5f" : "#ccc"}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">
                Your Review
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Fitting, fabric quality, comfort..."
              />
            </Form.Group>

            {/* IMAGE UPLOAD */}
            <div className="d_upload-grid mb-4">
              {selectedImages.map((img, i) => (
                <div key={i} className="d_img-box">
                  <img src={img} alt="preview" />
                  <span onClick={() => removeImage(i)}>
                    <X size={12} />
                  </span>
                </div>
              ))}

              <label className="d_img-upload">
                <Camera size={22} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <Button
              className="d_submit-review w-100"
              onClick={() => setShowModal(false)}
            >
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* STYLES */}
      <style>{`
        .d_review_page {
          background:#fafafa;
          padding:50px 0;
        }
        .d_title {
          font-weight:700;
        }

        /* PRODUCT CARD */
        .d_review-card {
          border:0;
          padding:14px 16px;
          margin-bottom:12px;
          border-radius:14px;
          box-shadow:0 6px 20px rgba(0,0,0,0.04);
        }
        .d_review-card img {
          width:56px;
          height:56px;
          border-radius:10px;
          object-fit:cover;
        }
        .d_review-card h6 {
          margin:0;
          font-weight:600;
        }
        .d_review-card small {
          color:#777;
        }
        .d_review-btn {
          background:#0a2845;
          border:none;
          border-radius:20px;
          padding:6px 14px;
        }
        .d_review-btn:hover {
          background:#c59d5f;
        }

        /* RATING */
        .d_rating-box {
          display:flex;
          justify-content:center;
          gap:10px;
          padding:16px;
          background:#f6f6f6;
          border-radius:14px;
          margin-bottom:18px;
        }

        /* UPLOAD */
        .d_upload-grid {
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }
        .d_img-box {
          position:relative;
        }
        .d_img-box img {
          width:72px;
          height:72px;
          border-radius:10px;
          object-fit:cover;
        }
        .d_img-box span {
          position:absolute;
          top:-6px;
          right:-6px;
          background:#0a2845;
          color:#fff;
          border-radius:50%;
          width:18px;
          height:18px;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
        }
        .d_img-upload {
          width:72px;
          height:72px;
          border:2px dashed #ccc;
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          color:#777;
        }
        .d_img-upload:hover {
          border-color:#c59d5f;
          color:#c59d5f;
        }

        /* SUBMIT */
        .d_submit-review {
          background:#0a2845;
          border:none;
          padding:12px;
          border-radius:10px;
          font-weight:600;
        }
        .d_submit-review:hover {
          background:#c59d5f;
        }

        @media(max-width:576px){
          .d_review-card { padding:12px; }
          .d_img-box img,
          .d_img-upload {
            width:64px;
            height:64px;
          }
        }
          /* Buttons */
button:focus,
button:active,
.btn:focus,
.btn:active,
.btn-primary:focus,
.btn-primary:active {
  outline: none !important;
  box-shadow: none !important;
}

/* Custom review button */
.d_review-btn:focus,
.d_review-btn:active,
.d_submit-review:focus,
.d_submit-review:active {
  outline: none !important;
  box-shadow: none !important;
}

/* Modal close (X) button */
.btn-close:focus,
.btn-close:active {
  outline: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}
  :not(.btn-check)+.btn:active{
         background-color: #9c7d4fff !important;
  }

/* Remove blue highlight on click (mobile tap) */
button {
  -webkit-tap-highlight-color: transparent;
}
      `}</style>
    </section>
  );
};

export default Review;
