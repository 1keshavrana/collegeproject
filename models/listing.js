const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const listingSchema = new Schema({
    title :{
        type: String,
        required : true,
    },
    description: String,
    image: {
        type: String,
        set : (v) => v === ""?"https://media.istockphoto.com/id/930082108/photo/solitary-lime-tree-in-fields-of-rapeseed-and-wheat-under-blue-sky.jpg?s=612x612&w=0&k=20&c=ALuNL8rkWjxYu8aCytJAoW13AdYC2Hc2DIgFbNQ6KcU=" : v,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongooose.model("Listing",listingSchema);
module.export = Listing;