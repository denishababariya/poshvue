const Cart = require("../model/Cart");
const Product = require("../model/Product");

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
    const { productId, qty = 1, size, color } = req.body;

    const selectedSize = size || null;
    const selectedColor = color || null;

    // validate product & stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!product.stock || product.stock <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // new cart: just ensure requested qty <= stock
      if (qty > product.stock) {
        return res.status(400).json({ message: `Only ${product.stock} item(s) available in stock` });
      }

      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, size: selectedSize, color: selectedColor, quantity: qty }]
      });

      return res.json(cart);
    }

    // total quantity in cart for this product (all sizes/colors)
    const currentTotalForProduct = cart.items.reduce((sum, i) => {
      return i.product.toString() === productId ? sum + (i.quantity || 0) : sum;
    }, 0);

    if (currentTotalForProduct + qty > product.stock) {
      const remaining = Math.max(product.stock - currentTotalForProduct, 0);
      return res
        .status(400)
        .json({
          message:
            remaining > 0
              ? `Only ${remaining} more item(s) available in stock`
              : "No more stock available for this product",
        });
    }

    // match on product + size + color so variants become separate lines
    const item = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        String(i.size || "") === String(selectedSize || "") &&
        String(i.color || "") === String(selectedColor || "")
    );

    if (item) {
      item.quantity += qty;
    } else {
      cart.items.push({ product: productId, size: selectedSize, color: selectedColor, quantity: qty });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log('error',err)
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
