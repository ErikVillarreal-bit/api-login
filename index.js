const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes/index')

const app = express()
const PORT = 3000

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const uri = `mongodb+srv://e-commerce:${process.env.DBPASSWORD}@cluster0.1ob6lli.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log('Error al conectarse a la base de datos:', error))

app.use('/', routes)

app.listen(PORT , ()=>{
    console.log(`Server running http://localhost:${PORT}`);
})