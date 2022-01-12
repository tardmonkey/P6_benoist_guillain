const rateLimit = require("express-rate-limit")

const max = rateLimit({
  windowMs: 1 * 60 * 1000, // délai 1 (minute, premier chiffre) 
  max: 5, // nombre de tentatives autorisées
})

// EXPORT
module.exports = max