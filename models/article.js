const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  source: { type: String, required: true },
  textBody: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Article", articleSchema);

module.exports = Article;
