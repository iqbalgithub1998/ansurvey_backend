const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serveySchema = new Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
  },
  questions: [String],
  responses: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      response: [
        {
          question: {
            type: String,
          },
          answer: {
            type: String,
          },
        },
      ],
    },
  ],
});
module.exports = Servey = mongoose.model("servey", serveySchema);
