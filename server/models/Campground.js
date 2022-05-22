const mongoose = require('mongoose');
const Review = require('./Review');

const CampgroundSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      // review: String,
      // rating: Number,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);

// review: String,
//   rating: Number,
