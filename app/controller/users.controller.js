const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/db');
const erreurCall = require('../services/call.services');
const privateKey = require('../config/private-key')



exports.login = async(req, res) => {
    if (req.body.email && req.body.password) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (!user) {
                return res.status(404).json({ message: "cet email ne correspond a aucun compte" })
            }
            const verifPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!verifPassword) {
                const message = "le mdp est incorrect";
                return res.json(401).json({ message });
            }

            const token = jwt.sign({ userId: user.id },
                privateKey.privateKey, { expiresIn: "24h" }
            );
            const message = "vous vous etes bien identifier - merci de recupérer le token pour vos futur requete sur l'api"
            res.json({ message, data: user, token })

        } catch (error) {
            erreurCall(error, res)
        }
    } else {
        res.status(400).json("Demande de login annulés. Merci de renseigner votre email et mdp")
    }
}


exports.register = async(req, res) => {

    try {

        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {

            let result = await User.create(req.body);
            res.json(result);

        } else {
            res.status(409);
            res.json({ "message": 'Cet email est déja utilisé' })
        }




    } catch (e) {
        res.status(500);
        res.json({ "message": e })
    }

}