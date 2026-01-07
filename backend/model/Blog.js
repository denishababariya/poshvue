const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema(
  {
    heading: { type: String },
    body: { type: String },
  },
  { _id: false }
);
                       
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    author: { type: String },
    excerpt: { type: String },
    category: { type: String },
    introduction: { type: String },
    quote: { type: String },
    sections: { type: [SectionSchema], default: [] },
    tips: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);