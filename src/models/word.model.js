const mongoose = require('mongoose');
const { nowMs } = require('../helpers/date');

const wordSchema = mongoose.Schema(
  {
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
    timestamps: { currentTime: () => nowMs() },
    versionKey: false
  }
);

/**
 * @typedef Word
 */
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
