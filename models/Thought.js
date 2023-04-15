const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
          // Convert timestamp to a formatted date string
          return new Date(timestamp).toLocaleDateString();
        }
      },
      username: {
        type: String,
        required: true,       
      },
      reaction: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

  //Create a virtual property called friendCount that retrieves the length of the user's friends array field on query.

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
})
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;