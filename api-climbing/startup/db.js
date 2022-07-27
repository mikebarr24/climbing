const mongoose = require('mongoose');

const db = ()=> {
    mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/?retryWrites=true&w=majority`, ()=> {
        console.log("Connected")
    })
}

module.exports = db