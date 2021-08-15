const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const  camp = new Campground({
            author: '610fa8e668990fbf17d4b461',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, hic. Fugiat, adipisci aut temporibus facilis alias officiis officia iure ipsum cum reprehenderit? Nemo ipsam inventore nam earum praesentium mollitia veritatis?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/durah9zst/image/upload/v1628952759/YelpCamp/kdjdkashbxcx4cyqrofm.jpg',
                    filename: 'YelpCamp/kdjdkashbxcx4cyqrofm'
                },
                {
                    url: 'https://res.cloudinary.com/durah9zst/image/upload/v1628951328/YelpCamp/tmxm2vbwsecjjc5lrc9q.jpg',
                    filename: 'YelpCamp/tmxm2vbwsecjjc5lrc9q'
                }
            ]
        })
         await camp.save(); 
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});