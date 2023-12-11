const mongoose = require('mongoose');

const wordUserSchema = mongoose.Schema(
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
    bookmarkId: {
      type: String,
      ref: 'Bookmark',
    },
    note: String,
    meaning: String,
    trans: String,
    detail: String,
    url: String,
    addDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef WordUser
 */
const WordUser = mongoose.model('WordUser', wordUserSchema);

module.exports = WordUser;
