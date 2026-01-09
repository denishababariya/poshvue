import React, { useState, useEffect } from "react";
import { FiEdit2, FiEye, FiSave, FiPlus, FiTrash2, FiMapPin, FiPhone, FiMail, FiClock, FiHome, FiTarget, FiStar, FiHeart, FiGift, FiAward, FiTrendingUp, FiMessageCircle, FiCheckCircle, FiBriefcase, FiCompass } from "react-icons/fi";
import { FaCrown, FaPhone as FaPhoneIcon, FaEnvelope, FaClock as FaClockIcon, FaHome as FaHomeIcon, FaAward as FaAwardIcon, FaStar as FaStarIcon, FaHeart as FaHeartIcon, FaGift as FaGiftIcon, FaTrophy, FaChartLine, FaComment, FaCheckCircle as FaCheckCircleIcon, FaBriefcase as FaBriefcaseIcon, FaCompass as FaCompassIcon, FaMapMarkerAlt, FaHandshake, FaSmile, FaThumbsUp, FaLightbulb, FaRocket, FaFire, FaLeaf, FaWater } from "react-icons/fa";
import { Facebook, Instagram, Youtube , Send} from 'lucide-react';
import client from "../../api/client";

function ContactUs() {
    const [pageData, setPageData] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [savingPage, setSavingPage] = useState(false);
    const [pageMode, setPageMode] = useState('edit'); // 'edit' | 'preview'

    // Icon mapping for preview
    const iconMap = {
        // Lucide React Icons
        MapPin: <FiMapPin size={24} />,
        Phone: <FiPhone size={24} />,
        Mail: <FiMail size={24} />,
        Clock: <FiClock size={24} />,
        Home: <FiHome size={24} />,
        Target: <FiTarget size={24} />,
        Star: <FiStar size={24} />,
        Heart: <FiHeart size={24} />,
        Gift: <FiGift size={24} />,
        Award: <FiAward size={24} />,
        TrendingUp: <FiTrendingUp size={24} />,
        MessageCircle: <FiMessageCircle size={24} />,
        CheckCircle: <FiCheckCircle size={24} />,
        Briefcase: <FiBriefcase size={24} />,
        Compass: <FiCompass size={24} />,

        // FontAwesome Icons
        FaCrown: <FaCrown size={24} />,
        FaPhone: <FaPhoneIcon size={24} />,
        FaEnvelope: <FaEnvelope size={24} />,
        FaClock: <FaClockIcon size={24} />,
        FaHome: <FaHomeIcon size={24} />,
        FaAward: <FaAwardIcon size={24} />,
        FaStar: <FaStarIcon size={24} />,
        FaHeart: <FaHeartIcon size={24} />,
        FaGift: <FaGiftIcon size={24} />,
        FaTrophy: <FaTrophy size={24} />,
        FaChartLine: <FaChartLine size={24} />,
        FaComment: <FaComment size={24} />,
        FaCheckCircle: <FaCheckCircleIcon size={24} />,
        FaBriefcase: <FaBriefcaseIcon size={24} />,
        FaCompass: <FaCompassIcon size={24} />,
        FaMapMarkerAlt: <FaMapMarkerAlt size={24} />,
        FaHandshake: <FaHandshake size={24} />,
        FaSmile: <FaSmile size={24} />,
        FaThumbsUp: <FaThumbsUp size={24} />,
        FaLightbulb: <FaLightbulb size={24} />,
        FaRocket: <FaRocket size={24} />,
        FaFire: <FaFire size={24} />,
        FaLeaf: <FaLeaf size={24} />,
        FaWater: <FaWater size={24} />,
    };

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setPageLoading(true);
                const res = await client.get('/contact-page');
                setPageData(res.data || null);
            } catch (err) {
                setPageData(null);
            } finally {
                setPageLoading(false);
            }
        };
        fetchPage();
    }, []);

    const handlePageChange = (field, value) => {
        setPageData(prev => ({ ...(prev || {}), [field]: value }));
    };

    const handleCardChange = (index, field, value) => {
        const cards = (pageData?.infoCards || []).slice();
        cards[index] = { ...(cards[index] || {}), [field]: value };
        setPageData(prev => ({ ...(prev || {}), infoCards: cards }));
    };

    const addCard = () => {
        setPageData(prev => ({ ...(prev || {}), infoCards: [...(prev?.infoCards || []), { icon: '', title: '', text: '' }] }));
    };

    const removeCard = (index) => {
        const cards = (pageData?.infoCards || []).filter((_, i) => i !== index);
        setPageData(prev => ({ ...(prev || {}), infoCards: cards }));
    };

    const savePage = async () => {
        try {
            setSavingPage(true);
            await client.put('/contact-page', pageData || {});
            alert('Contact page saved');
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to save page');
        } finally {
            setSavingPage(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Contact Us Page</h1>
                <p style={{ color: "#7f8c8d" }}>Manage Contact Us page content</p>
            </div>

            <div className="x_card">
                <style>{`
                    .admin_edit_form { max-width: 1000px; margin: 0 auto; padding-bottom: 50px; }
                    .x_card_header { background: #f8f9fa; padding: 15px 25px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
                    .x_card_header h3 { margin: 0; font-size: 1.1rem; color: #4a0404; font-weight: 600; }
                    .grid_2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                    .x_form_group { margin-bottom: 20px; }
                    .x_form_group label { display: block; margin-bottom: 8px; font-weight: 500; color: #555; font-size: 0.9rem; }
                    .x_form_group input, .x_form_group textarea { width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: border-color 0.3s; }
                    .x_form_group input:focus, .x_form_group textarea:focus { outline: none; border-color: #b08d57; }
                    .btn_add { background: #fff; color: #b08d57; border: 1px dashed #b08d57; padding: 10px 20px; border-radius: 6px; width: 100%; cursor: pointer; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s; }
                    .btn_add:hover { background: #fdf8f3; }
                `}</style>
                <div className="x_card_header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Contact Page Content</h3>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button className={`x_btn ${pageMode === 'edit' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setPageMode('edit')}><FiEdit2 /> Edit</button>
                        <button className={`x_btn ${pageMode === 'preview' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setPageMode('preview')}><FiEye /> Preview</button>
                        <button className="x_btn x_btn-primary" onClick={savePage} disabled={savingPage}><FiSave /> {savingPage ? 'Saving...' : 'Save Page'}</button>
                    </div>
                </div>
                <div className="x_card-body">
                    {pageLoading ? <div>Loading page...</div> : (
                        pageMode === 'edit' ? (
                            <div className="admin_edit_form">
                                <div className="x_form_group">
                                    <label>Title</label>
                                    <input value={pageData?.title || ''} onChange={(e) => handlePageChange('title', e.target.value)} />
                                </div>
                                <div className="x_form_group">
                                    <label>Breadcrumb</label>
                                    <input value={pageData?.breadcrumb || ''} onChange={(e) => handlePageChange('breadcrumb', e.target.value)} />
                                </div>
                                <div className="x_form_group">
                                    <label>Banner Image URL</label>
                                    <input value={pageData?.bannerImage || ''} onChange={(e) => handlePageChange('bannerImage', e.target.value)} />
                                </div>
                                <div className="x_form_group">
                                    <label>Form Intro Text</label>
                                    <textarea rows={3} value={pageData?.formIntro || ''} onChange={(e) => handlePageChange('formIntro', e.target.value)} />
                                </div>
                                <div className="x_form_group">
                                    <label>Info Cards</label>
                                    {(pageData?.infoCards || []).map((card, idx) => (
                                        <div key={idx} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6, marginBottom: 8 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <strong>Card {idx + 1}</strong>
                                                <button type="button" className="x_btn x_btn-sm" onClick={() => removeCard(idx)}><FiTrash2 /></button>
                                            </div>
                                            <div className="x_form_group">
                                                <label>Icon Name (e.g., FaCrown, FaPhone, MapPin)</label>
                                                <input
                                                    type="text"
                                                    value={card.icon || ''}
                                                    onChange={(e) => handleCardChange(idx, 'icon', e.target.value)}
                                                    placeholder="Enter icon name"
                                                />
                                            </div>
                                            <div className="x_form_group"><label>Title</label><input value={card.title || ''} onChange={(e) => handleCardChange(idx, 'title', e.target.value)} /></div>
                                            <div className="x_form_group"><label>Text</label><input value={card.text || ''} onChange={(e) => handleCardChange(idx, 'text', e.target.value)} /></div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn_add" onClick={addCard}><FiPlus /> Add Card</button>
                                </div>
                                <div className="x_form_group">
                                    <label>Map Embed Src</label>
                                    <input value={pageData?.mapSrc || ''} onChange={(e) => handlePageChange('mapSrc', e.target.value)} />
                                </div>
                                <div className="x_form_group">
                                    <label>Facebook Link</label>
                                    <input value={pageData?.followLinks?.facebook || ''} onChange={(e) => handlePageChange('followLinks', { ...(pageData?.followLinks || {}), facebook: e.target.value })} />
                                </div>
                                <div className="x_form_group">
                                    <label>Instagram Link</label>
                                    <input value={pageData?.followLinks?.instagram || ''} onChange={(e) => handlePageChange('followLinks', { ...(pageData?.followLinks || {}), instagram: e.target.value })} />
                                </div>
                                <div className="x_form_group">
                                    <label>Youtube Link</label>
                                    <input value={pageData?.followLinks?.youtube || ''} onChange={(e) => handlePageChange('followLinks', { ...(pageData?.followLinks || {}), youtube: e.target.value })} />
                                </div>
                                <div className="grid_2">
                                    <div className="x_form_group"><label>Contact Phone</label><input value={pageData?.contactPhone || ''} onChange={(e) => handlePageChange('contactPhone', e.target.value)} /></div>
                                    <div className="x_form_group"><label>Contact Email</label><input value={pageData?.contactEmail || ''} onChange={(e) => handlePageChange('contactEmail', e.target.value)} /></div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ background: '#fff', overflow: 'auto' }}>
                                <style>{`
                                    .preview_d_contact-wrapper { color: #333; background-color: #fff; }
                                    .preview_d_contact-header { background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${pageData?.bannerImage || 'https://via.placeholder.com/1200x400'}'); background-size: cover; background-position: center; padding: 80px 0; text-align: center; color: #fff; }
                                    .preview_d_page-title { font-size: 36px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
                                    .preview_d_breadcrumb { font-size: 14px; color: #ddd; text-transform: uppercase; letter-spacing: 1px; }
                                    .preview_d_info-card { padding: 25px; background: #fff; border: 1px solid #eee; text-align: center; transition: 0.3s; height: 100%; }
                                    .preview_d_info-card:hover { border-color: #c5a059; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
                                    .preview_d_icon-circle { width: 50px; height: 50px; background: #fdf8f3; color: #c5a059; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin: 0 auto 15px auto; font-size: 22px; }
                                    .preview_d_form-card { background: #fff; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border-radius: 12px; }
                                    .preview_d_input-field { border: 1px solid #eee; background: #fcfcfc; padding: 12px; font-size: 14px; border-radius: 6px; width: 100%; margin-bottom: 15px; outline: none; }
                                    .preview_d_submit-btn { background: #333; color: #fff; border: none; padding: 12px 25px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; width: 100%; border-radius: 6px; cursor: pointer; }
                                    .preview_d_map-container { height: 350px; border-radius: 12px; overflow: hidden; border: 1px solid #eee; }
                                    .d_form-card {
          background: #fff;
          padding: clamp(20px, 5vw, 40px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border-radius: 12px;          
        }
          .d_input-field {
          border: 1px solid #eee;
          background: #fcfcfc;
          padding: 14px;
          font-size: 14px;
          border-radius: 6px;
          width: 100%;
          margin-bottom: 20px;
          outline: none;
          transition: 0.3s;
        }

        .d_input-field:focus {
          border-color: #c5a059;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.1);
        }

        .d_submit-btn {
          background: #333;
          color: #fff;
          border: none;
          padding: 14px 30px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          transition: 0.3s;
          width: 100%;
          border-radius: 6px;
        }

        .d_submit-btn:hover {
          background: #000;
          transform: translateY(-2px);
        }

        .d_map-container {
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .d_info-card { margin-bottom: 10px; }
          .d_map-container { height: 300px; }
          .d_contact-form-container { padding-top: 20px; }
        }
                                `}</style>

                                {/* Header Banner */}
                                <section className="preview_d_contact-header">
                                    <div className="container">
                                        <h1 className="preview_d_page-title">{pageData?.title || 'Connect With Us'}</h1>
                                        <div className="preview_d_breadcrumb">{pageData?.breadcrumb || 'Home | Contact Us'}</div>
                                    </div>
                                </section>

                                {/* Info Cards */}
                                <section className="container" style={{ marginTop: '-40px', marginBottom: '50px' }}>
                                    <div className="row g-3 justify-content-center">
                                        {(pageData?.infoCards || []).map((card, idx) => (
                                            <div key={idx} className="col-md-3 col-sm-6">
                                                <div className="preview_d_info-card shadow-sm">
                                                    <div className="preview_d_icon-circle">
                                                        {iconMap[card.icon] || <FiMapPin size={24} />}
                                                    </div>
                                                    <h6 style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '12px', marginBottom: '10px' }}>{card.title}</h6>
                                                    <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.5' }}>{card.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Form & Map Section */}
                                <section className="container" style={{ paddingBottom: '60px' }}>
                                    <div className="row g-5" >
                                        {/* Form */}
                                        <div className="col-lg-6">
                                            <div className="d_form-card">
                                                <div className="mb-4">
                                                    <h3 className="fw-bold mb-2">Get In Touch</h3>
                                                    <p className="text-muted small">Have questions about our bridal collection? We'd love to hear from you.</p>
                                                </div>
                                                <form >
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input
                                                                type="text" name="name" placeholder="Full Name"
                                                                className="d_input-field"
                                                            />                                                           
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input
                                                                type="email" name="email" placeholder="Email Address"
                                                                className="d_input-field"
                                                            />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text" name="subject" placeholder="Subject"
                                                        className="d_input-field"
                                                    />
                                                    <textarea
                                                        name="message" placeholder="Message"
                                                        className="d_input-field" rows="4"
                                                    ></textarea>

                                                    <button type="submit" className="d_submit-btn" >
                                                        Send Message<Send size={16} className="ms-2" />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                        {/* Map & Social */}
                                        <div className="col-lg-6" style={{display: "flex", alignItems: "center"}}>
                                            <div>
                                                <div className="preview_d_map-container shadow-sm">
                                                    {pageData?.mapSrc ? (
                                                        <div dangerouslySetInnerHTML={{ __html: pageData.mapSrc }} style={{ height: '100%' }} />
                                                    ) : (
                                                        <div style={{ height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                                            Map not configured
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                                                    <div>
                                                        <h6 style={{ fontWeight: 600, marginBottom: '10px', fontSize: '14px' }}>Follow Us</h6>
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            {pageData?.followLinks?.facebook && <a href={pageData.followLinks.facebook} style={{ color: '#4a0404', textDecoration: 'none' }}><Facebook size={18} className="cursor-pointer" /></a>}
                                                            {pageData?.followLinks?.instagram && <a href={pageData.followLinks.instagram} style={{ color: '#4a0404', textDecoration: 'none' }}><Instagram size={18} className="cursor-pointer" /></a>}
                                                            {pageData?.followLinks?.youtube && <a href={pageData.followLinks.youtube} style={{ color: '#4a0404', textDecoration: 'none' }}><Youtube size={18} className="cursor-pointer" /></a>}
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <p style={{ fontSize: '13px', color: '#999', margin: '0 0 5px 0' }}>Need urgent help?</p>
                                                        <h6 style={{ fontWeight: 600, fontSize: '14px', margin: 0 }}>{pageData?.contactPhone || '+91 81601 81706'}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
