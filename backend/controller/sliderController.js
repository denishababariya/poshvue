const Slider = require('../model/Slider');

const getSlider = async (req, res) => {
  try {
    let slider = await Slider.findOne();
    if (!slider) {
      // Return default data if none exists
      slider = {
        slides: [
          {
            title: "Winter Wedding Edit 2026",
            subtitle: "Luxury Ensembles for Grand Celebrations",
            image: "https://i.pinimg.com/1200x/59/9c/8c/599c8cd0645006f231f4cda408c5287f.jpg",
            buttonText: "SHOP WEDDING LOOKS",
          },
          {
            title: "Festive New Arrivals",
            subtitle: "Statement Styles Crafted for the Season",
            image: "https://i.pinimg.com/1200x/59/9c/8c/599c8cd0645006f231f4cda408c5287f.jpg",
            buttonText: "EXPLORE COLLECTION",
          },
          {
            title: "Designer Ethnic Wear",
            subtitle: "Where Tradition Meets Contemporary Fashion",
            image: "https://i.pinimg.com/1200x/59/9c/8c/599c8cd0645006f231f4cda408c5287f.jpg",
            buttonText: "VIEW DESIGNS",
          },
          {
            title: "Party Wear Essentials",
            subtitle: "Elevated Styles for Every Special Moment",
            image: "https://i.pinimg.com/1200x/59/9c/8c/599c8cd0645006f231f4cda408c5287f.jpg",
            buttonText: "SHOP PARTY WEAR",
          },
        ]
      };
    }
    res.json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const updatedSlider = await Slider.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedSlider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSlider,
  updateSlider,
};