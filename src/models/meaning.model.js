const mongoose = require('mongoose');
const { nowMs } = require('../helpers/date');

const meaningSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    wordId: {
      type: String,
      required: true,
      ref: 'Word',
    },
    userId: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    comment: String,
  },
  {
    timestamps: { currentTime: () => nowMs() },
    versionKey: false
  }
);

/**
 * @typedef Meaning
 */
const Meaning = mongoose.model('Meaning', meaningSchema);

module.exports = Meaning;
