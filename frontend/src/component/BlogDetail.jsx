import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ArrowLeft,
  Share2,
  Facebook,
  Instagram,
  ShoppingBag,
  Quote,
  Bookmark,
  Heart,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

/* ===== BLOG DATA SAME AS YOUR CODE ===== */
const blogPosts = [
  {
    id: 1,
    title: "The Timeless Elegance of Silk Sarees: A Style Guide",
    date: "January 05, 2026",
    author: "Fashion Editor",
    category: "Heritage",
    image: "https://avatars.mds.yandex.net/i?id=03d602b005be64c5b381901734377756a8a78bb6-5332128-images-thumbs&n=13",
    introduction: "Silk sarees are the pride of Indian heritage. From the intricate zari of Banarasi to the vibrant temple borders of Kanjeevaram, each weave tells a story of culture and craftsmanship. Styling a silk saree requires a balance between traditional roots and modern aesthetics.",
    quote: "A saree is not just a garment; it’s a power suit made of six yards of elegance.",
    sections: [
      {
        heading: "1. Choosing the Right Silk",
        body: "The journey of styling starts with picking the right fabric. For grand weddings, heavy mulberry silk or Banarasi silk with gold zari provides a majestic look. For evening galas, lightweight Tussar or Raw Silk offers a sophisticated charm."
      },
      {
        heading: "2. The Modern Twist",
        body: "For a contemporary wedding look, pair your heritage saree with a contrast-colored corset-style blouse or a heavy embroidered jacket. This blend of structured western silhouettes with fluid Indian drapes is the highlight of 2026 fashion."
      }
    ],
    tips: [
      "Always pin your pleats from the inside for a cleaner look.",
      "Pair heavy sarees with minimal jewelry to avoid a cluttered appearance.",
      "Use a 'Seedha Pallu' drape for a traditional look."
    ]
  },
  {
    id: 2,
    title: "Lehenga Trends 2026: What's Hot This Wedding Season",
    date: "January 02, 2026",
    author: "Stylist Sarah",
    category: "Trends",
    image: "https://i.pinimg.com/originals/52/aa/e2/52aae2fe91f070ec983e5d0eea95fb17.jpg",
    introduction: "Wedding fashion in 2026 is shifting towards 'Quiet Luxury'. Pastel lehengas in shades of dusty rose, sage green, and lavender are dominating the bridal mood boards.",
    quote: "Fashion is about comfort and confidence, especially on your big day.",
    sections: [
      {
        heading: "The Rise of Lightweight Fabrics",
        body: "The trend is moving away from heavy 15kg lehengas toward breathable silhouettes like organza and tissue silk. This allows brides to enjoy their day without being weighed down by fabric."
      },
      {
        heading: "Minimalist Embroidery",
        body: "Instead of full-body zari work, designers are opting for scattered 3D floral motifs and feathered hemlines, giving a whimsical and modern vibe to the traditional silhouette."
      }
    ],
    tips: [
      "Opt for detachable trails for a dramatic entry.",
      "Mix and match traditional embroidery with modern pastel palettes.",
      "Choose a double dupatta style for a more regal look."
    ]
  },
  {
    id: 3,
    title: "Mastering the Art of Anarkali: Royal Looks for Everyone",
    date: "December 28, 2025",
    author: "Aditi Sharma",
    category: "Styling",
    image: "https://i.ytimg.com/vi/tJWC-FdNTb4/maxresdefault.jpg",
    introduction: "The Anarkali silhouette has been a symbol of regal grace since the Mughal era. Its floor-length flare and fitted bodice make it a universally flattering choice for women of all body types.",
    quote: "Anarkalis are the perfect blend of historical grandeur and modern comfort.",
    sections: [
      {
        heading: "Finding Your Perfect Length",
        body: "While floor-length Anarkalis are perfect for weddings, midi-length versions are gaining popularity for pre-wedding functions like Mehendi. Ensure the flare starts just above your waist to create an elongated silhouette."
      },
      {
        heading: "Fabric Matters",
        body: "Choose velvet Anarkalis for winter events to stay warm and look royal, or opt for Chanderi silk for summer festivities to keep the look light and airy."
      }
    ],
    tips: [
      "Wear high heels to let the flare fall beautifully.",
      "Heavy Chandbalis are the only accessory you need with a high-neck Anarkali.",
      "Keep your hair in a sleek bun to showcase the neckline."
    ]
  },
  {
    id: 4,
    title: "Sustainable Fashion: The Rise of Hand-Woven Textiles",
    date: "December 20, 2025",
    author: "Eco Fashionista",
    category: "Sustainability",
    image: "https://i.pinimg.com/736x/6e/b9/41/6eb94156fb7017328b5bb9a883ada203.jpg",
    introduction: "As the world moves toward conscious consumption, hand-woven Indian textiles like Patola, Jamdani, and Khadi are gaining global recognition for their ethical production and durability.",
    quote: "Wear clothes that tell a story of heritage, not a story of waste.",
    sections: [
      {
        heading: "The Beauty of Imperfection",
        body: "Unlike machine-made fabrics, handloom textiles have slight variations in weave that give them character. These pieces are breathable, skin-friendly, and improve with every wash."
      },
      {
        heading: "Investing in Heirlooms",
        body: "A hand-woven Saree or Dupatta is an investment. These pieces do not lose their value or style, making them perfect heirlooms to pass down through generations."
      }
    ],
    tips: [
      "Look for the Handloom Mark to ensure authenticity.",
      "Dry clean your handloom silks to preserve the natural dyes.",
      "Pair a handloom dupatta with a simple solid suit to let the craft shine."
    ]
  },
  {
    id: 5,
    title: "Contemporary Ethnic: Blending Tradition with Modernity",
    date: "December 15, 2025",
    author: "Modern Muse",
    category: "Indo-Western",
    image: "https://i.pinimg.com/originals/0f/4d/93/0f4d933283bcff58eeda10537c9ebf98.jpg",
    introduction: "Indo-western fusion is for the modern woman who loves her roots but enjoys contemporary comfort. It’s about breaking boundaries and creating a unique style statement.",
    quote: "Style is a way to say who you are without having to speak.",
    sections: [
      {
        heading: "The Belted Saree Trend",
        body: "Adding a leather or embroidered belt to your saree not only secures the pallu but also defines your waistline, giving a structured and chic look to the fluid drape."
      },
      {
        heading: "Ethnic Capes and Jackets",
        body: "Swap your traditional dupatta for a long sheer cape or a silk trench coat. This adds a layer of sophistication and is perfect for cooler evening events."
      }
    ],
    tips: [
      "Balance the look: if the top is heavy, keep the bottom simple.",
      "Experiment with Dhoti pants for a fun, youthful vibe.",
      "Oxidized silver jewelry works best with fusion outfits."
    ]
  },
  {
    id: 6,
    title: "Navratri Special: Colorful Chaniya Cholis and Mirror Work",
    date: "December 10, 2025",
    author: "Ritika Goel",
    category: "Festive",
    image: "https://i.pinimg.com/736x/41/8e/e3/418ee3eee3e58f6338993f0c1e9308f1.jpg",
    introduction: "Navratri is the ultimate celebration of colors and rhythm. The classic Chaniya Choli, adorned with 'Abhala' (mirror) work, remains the heartbeat of the festival.",
    quote: "Let your outfit dance with you under the festive lights.",
    sections: [
      {
        heading: "The Power of Mirror Work",
        body: "Traditional Kutchi embroidery mixed with mirrors creates a sparkling effect during Garba. This year, we see mirrors paired with neon threads for a vibrant pop."
      },
      {
        heading: "Comfort for Dance",
        body: "Choose cotton-based fabrics for your Chaniya Choli. They are breathable and allow you to move freely during long hours of dance and celebration."
      }
    ],
    tips: [
      "Use heavy safety pins to secure your dupatta for the dance floor.",
      "Stacked oxidized bangles are a must for the festive look.",
      "Go for a backless choli with colorful latkans (tassels)."
    ]
  }
];

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((b) => b.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const relatedPosts = blogPosts.filter((b) => b.id !== Number(id)).slice(0, 3);

  if (!post) {
    return (
      <Container className="py-5 text-center min-vh-100 d-flex flex-column justify-content-center">
        <h2 className="fw-bold mb-3">વાર્તા હજુ લખાઈ રહી છે...</h2>
        <Button variant="outline-dark" onClick={() => navigate("/blog")}>
          પરત જાઓ
        </Button>
      </Container>
    );
  }

  return (
    <div className="modern-blog-wrapper">
      {/* HERO */}
      <section className="blog-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9} className="text-center">
              <Button
                variant="link"
                className="back-btn"
                onClick={() => navigate("/blog")}
              >
                <ArrowLeft size={18} /> Back
              </Button>

              <div className="category-tag">{post.category}</div>
              <h1 className="main-title">{post.title}</h1>

              <div className="author-meta">
                <img
                  src={`https://ui-avatars.com/api/?name=${post.author}`}
                  alt="author"
                />
                <span>{post.author}</span>
                <span className="dot" />
                <span>{post.date}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* IMAGE + CONTENT */}
      <Container className="content-wrapper">
        <Row className="justify-content-center">
          {/* SOCIAL */}
          <Col lg={1} className="d-none d-lg-block">
            <div className="sticky-social">
              <Heart size={18} />
              <Bookmark size={18} />
              <hr />
              <Facebook size={18} />
              <Instagram size={18} />
              <Share2 size={18} />
            </div>
          </Col>

          {/* MAIN CONTENT */}
          <Col lg={8}>
            {/* IMAGE */}
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>

            {/* ARTICLE */}
            <article className="blog-content">
              <p className="intro-text">{post.introduction}</p>

              {post.sections.map((sec, i) => (
                <div key={i} className="content-block">
                  <h3>{sec.heading}</h3>
                  <p>{sec.body}</p>
                </div>
              ))}

              {post.quote && (
                <blockquote className="blog-quote">
                  <Quote size={36} />
                  <p>{post.quote}</p>
                </blockquote>
              )}

              {post.tips && (
                <div className="tips-box">
                  <h5>✨ Pro Style Guide</h5>
                  <ul>
                    {post.tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* CTA */}
            <div className="cta-box">
              <h4>The {post.category} Edit</h4>
              <p>તમારા મનપસંદ લુક માટે અત્યારે જ શોપિંગ કરો.</p>
              <Button className="cta-btn">
                Shop Collection <ShoppingBag size={16} />
              </Button>
            </div>

            {/* RELATED */}
            <div className="related">
              <h4>You Might Also Love</h4>
              <Row>
                {relatedPosts.map((rp) => (
                  <Col md={4} key={rp.id}>
                    <div
                      className="mini-card"
                      onClick={() => navigate(`/blog/${rp.id}`)}
                    >
                      <img src={rp.image} alt={rp.title} />
                      <span>{rp.category}</span>
                      <h6>{rp.title}</h6>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ===== STYLES ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500&display=swap');

        .modern-blog-wrapper {
          font-family: 'Inter', sans-serif;
          background: #fff;
        }

        /* HERO */
        .blog-hero {
          padding: 50px 0 30px;
          background: #f9f7f5;
        }
        .back-btn { color:#777; padding:0; }
        .category-tag {
          color:#c59d5f;
          letter-spacing:2px;
          font-size:0.75rem;
          margin-bottom:10px;
        }
        .main-title {
          font-family:'Playfair Display',serif;
          font-size:3rem;
          margin-bottom:10px;
        }
        .author-meta {
          display:flex;
          gap:10px;
          justify-content:center;
          align-items:center;
          font-size:0.9rem;
          color:#666;
        }
        .author-meta img {
          width:32px;
          height:32px;
          border-radius:50%;
        }
        .dot { width:4px;height:4px;background:#ccc;border-radius:50%; }

        /* CONTENT */
        .content-wrapper { padding:40px 0; }
        .blog-image img {
          width:100%;
          border-radius:16px;
          margin-bottom:30px;
        }

        .blog-content {
          font-size:1.1rem;
          line-height:1.7;
        }
        .intro-text {
          font-size:1.3rem;
          border-left:3px solid #c59d5f;
          padding-left:16px;
          margin-bottom:30px;
        }
        .content-block {
          margin-bottom:28px;
        }
        .content-block h3 {
          font-family:'Playfair Display',serif;
          margin-bottom:10px;
        }

        /* QUOTE */
        .blog-quote {
          background:#fdfaf5;
          padding:30px;
          margin:40px 0;
          text-align:center;
          border-radius:20px;
        }
        .blog-quote p {
          font-family:'Playfair Display',serif;
          font-size:1.6rem;
          margin-top:15px;
        }

        /* TIPS */
        .tips-box {
          background:#111;
          color:#fff;
          padding:30px;
          border-radius:20px;
          margin:40px 0;
        }
        .tips-box h5 { color:#c59d5f; }
        .tips-box ul { padding-left:0; list-style:none; }
        .tips-box li { padding:8px 0; }

        /* CTA */
        .cta-box {
          background:linear-gradient(135deg,#c59d5f,#a47e42);
          padding:35px;
          border-radius:20px;
          text-align:center;
          color:#fff;
          margin-top:50px;
        }
        .cta-btn {
          background:#fff;
          color:#000;
          border:none;
          padding:12px 30px;
          border-radius:30px;
          margin-top:10px;
        }

        /* RELATED */
        .related {
          margin-top:70px;
        }
        .mini-card {
          cursor:pointer;
        }
        .mini-card img {
          width:100%;
          height:200px;
          object-fit:cover;
          border-radius:14px;
          margin-bottom:8px;
        }
        .mini-card span {
          font-size:0.75rem;
          color:#c59d5f;
        }
        .mini-card h6 {
          font-family:'Playfair Display',serif;
        }

        /* SOCIAL */
        .sticky-social {
          position:sticky;
          top:120px;
          display:flex;
          flex-direction:column;
          gap:18px;
          color:#bbb;
        }

        @media(max-width:768px){
          .main-title{font-size:2.2rem;}
          .intro-text{font-size:1.15rem;}
        }
      `}</style>
    </div>
  );
}

export default BlogDetail;
