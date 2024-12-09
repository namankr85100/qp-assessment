module.exports.routes = {
  // GroceryItem routes
  'POST /api/v1/admin/grocery-items': 'GroceryItemController.create',
  'PUT /api/v1/admin/grocery-items/:id': 'GroceryItemController.update',
  'DELETE /api/v1/admin/grocery-items/:id': 'GroceryItemController.delete',
  'GET /api/v1/admin/grocery-items': 'GroceryItemController.findAll',

  // Order routes
  'POST /api/v1/orders': 'OrderController.create',
  'GET /api/v1/users/:userId/orders': 'OrderController.findByUser',

  // User routes
  'POST /api/v1/users': 'UserController.create',
  'GET /api/v1/users/:id': 'UserController.findOne',
};
