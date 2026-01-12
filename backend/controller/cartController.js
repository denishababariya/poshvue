const Cart = require("../model/Cart");

/* GET CART */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ADD TO CART */
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    console.log('user',req.user);
    

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: qty }]
      });
      return res.json(cart);
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) {
      item.quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* REMOVE ITEM */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
