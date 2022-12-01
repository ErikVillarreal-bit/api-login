const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../../models/user')
const {validatedLogin} = require('../../models/user.validation')

const login = async (req, res) => {
    const {email, password} = req.body

     //VALIDACINÓN DE LOS DATOS
    try{
        await validatedLogin.validateAsync(req.body)
    }catch(error){
        return res.json({
            error: true,
            message: "Ocurrio un error al validar la información",
            data: error.details[0].message
        })
    }

    //VALIDAR SI EL CORREO YA EXISTE
    const user = await userSchema.findOne({email})
    if(!user){
        return res.json({
            error: true,
            message: "El usuario no existe"
        })
    }

    //VALIDAR SI LA CONTRASEÑA ES CORRECTA
    const validPassword = await bcrypt.compare(password, user.pass)
    if(!validPassword){
        return res.json({
            error: true,
            message: "Contraseña no valida"
        })
    }
    
    //CREAMOS UN JWT PARA EL USUARIO
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        registrationDay: user.date

    },process.env.TOKEN_SECRET)

    //MANDAMOS UN HEADER CON EL TOKEN
    res.header('auth-token',token).json({
        error: false,
        data: {token}
    })

    
}

module.exports = {login}