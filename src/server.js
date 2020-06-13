const express = require('express')
const Mongoose = require('mongoose')
const Handlebars = require('express-handlebars')
const path = require('path');
const urlModel = require('./models/UrlEncode');
const Cors = require('cors');
const parametricUrl = require('./utils/parametricUrl');
const Routes = express.Router()

require('dotenv').config()

Mongoose.connect((process.env.MONGODBURLACCESS), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

});

const app = express();

app.use(express.static('public'))


app.engine('handlebars', Handlebars())
app.set('view engine', 'handlebars')

app.use(Cors())

app.use(express.json())

app.use(Routes)

Routes.get('/', async (req, res) => {
    res.render('index')
})
Routes.post('/GenUrl/:url', async (req, res) => {
    const Url = req.params.url

    const CorrectedUrl = parametricUrl.parametricUrl(Url)
    
    const ErrorInValidation = parametricUrl.validateUrl(CorrectedUrl)

    if (ErrorInValidation) {
        return res.status(404).send({ Error: "An error has ocurred" })
    }

    const ShortURLExists = await urlModel.findOne({ OriginalUrl: CorrectedUrl })

    if (ShortURLExists) {
        return res.send(ShortURLExists)
    }

    const NewShortURL = await urlModel.create({
        OriginalUrl: CorrectedUrl
    })
    return res.send(NewShortURL)

})
Routes.get('/:IDUrl', async (req, res) => {
    const UrlEncoded = req.params.IDUrl

    const URLExists = await urlModel.findOne({ UrlEncoded })
        .select('+OriginalUrl')


    if (!URLExists) {
        return res.status(404).send('ERROR 404')
    }

    URLExists.views += 1;

    URLExists.save()

    res.render('redirect-page', { URLExists: URLExists.OriginalUrl })
})


app.listen(3000)


