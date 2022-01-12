const Sauce = require("../models/Sauce")

const fs = require('fs')


 // Capture et enregistre  l'image, analyse la sauce transformée en chaîne
  //  de caractères et l'enregistre dans la base de données en définissant correctement
  //   son imageUrl.Initialise les likes et dislikes de la sauce à 0 et les usersLiked et 
  //   usersDisliked avec des tableaux vides.Remarquez que le corps de la demande initiale
  //    est vide lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande 
  //    en fonction des données soumises avec le fichier.
  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id                              //delete l'id envoyé par le front
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }))
  }


  // Renvoie un tableau de
  // toutes les sauces de la base
  // de données.
exports.findSauces = (req,res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
}


// Renvoie la sauce avec l’_id fourni.
exports.findOneSauce = (req,res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
}

  
  // Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, elle est capturée et l’imageUrl de la sauce est mise à jour. Si
  // aucun fichier n'est fourni, les informations sur la sauce se trouvent directement dans le corps de la requête (req.body.name,
  // req.body.heat, etc.). Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. Notez que
  // le corps de la demande initiale est vide  lorsque multer est ajouté, il renvoie une chaîne du corps de la demande basée sur les
  // données soumises avec le fichier
exports.updateSauce = (req,res, next) => {
   // request body EITHER
      // Sauce as JSON
      // OR { sauce:
      // String,
      // image: File }
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }))
}

  // Supprime la sauce avec l'_id fourni
  //  Trouver la sauce si elle existe, puis vérifie qu'elle appartient bien à
  //l'utilisateur
  exports.deleteSauce = (req, res, next) => {

      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
              .catch(error => res.status(400).json({ error }))
          })
        })
        .catch(error => res.status(500).json({ error }))
    }


  // Définit le statut « Like » pour l' userId fourni. Si like = 1, l'utilisateur aime (= like) la sauce. Si like = 0, l'utilisateur annule son like ou son
  // dislike. Si like = -1, l'utilisateur n'aime pas (= dislike) la sauce. L'ID de l'utilisateur doit être ajouté ou retiré du tableau
  // routerroprié. Cela permet de garder une trace de leurs préférences et les empêche de liker ou de ne pas disliker la même sauce plusieurs
  // fois : un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. Le nombre total de « Like » et de « Dislike » est mis à jour à
  // chaque nouvelle notation.
  exports.likeDislike = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //like = +1 (like +1)
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like == 1) {
        
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "+1 like" }))
          .catch((error) => {
            res.status(400).json({ error })
          })
      }

      //like = 0 (neutre pour les sauces qui ont été liké)
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like == 0) {

        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: " 0 like" }))
          .catch((error) => {
            res.status(400).json({ error })
          })
      }

      //like = -1 (dislike = +1)
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like == -1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "+1 dislike" }))
          .catch((error) => {
            res.status(400).json({ error })
          })
      }

      //dislike = 0 (neutre pour les sauces qui ont été liké)
      if (sauce.usersDisliked.includes(req.body.userId) && req.body.like == 0) {
        
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "0 like" }))
          .catch((error) => {
            res.status(400).json({ error })
          })
      }
    })
    .catch((error) => res.status(404).json({ error }))
  }
  