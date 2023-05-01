const { User, Thought } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
