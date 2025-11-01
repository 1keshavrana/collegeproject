const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/930082108/photo/solitary-lime-tree-in-fields-of-rapeseed-and-wheat-under-blue-sky.jpg?s=612x612&w=0&k=20&c=ALuNL8rkWjxYu8aCytJAoW13AdYC2Hc2DIgFbNQ6KcU=",
      set: (v) =>
        v === ""
          ? "https://media.istockphoto.com/id/930082108/photo/solitary-lime-tree-in-fields-of-rapeseed-and-wheat-under-blue-sky.jpg?s=612x612&w=0&k=20&c=ALuNL8rkWjxYu8aCytJAoW13AdYC2Hc2DIgFbNQ6KcU="
          : v,
    }
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;