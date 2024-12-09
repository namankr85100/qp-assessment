/**
 * Order.js
 */
module.exports = {
  datastore: 'postgres',
  tableName: 'Order',
  attributes: {
    user: { model: 'user', required: true },
    items: { type: 'json', required: true }, // Store array of items with quantities
    totalPrice: { type: 'number', required: true },
    orderDate: { type: 'string', autoCreatedAt: true },
  },
};
