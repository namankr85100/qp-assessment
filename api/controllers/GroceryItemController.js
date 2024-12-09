module.exports = {
  // Create a new grocery item
  create: async function (req, res) {
    const { name, price, category, quantity } = req.body;
    if (!name || !price || !category) {
      return res.badRequest({ message: 'Missing required fields.' });
    }

    const item = await GroceryItem.create({ name, price, category, quantity }).fetch();
    return res.ok(item);
  },

  // Update an existing grocery item
  update: async function (req, res) {
    const { id } = req.params;
    const updates = req.body;

    const updatedItem = await GroceryItem.updateOne({ id }).set(updates);
    if (!updatedItem) {
      return res.notFound({ message: 'Item not found.' });
    }

    return res.ok(updatedItem);
  },

  // Delete a grocery item
  delete: async function (req, res) {
    const { id } = req.params;

    const deletedItem = await GroceryItem.destroyOne({ id });
    if (!deletedItem) {
      return res.notFound({ message: 'Item not found.' });
    }

    return res.ok({ message: 'Item deleted successfully.' });
  },

  // View all grocery items
  findAll: async function (req, res) {
    const items = await GroceryItem.find();
    return res.ok(items);
  },
};
