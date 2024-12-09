/**
 * Order.js
 */
module.exports = {
  attributes: {
    user: { model: 'user', required: true },
    items: { type: 'json', required: true }, // Store array of items with quantities
    totalPrice: { type: 'number', required: true },
    orderDate: { type: 'string', autoCreatedAt: true },
  },
};
