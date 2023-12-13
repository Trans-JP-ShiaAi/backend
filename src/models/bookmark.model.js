const mongoose = require('mongoose');
const { nowMs } = require('../helpers/date');

const bookmarkSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
    },
    words: [
      {
        type: String,
        ref: 'Word',
      },
    ],
    createdAt: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => nowMs() },
    versionKey: false
  }
);

/**
 * @typedef Bookmark
 */
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
