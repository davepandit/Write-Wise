const JWT = require("jsonwebtoken")


//secret for the jwt token
const secret = '4bK7h3A$!#$xPzRq@8sWn2dGf5jKm8p2s5'

function createJsonWebToken(user){
    const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role
    }
    const token = JWT.sign(payload , secret)
    return token

}

function validateJsonWebToken(token){
    const payload = JWT.verify(token , secret)
    return payload
}

module.exports = {
    createJsonWebToken,
    validateJsonWebToken
}