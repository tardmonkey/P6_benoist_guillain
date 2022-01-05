const express = require('express')

const mongoose = require("mongoose")

const Sauce = require('./models/Sauce')

//appel du routeur
const sauceRoutes = require('./routes/sauces')
const authRoutes = require("./routes/auth")
const app = express()

//CORS
//  CORS
//    CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

//routes qui renvoient vers les routeurs
app.use('/api/sauces', sauceRoutes)
app.use("/api/auth", authRoutes)

app.use(express.json());



//Connexion à MongoDB
mongoose.connect('mongodb+srv://openclassroom:lesiteduzero@clusterpiiquante.u97ok.mongodb.net/clusterpiiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));








module.exports = app