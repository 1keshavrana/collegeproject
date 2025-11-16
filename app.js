const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratrgy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = {
  secret: "musupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.get("/", (req, res) => {
  res.send("Hi, I am root");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratrgy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// app.get("/demouser",async (req, res) =>{
//   let fakeUser = new User({
//     email: "keshav@gmail.com",
//     username: "1Keshavrana"
//   });
//   let regUser = await User.register(fakeUser,"keshav");
//   res.send(regUser);
// });

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



app.all('/{*splat}',(req , res , next ) =>{
  next(new ExpressError(404, "Page not found"));
});

app.use((err,req, res, next)=>{
  let {statusCode = 500, message= "Something went wrong !"} = err;
  res.status(statusCode).render("error.ejs",{message});
  //res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});






// // const express = require("express");
// // const app = express();
// // const mongooose = require("mongoose");
// // const Listing = require("./models/listing")

// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// // main().then(
// //     ()=>{
// //         console.log("connected to db");
// //     }
// // ).catch(err => {
// //     console.log(err);
// // });

// // async function main() {
// //     await mongooose.connect(MONGO_URL);
// // }

// // app.get("/",(req,res)=>{
// //     res.send("hi, im root");
// // });

// // app.get("/testlisting",async (req,res)=>{
// //     let sampleListing = new Listing({
// //         title: "My New Villa",
// //         description:"By the beach",
// //         price: 1200,
// //         location: "Calangute, Goa",
// //         country: "India"
// //     });

// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("successful testing");
// // });

// // app.listen(8080,() =>{
// //     console.log("server is listing");
// // });


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     set: (v) =>
//       v === ""
//         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//         : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
