const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,
    },

    thoughts: [thoughtSchema],
    friends:[userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Create a virtual property called friendCount that retrieves the length of the user's friends array field on query.

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('user', userSchema);

module.exports = User;
