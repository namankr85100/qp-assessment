/**
 * User.js
 */
module.exports = {
  datastore: 'postgres',
  tableName: 'User',
  primaryKey: 'id',
  attributes: {
    name: { type: 'string', required: true },
    email: { type: 'string', unique: true, required: true },
    orders: { collection: 'order', via: 'user' },
  },
};
