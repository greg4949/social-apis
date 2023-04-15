const { Thought, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await Reaction.deleteMany({ _id: { $in: thought.reaction } });
      res.json({ message: 'thought and reactions deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


//create reaction
  async createReaction (req, res) {
    try {
        const { thoughtId } = req.params;
        const { reactionBody } = req.body;
    
        // find the thought by id
        const thought = await Thought.findById(thoughtId);
    
        if (!thought) {
          return res.status(404).json({ error: 'Thought not found' });
        }
    
        // add the reaction to the thought's reactions array field
        thought.reactions.push({ reactionBody });
        await thought.save();
    
        res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  //Delete Reaction
  async deleteThought(req, res) {
    try {
        const { thoughtId, reactionId } = req.params;
    
        // find the thought by id
        const thought = await Thought.findById(thoughtId);
    
        if (!thought) {
          return res.status(404).json({ error: 'Thought not found' });
        }
    
        // find the index of the reaction in the thought's reactions array field
        const reactionIndex = thought.reactions.findIndex(reaction => reaction.id === reactionId);
    
        if (reactionIndex === -1) {
          return res.status(404).json({ error: 'Reaction not found' });
        }
    
        // remove the reaction from the thought's reactions array field
        thought.reactions.splice(reactionIndex, 1);
        await thought.save();
    
        res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

}