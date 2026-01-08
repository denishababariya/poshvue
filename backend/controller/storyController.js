const { Story } = require('../model');

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findOne();
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};