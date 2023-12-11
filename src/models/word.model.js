const mongoose = require('mongoose');

const wordSchema = mongoose.Schema(
  {
    wordId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    freq: {
      type: Number,
      required: true,
    },
    detail: String,
    kanji: String,
    kunyomi: String,
    onyomi: String,
    label: String,
    strokeCount: String,
    exampleKun: {
      type: [String],
      default: [],
    },
    exampleOn: {
      type: [String],
      default: [],
    },
    examples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Example',
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Word
 */
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
