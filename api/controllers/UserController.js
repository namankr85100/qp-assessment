module.exports = {
  // Create a new user
  create: async function (req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.badRequest({ message: 'Name and email are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.badRequest({ message: 'User with this email already exists.' });
    }

    const user = await User.create({ name, email }).fetch();
    return res.ok(user);
  },

  // Get user details
  findOne: async function (req, res) {
    const { id } = req.params;

    const user = await User.findOne({ id }).populate('orders');
    if (!user) {
      return res.notFound({ message: 'User not found.' });
    }

    return res.ok(user);
  },
};
