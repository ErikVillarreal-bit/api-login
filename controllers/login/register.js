const bcrypt = require('bcrypt')
const userSchema = require('../../models/user')
const {validatedRegiter} = require('../../models/user.validation')

//REGISTRAR AL USUARIO EN LA BD
const register = async (req, res) => {
    //OBTENEMOS LOS DATOS
    const {name, email, password} = req.body

    //VALIDACINÓN DE LOS DATOS
    try{
        await validatedRegiter.validateAsync(req.body)
    }catch(error){
        return res.json({
            error: true,
            message: "Ocurrio un error al validar la información",
            data: error.details[0].message
        })
    }

    //VALIDAR SI EL CORREO YA EXISTE
    const emailExist = await userSchema.findOne({email})
    if(emailExist){
        return res.json({
            error: true,
            message: "El correo ya existe"
        })
    }

    //ENCRIPTAR LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(password, salt)

    //CREACIÓN DEL USUARIO
    const user =  new userSchema({ name, email, pass})

    //GUARDAMOS AL USUARIO EN LA BD
    try{
        const saveUser =  await user.save()
        res.json({
            error: false,
            message: "Usuario guardado",
            data: saveUser
        })
    }catch(error){
        return res.json({
            error: true,
            message: "Ocurrio un error al crear el usuario",
            data: error.message
        })
    }
}

module.exports = {register}