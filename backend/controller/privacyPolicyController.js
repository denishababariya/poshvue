const { PrivacyPolicy } = require('../model');

exports.getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findOne();
    if (!privacyPolicy) {
      return res.status(404).json({ message: 'Privacy Policy not found' });
    }
    res.json(privacyPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(privacyPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};