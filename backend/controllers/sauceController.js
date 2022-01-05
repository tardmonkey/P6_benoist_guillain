const Sauce = require("../models/Sauce")


 // Capture et enregistre  l'image, analyse la sauce transformée en chaîne
  //  de caractères et l'enregistre dans la base de données en définissant correctement
  //   son imageUrl.Initialise les likes et dislikes de la sauce à 0 et les usersLiked et 
  //   usersDisliked avec des tableaux vides.Remarquez que le corps de la demande initiale
  //    est vide; lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande 
  //    en fonction des données soumises avec le fichier.
exports.createSauce = (req,res,next) => {
    delete req.body._id;                               //Supprime l'id envoyé par l'API
    const sauce = new Sauce({
      ...req.body
    })
    sauce.save()    //save() renvoie une promise
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}


  // Renvoie un tableau de
  // toutes les sauces de la base
  // de données.
exports.findSauces = (req,res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}


// Renvoie la sauce avec l’_id fourni.
exports.findOneSauce = (req,res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

  
  // Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, elle est capturée et l’imageUrl de la sauce est mise à jour. Si
  // aucun fichier n'est fourni, les informations sur la sauce se trouvent directement dans le corps de la requête (req.body.name,
  // req.body.heat, etc.). Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. Notez que
  // le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne du corps de la demande basée sur les
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
exports.deleteSauce = (req,res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}


  // Définit le statut « Like » pour l' userId fourni. Si like = 1, l'utilisateur aime (= like) la sauce. Si like = 0, l'utilisateur annule son like ou son
  // dislike. Si like = -1, l'utilisateur n'aime pas (= dislike) la sauce. L'ID de l'utilisateur doit être ajouté ou retiré du tableau
  // routerroprié. Cela permet de garder une trace de leurs préférences et les empêche de liker ou de ne pas disliker la même sauce plusieurs
  // fois : un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. Le nombre total de « Like » et de « Dislike » est mis à jour à
  // chaque nouvelle notation.
exports.likeDislike = (req,res, next) => {
     // request body { userId: String,
      //   like: Number }
  
}

