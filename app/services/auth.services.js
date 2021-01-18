const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/db');
const privateKey = require('../config/private-key')
const erreurCall = require('../services/call.services')


module.exports = async(req, res, next) => {
    console.log("requete pour page protégée");
    const token = req.headers["x-access-token"]

    if (!token) {
        const message = " vous n'avez pas fourni de jeton d'authentification";
        return res.status(401).json({ message })
    }

    jwt.verify(
        token,
        privateKey.privateKey,
        async(error, decodedToken) => {
            if (error) {
                const message = "L'utilisateur n'est pas autorisé à accedé a cette page";
                return res.status(401).json({ message, data: error.message })
            }

            const userId = decodedToken.userId;
            const user_from_token = await User.findByPk(userId);
            if (!user_from_token) {
                const message = "Votre compte existe plus. Vous n'etes pas autoriséer à a acceder à cette page"
                return res.status(401).json({ message })
            }
            res.locals.id = userId;
            next();
        }

        //a partir d'ici c'est que tous les check sont ok
    )

}