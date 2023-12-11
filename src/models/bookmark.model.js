const mongoose = require('mongoose');

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
    timestamps: true,
  }
);

/**
 * @typedef Bookmark
 */
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
