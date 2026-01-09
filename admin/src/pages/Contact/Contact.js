import React, { useState, useEffect } from "react";
import { FiX, FiEye, FiEdit2, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import client from "../../api/client";

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);

    const [mode, setMode] = useState('list'); // 'list' | 'page'
    const [pageData, setPageData] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [savingPage, setSavingPage] = useState(false);
    const [pageMode, setPageMode] = useState('edit'); // 'edit' | 'preview'

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await client.get('/support/contacts', { params: { page: 1, limit: 50 } });
                setContacts(res.data.items || []);
            } catch (err) {
                const msg = err?.response?.data?.message || 'Failed to load contacts';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    useEffect(() => {
        if (mode !== 'page') return;
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
    }, [mode]);

    const handleView = (item) => {
        setViewingData(item);
        setShowViewModal(true);
    };

    const handleCloseView = () => {
        setViewingData(null);
        setShowViewModal(false);
    };

    const toggleStatus = async (item) => {
        try {
            const nextStatus = item.status === 'replied' ? 'new' : 'replied';
            const res = await client.put(`/support/contacts/${item._id}/status`, { status: nextStatus });
            const updated = res.data.item;
            setContacts((prev) => prev.map((c) => (c._id === item._id ? updated : c)));
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to update status');
        }
    };

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
            <div style={{ marginBottom: "20px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Contact</h1>
                    <p style={{ color: "#7f8c8d" }}>Manage contact form submissions and page content</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className={`x_btn ${mode === 'list' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setMode('list')}>Contact List</button>
                    <button className={`x_btn ${mode === 'page' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setMode('page')}>Contact Page</button>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Loading contacts...</div>}

            {/* View Modal */}
            <div className={`x_modal-overlay ${showViewModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>Contact Details</h2>
                        <button className="x_modal-close" onClick={handleCloseView}>
                            <FiX />
                        </button>
                    </div>
                    <div className="x_modal-body">
                        {viewingData ? (
                            <div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Name</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.name}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Email</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.email}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Subject</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.subject}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Message</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px", lineHeight: "1.6" }}>
                                        {viewingData.message}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="x_modal-footer">
                        <button type="button" className="x_btn x_btn-secondary" onClick={handleCloseView}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            {/* Conditional content: list or page editor */}
            {mode === 'list' ? (
                <div className="x_card">
                    <div className="x_card-body">
                        <div className="xn_table-wrapper">
                            <table className="x_table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Status</th>
                                        <th>Message</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td style={{ fontWeight: 600 }}>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                            <td>{contact.status}</td>
                                            <td style={{ maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.message}</td>
                                            <td>
                                                <div style={{ textAlign: "center" }}>                                                
                                                    <button className="x_btn x_btn-sm mx-2"
                                                        onClick={() => handleView(contact)}
                                                        style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}>
                                                        <FiEye />
                                                    </button>
                                                    <button
                                                        className="x_btn x_btn-primary py-1"
                                                        style={{fontSize:"14px"}}
                                                        title={contact.status === 'replied' ? 'Mark New' : 'Mark Replied'}
                                                        onClick={() => toggleStatus(contact)}
                                                    >
                                                        {contact.status === 'replied' ? 'Mark New' : 'Mark Replied'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
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
                        .d_preview_hero { background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://via.placeholder.com/1200x400'); background-size: cover; background-position: center; padding: 80px 0; text-align: center; color: #fff; }
                        .d_preview_hero h1 { font-size: 36px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
                        .d_preview_hero p { font-size: 14px; color: #ddd; }
                        .d_preview_info_card { padding: 25px; background: #fff; border: 1px solid #eee; text-align: center; }
                        .d_preview_icon { width: 50px; height: 50px; background: #fdf8f3; color: #c5a059; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin: 0 auto 15px; }
                        .d_preview_map { height: 300px; border-radius: 8px; overflow: hidden; margin: 20px 0; }
                    `}</style>
                    <div className="x_card_header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <h3 style={{margin:0}}>Contact Page Content</h3>
                        <div style={{display:'flex', gap:8, alignItems:'center'}}>
                            <button className={`x_btn ${pageMode === 'edit' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setPageMode('edit')}><FiEdit2 /> Edit</button>
                            <button className={`x_btn ${pageMode === 'preview' ? 'x_btn-primary' : 'x_btn-secondary'}`} onClick={() => setPageMode('preview')}><FiEye /> Preview</button>
                            <button className="x_btn x_btn-secondary" onClick={() => { setPageData(null); setMode('list'); }}>Back</button>
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
                                        <div key={idx} style={{border:'1px solid #eee', padding:12, borderRadius:6, marginBottom:8}}>
                                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <strong>Card {idx+1}</strong>
                                                <button type="button" className="x_btn x_btn-sm" onClick={() => removeCard(idx)}><FiTrash2 /></button>
                                            </div>
                                            <div className="x_form_group">
                                                <label>Icon (Select Emoji)</label>
                                                <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'8px', marginBottom:'12px', padding:'12px', background:'#fafafa', borderRadius:'6px'}}>
                                                    {['📍', '📞', '📧', '⏰', '🏪', '📍', '🎯', '✨', '❤️', '🌟', '🎁', '💝', '👑', '💎', '🌹', '🎀'].map((emoji) => (
                                                        <button
                                                            key={emoji}
                                                            type="button"
                                                            onClick={() => handleCardChange(idx, 'icon', emoji)}
                                                            style={{
                                                                padding: '10px',
                                                                fontSize: '24px',
                                                                background: card.icon === emoji ? '#b08d57' : '#fff',
                                                                border: card.icon === emoji ? '2px solid #b08d57' : '1px solid #ddd',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer',
                                                                transition: '0.2s'
                                                            }}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div style={{padding:'8px 12px', background:'#f0f0f0', borderRadius:'6px', fontSize:'24px', textAlign:'center', minHeight:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                    Selected: {card.icon || '---'}
                                                </div>
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
                                <div style={{background:'#fff', overflow:'auto'}}>
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
                                    `}</style>
                                    
                                    {/* Header Banner */}
                                    <section className="preview_d_contact-header">
                                        <div className="container">
                                            <h1 className="preview_d_page-title">{pageData?.title || 'Connect With Us'}</h1>
                                            <div className="preview_d_breadcrumb">{pageData?.breadcrumb || 'Home | Contact Us'}</div>
                                        </div>
                                    </section>

                                    {/* Info Cards */}
                                    <section className="container" style={{marginTop:'-40px', marginBottom:'50px'}}>
                                        <div className="row g-3 justify-content-center">
                                            {(pageData?.infoCards || []).map((card, idx) => (
                                                <div key={idx} className="col-md-3 col-sm-6">
                                                    <div className="preview_d_info-card shadow-sm">
                                                        <div className="preview_d_icon-circle">{card.icon || '📍'}</div>
                                                        <h6 style={{fontWeight:600, textTransform:'uppercase', fontSize:'12px', marginBottom:'10px'}}>{card.title}</h6>
                                                        <p style={{fontSize:'13px', color:'#666', margin:0, lineHeight:'1.5'}}>{card.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Form & Map Section */}
                                    <section className="container" style={{paddingBottom:'60px'}}>
                                        <div className="row g-5" style={{alignItems:'flex-start'}}>
                                            {/* Form */}
                                            <div className="col-lg-6">
                                                <div className="preview_d_form-card">
                                                    <div style={{marginBottom:'25px'}}>
                                                        <h3 style={{fontWeight:600, marginBottom:'8px', fontSize:'20px'}}>Get In Touch</h3>
                                                        <p style={{color:'#666', fontSize:'14px', margin:0}}>Have questions about our bridal collection? We'd love to hear from you.</p>
                                                    </div>
                                                    <div style={{marginBottom:'20px'}}>
                                                        <label style={{fontSize:'13px', fontWeight:'500', color:'#555', display:'block', marginBottom:'8px'}}>Full Name</label>
                                                        <input className="preview_d_input-field" placeholder="Full Name" disabled style={{background:'#f5f5f5', color:'#999'}} />
                                                    </div>
                                                    <div style={{marginBottom:'20px'}}>
                                                        <label style={{fontSize:'13px', fontWeight:'500', color:'#555', display:'block', marginBottom:'8px'}}>Email Address</label>
                                                        <input className="preview_d_input-field" placeholder="Email Address" disabled style={{background:'#f5f5f5', color:'#999'}} />
                                                    </div>
                                                    <div style={{marginBottom:'20px'}}>
                                                        <label style={{fontSize:'13px', fontWeight:'500', color:'#555', display:'block', marginBottom:'8px'}}>Subject</label>
                                                        <input className="preview_d_input-field" placeholder="Subject" disabled style={{background:'#f5f5f5', color:'#999'}} />
                                                    </div>
                                                    <div style={{marginBottom:'20px'}}>
                                                        <label style={{fontSize:'13px', fontWeight:'500', color:'#555', display:'block', marginBottom:'8px'}}>Message</label>
                                                        <textarea className="preview_d_input-field" placeholder="Message" rows="4" disabled style={{background:'#f5f5f5', color:'#999', resize:'none'}} />
                                                    </div>
                                                    <button className="preview_d_submit-btn" disabled style={{opacity:'0.7', cursor:'not-allowed'}}>Send Message</button>
                                                </div>
                                            </div>

                                            {/* Map & Social */}
                                            <div className="col-lg-6">
                                                <div>
                                                    <div className="preview_d_map-container shadow-sm">
                                                        {pageData?.mapSrc ? (
                                                            <div dangerouslySetInnerHTML={{ __html: pageData.mapSrc }} style={{height:'100%'}} />
                                                        ) : (
                                                            <div style={{height:'100%', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', color:'#999'}}>
                                                                Map not configured
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div style={{marginTop:'25px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'15px'}}>
                                                        <div>
                                                            <h6 style={{fontWeight:600, marginBottom:'10px', fontSize:'14px'}}>Follow Us</h6>
                                                            <div style={{display:'flex', gap:'10px'}}>
                                                                {pageData?.followLinks?.facebook && <a href={pageData.followLinks.facebook} style={{color:'#4a0404', textDecoration:'none'}}>f</a>}
                                                                {pageData?.followLinks?.instagram && <a href={pageData.followLinks.instagram} style={{color:'#4a0404', textDecoration:'none'}}>📷</a>}
                                                                {pageData?.followLinks?.youtube && <a href={pageData.followLinks.youtube} style={{color:'#4a0404', textDecoration:'none'}}>▶</a>}
                                                            </div>
                                                        </div>
                                                        <div style={{textAlign:'right'}}>
                                                            <p style={{fontSize:'13px', color:'#999', margin:'0 0 5px 0'}}>Need urgent help?</p>
                                                            <h6 style={{fontWeight:600, fontSize:'14px', margin:0}}>{pageData?.contactPhone || '+91 81601 81706'}</h6>
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
            )}
        </div>
    );
}

export default Contact;
