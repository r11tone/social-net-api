const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const validate = require('mongoose-validator');

const thoughtValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 280],
    message: 'Thought should be between 1 and 280 characters'
  }),
];

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      validate: thoughtValidator,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => new Date(date).toLocaleString()
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
