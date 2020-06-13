const JOI = require('@hapi/joi')
const Axios = require('axios')

function parametricUrl(url) {
    const schema = JOI.object().keys({
        url: JOI.string().trim().uri().required()
    })

    const {error} = schema.validate({url})

    if(error){
        const CorrectedURL = `https://${url}`
        return CorrectedURL
    }
    return url
}

function validateUrl(url) {
    const regex = new RegExp('[a-z0-9-]+\.(?:com|org|mit|edu|gov|net)(?:\.[a-z]{2,3})?','i')
    const schema = JOI.object().keys({
        url: JOI.string().trim().regex(regex).required()
    })

    const {error} = schema.validate({url})
    return error
}



module.exports = {parametricUrl,validateUrl}