const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const RandomCities = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "668e7251083fe6dd18122006",
      location: `${cities[RandomCities].city}, ${cities[RandomCities].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      image: "https://picsum.photos/400?random=${Math.random()}",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, corrupti repudiandae a soluta, officia molestiae, voluptate excepturi illo harum dolores explicabo. Beatae maiores recusandae ipsa maxime, voluptatem minima doloribus accusamus?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[RandomCities].longitude,
          cities[RandomCities].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/djnrjwe3g/image/upload/v1721036705/YelpCamp/g0y0ks1xrwhnwu6dheah.jpg",
          filename: "YelpCamp/g0y0ks1xrwhnwu6dheah",
        },
        {
          url: "https://res.cloudinary.com/djnrjwe3g/image/upload/v1721036706/YelpCamp/wwrm8vawtjm8zwegcsv0.png",
          filename: "YelpCamp/wwrm8vawtjm8zwegcsv0",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
