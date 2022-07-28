const mongoose = require('mongoose');
const {infoLog, errorLog}=require('./logger')

const db = ()=> {
    mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/?retryWrites=true&w=majority`, (err)=>{
        err === null ? infoLog("Connected to MongoDB"): errorLog(err)
    }).catch(err=> errorLog(err))
}

module.exports = db