import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "The Timeless Elegance of Silk Sarees: A Style Guide",
      date: "January 05, 2026",
      author: "Fashion Editor",
      image: "https://avatars.mds.yandex.net/i?id=03d602b005be64c5b381901734377756a8a78bb6-5332128-images-thumbs&n=13",
      excerpt: "Explore the rich heritage of Indian silk sarees. From Banarasi to Kanjeevaram, learn how to drape and style these masterpieces for weddings and formal events.",
    },
    {
      id: 2,
      title: "Lehenga Trends 2026: What's Hot This Wedding Season",
      date: "January 02, 2026",
      author: "Stylist Sarah",
      image: "https://i.pinimg.com/originals/52/aa/e2/52aae2fe91f070ec983e5d0eea95fb17.jpg",
      excerpt: "From pastel hues to heavy floral embroideries, discover the latest trends in bridal lehengas that are making waves this year.",
    },
    {
      id: 3,
      title: "Mastering the Art of Anarkali: Royal Looks for Everyone",
      date: "December 28, 2025",
      author: "Aditi Sharma",
      image: "https://i.ytimg.com/vi/tJWC-FdNTb4/maxresdefault.jpg",
      excerpt: "The Anarkali suit remains a symbol of grace. Find out which silhouette suits your body type and how to accessorize for a regal look.",
    },
    {
      id: 4,
      title: "Sustainable Fashion: The Rise of Hand-Woven Textiles",
      date: "December 20, 2025",
      author: "Eco Fashionista",
      image: "https://i.pinimg.com/736x/6e/b9/41/6eb94156fb7017328b5bb9a883ada203.jpg",
      excerpt: "Handloom fabrics like Patola and Ikat are stories of heritage. Learn why slow fashion matters.",
    },
    {
      id: 5,
      title: "Contemporary Ethnic: Blending Tradition with Modernity",
      date: "December 15, 2025",
      author: "Modern Muse",
      image: "https://i.pinimg.com/originals/0f/4d/93/0f4d933283bcff58eeda10537c9ebf98.jpg",
      excerpt: "Pair ethnic kurtis with denim or wear capes over sarees for a chic Indo-western look.",
    },
    {
      id: 6,
      title: "Navratri Special: Colorful Chaniya Cholis and Mirror Work",
      date: "December 10, 2025",
      author: "Ritika Goel",
      image: "https://i.pinimg.com/736x/41/8e/e3/418ee3eee3e58f6338993f0c1e9308f1.jpg",
      excerpt: "Celebrate Navratri with vibrant colors, mirror work, and traditional craftsmanship.",
    },
  ];

  return (
    <div className="d_blog-page-wrapper py-lg-5 py-3">
      <Container>
        <div className="text-center mb-lg-5 mb-3">
          <h1 className="d_blog-main-title">Fashion Journal</h1>
          <p className="d_blog-subtitle mx-auto">
            Stories, trends, and inspiration behind timeless Indian fashion.
          </p>
        </div>

        {/* SPACING ADDED HERE */}
        <Row className="gx-4 gy-5">
          {blogPosts.map((post) => (
            <Col key={post.id} lg={4} md={6}>
              <Card className="d_blog-card h-100 mx-1">
                <div className="d_blog-img-container">
                  <Card.Img src={post.image} alt={post.title} />
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="d_blog-card-title">
                    {post.title}
                  </Card.Title>

                  <div className="d_blog-meta">
                    <span><Calendar size={14} /> {post.date}</span>
                    <span><User size={14} /> {post.author}</span>
                  </div>

                  <Card.Text className="d_blog-card-excerpt">
                    {post.excerpt}
                  </Card.Text>

                  <Button
                    variant="link"
                    className="d_blog-read-more mt-auto"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read Article <ArrowRight size={16} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .d_blog-page-wrapper {
          background: #fafafa;
          font-family: 'Inter', sans-serif;
        }

        .d_blog-main-title {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .d_blog-subtitle {
          max-width: 620px;
          color: #666;
          font-size: 1rem;
        }

        .d_blog-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #eee;
          transition: all 0.35s ease;
          background: #fff;
        }

        .d_blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.08);
        }

        .d_blog-img-container {
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .d_blog-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .d_blog-card:hover img {
          transform: scale(1.08);
        }

        .d_blog-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }

        .d_blog-meta {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          color: #999;
          margin-bottom: 1rem;
        }

        .d_blog-meta svg {
          margin-right: 4px;
        }

        .d_blog-card-excerpt {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .d_blog-read-more {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          color: #000;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
        }

        .d_blog-read-more:hover {
          color: #c59d5f;
          text-decoration: none;
        }
        .btn:first-child:active,:not(.btn-check)+.btn:active{
         color:black;
         }
        @media (max-width: 768px) {
          .d_blog-main-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Blog;
