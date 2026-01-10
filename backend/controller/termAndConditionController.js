const { TermAndCondition } = require('../model');

exports.getTermAndCondition = async (req, res) => {
  try {
    const termAndCondition = await TermAndCondition.findOne();
    if (!termAndCondition) {
      return res.status(404).json({ message: 'Terms and Conditions not found' });
    }
    res.json(termAndCondition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTermAndCondition = async (req, res) => {
  try {
    const termAndCondition = await TermAndCondition.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(termAndCondition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};