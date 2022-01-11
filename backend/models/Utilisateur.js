const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// ● email : String — adresse e-mail de l'utilisateur [unique]
// ● password : String — mot de passe de l'utilisateur haché
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

//Empêche la création d'un utilisateur avec la même adresse mail
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Utilisateur', userSchema)




