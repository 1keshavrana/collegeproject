const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete",async (listing)=>{
  if (listing){
    await review.deleteMany({_id : {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;