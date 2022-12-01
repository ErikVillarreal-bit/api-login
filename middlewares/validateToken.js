const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token) return res.json({
        error: true,
        message: `Acceso denegado`
    })

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        res.json({
            error: true,
            message: 'Token invalido',
            data:error
        })
    }
}

module.exports = {verifyToken}