const nodemailer = require("nodemailer")
const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
    }
}

const send = async(data) => {
 const transports = nodemailer.createTransport(config)
 transports.sendMail(data,(err, info) => {
    if(err) {
        console.log(err);
    } else {
        return info.response
    }
 })
}

module.exports = {
    send
}