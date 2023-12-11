const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema(
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
      ref: 'Word', // Referencing the Word model
    },
    content: {
      type: String,
      required: true,
    },
    meaning: String,
    trans: String,
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Example
 */
const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
