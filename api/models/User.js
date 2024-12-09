/**
 * User.js
 */
module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    email: { type: 'string', unique: true, required: true },
    orders: { collection: 'order', via: 'user' },
  },
};
