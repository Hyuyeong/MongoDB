const mongoose = require('mongoose');
const reviewtSchema = new mongoose.Schema({
  review: String,
  rating: Number,
});
const Review = mongoose.model('Review', reviewtSchema);
module.exports = Review;
