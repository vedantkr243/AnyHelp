const { config } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();
exports.connect= () => {
    mongoose.connect(process.env.MONGO_URL, )
    .then(() => console.log('Database connected successfully'))
    .catch((err) =>{
        console.log('Database connection failed');
        console.log(err);   
        process.exit(1);
    })
}