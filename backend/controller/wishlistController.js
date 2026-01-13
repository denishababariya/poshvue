const { Wishlist } = require('../model');

/* GET WISHLIST */
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("items.product");

    res.json(wishlist || { user: req.user.id, items: [] });
  } catch (err) {z
    res.status(500).json({ message: err.message });
  }
};

/* ADD / REMOVE PRODUCT */
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        items: [{ product: productId }]
      });
      return res.json(wishlist);
    }

    const index = wishlist.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index > -1) {
      wishlist.items.splice(index, 1); // remove
    } else {
      wishlist.items.push({ product: productId }); // add
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeWishlistItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    const index = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not in wishlist" });
    }

    wishlist.items.splice(index, 1); // remove the item
    await wishlist.save();

    res.json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
