const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .select('-__v');
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
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
          const newUsername =req.body.username;
          const newEmail = req.body.email;
          const user = await User.findOneAndUpdate({ _id: req.params.userId },{username: newUsername, email: newEmail},{new: true});
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          } 

    
          res.json({ message: 'User successfully updated' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

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
//add friend

async addFriend (req,res) {
    try {
        const { userId, friendId } = req.params;
    
        // find the user by id
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // add the friend to the user's friends array field
        user.friends.push(friendId);
        await user.save();
    
        res.json({message: 'Friend successfully added'});    
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }


},

//delete friend

async deleteFriend (req,res) {
    try {
        const { userId, friendId } = req.params;
    
        // find the user by id
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // find the index of the friend in the user's friends array field
        const friendIndex = user.friends.indexOf(friendId);
    
        if (friendIndex === -1) {
          return res.status(404).json({ error: 'Friend not found' });
        }
    
        // remove the friend from the user's friends array field
        user.friends.splice(friendIndex, 1);
        await user.save();
    
        res.json({message: 'Friend successfully deleted'});
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }

}

}

