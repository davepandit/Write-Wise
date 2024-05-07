// making some sort of a closure

const {validateJsonWebToken} = require('../services/token')
function checkForCookie(cookieName){
    return(req , res , next)=>{
        const token = req.cookies[cookieName]

        if(!token){
            return next()
        }

        try {
            const userPayload = validateJsonWebToken(token)
            req.user = userPayload
        } catch (error) {
            
        }
        return next()
    }
}

module.exports = {
    checkForCookie
}