const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        
      };

      res.json(studentObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();
        

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Update a user by its ID
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate({ _id: req.params.userId },{username: newUsername, email: newEmail},{new: true});
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          } 

    
          res.json({ message: 'Student successfully updated' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const student = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
