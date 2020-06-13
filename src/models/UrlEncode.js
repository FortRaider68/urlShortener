const Mongoose = require('mongoose')
const shortid= require('shortid')

const UrlSchema = new Mongoose.Schema({
    OriginalUrl:{
        type:String,
        require:true,
        select:false
    },
    UrlEncoded:{
        type:String,
        default:shortid(this.OriginalUrl),
    },
    views:{
        type:Number,
        default:0
    }
})

const urlModel = Mongoose.model('urlEncoded',UrlSchema)

module.exports = urlModel