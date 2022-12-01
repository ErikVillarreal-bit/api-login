const admin = (req,res) => {
    res.json({
        error: false,
        message: `Acceso permitido. Bienvenido ${req.user.name}` ,
    })
}

module.exports = {admin}