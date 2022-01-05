const Utilisateur = require("../models/Utilisateur")

const bcrypt = require("bcrypt")

// Hachage du mot de passe de l'utilisateur, ajout de
// l'utilisateur à la base de données.
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new Utilisateur({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}


  // Vérification des   informations d'identification
  // de l'utilisateur,  renvoie l _id de l'utilisateur
  // depuis la base de données   et un token web JSON signé
  // (contenant également l'_id  de l'utilisateur).
exports.login = (req,res, next) => {
    console.log("login page")
}

