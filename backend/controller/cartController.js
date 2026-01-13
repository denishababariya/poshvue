const Cart = require("../model/Cart");

/* GET CART */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    console.log("Fetched cart:", cart);
    res.json(cart || { user: req.user.id, items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ADD TO CART */
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    console.log("Current cart:", cart);

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: qty }],
      });
      console.log("Created new cart:", cart);
      return res.json(cart);
    }

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      item.quantity += qty;
      console.log("Updated quantity for item:", item);
    } else {
      cart.items.push({ product: productId, quantity: qty });
      console.log("Added new item:", productId);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE QUANTITY */
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = qty;
    await cart.save();

    console.log("Updated item quantity:", item);
    res.json(cart);
  } catch (err) {
    console.error("Error in updateCartItem:", err);
    res.status(500).json({ message: err.message });
  }
};

/* REMOVE ITEM */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    console.log("Removed item. Updated cart:", cart);
    res.json(cart);
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    res.status(500).json({ message: err.message });
  }
};
