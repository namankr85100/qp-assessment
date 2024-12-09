module.exports = {
  // Place a new order
  create: async function (req, res) {
    const { userId, items } = req.body;

    if (!userId || !items || !items.length) {
      return res.badRequest({ message: 'Invalid order data.' });
    }

    let totalPrice = 0;
    for (const item of items) {
      const groceryItem = await GroceryItem.findOne({ id: item.itemId });
      if (!groceryItem || groceryItem.quantity < item.quantity) {
        return res.badRequest({ message: `Item ${item.itemId} is out of stock.` });
      }
      totalPrice += groceryItem.price * item.quantity;

      // Update inventory
      await GroceryItem.updateOne({ id: item.itemId }).set({
        quantity: groceryItem.quantity - item.quantity,
      });
    }

    const order = await Order.create({ user: userId, items, totalPrice }).fetch();
    return res.ok(order);
  },

  // Get all orders for a user
  findByUser: async function (req, res) {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate('user');
    return res.ok(orders);
  },
};
