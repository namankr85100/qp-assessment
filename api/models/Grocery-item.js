/**
 * GroceryItem.js
 */
module.exports = {
  datastore: 'postgres',
  tableName: 'Grocery',
  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    category: { type: 'string', required: true },
    quantity: { type: 'number', defaultsTo: 0 }
  },
};
