import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wishEmptyImg from "../img/image.png";

function Wishlist(props) {
  const navigate = useNavigate();
  const wishlistItems = []; // empty state

  return (
    <>
      <section className="z_wish_section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              {wishlistItems.length === 0 && (
                <div className="z_wish_empty_wrap text-center">
                  
                  <div className="z_wish_heart_circle">
                    <img src={wishEmptyImg} alt="" style={{height: '60px', width: '60px', objectFit: 'cover'}}/>
                  </div>

                  <h4 className="z_wish_heading">
                    Your Wishlist is Empty
                  </h4>

                  <p className="z_wish_text">
                    Save your favourite items by tapping the heart icon.
                    Start exploring and build your dream collection
                  </p>

                  <Button
                    className="z_wish_btn"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </Button>

                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Wishlist;
