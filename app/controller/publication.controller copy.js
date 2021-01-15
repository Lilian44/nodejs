const db = require('../models/db')
const Publication = db.publication;


exports.create = (req, res) => {

    if (req.body.title && req.body.hours && req.body.type) {
        try {
            let response = Publication.create(req.body)
        } catch (e) {
            res.status(500)
            res.json({ "message": "database error" })
        }
    } else {
        res.status(400)
        res.json({ "message": "bad request" })
    }
}

exports.findById = async(req, res) => {

    let id = req.params.id;
    try {
        let response = await Publication.findByPk(id)
        res.json(response)
    } catch (e) {
        res.status(500)
        res.json({ "message": "database error" })
    }

}

exports.findAll = async(req, res) => {
    try {
        let response = await Publication.findAll()
        res.json(response)
    } catch (e) {
        res.status(500)
        res.json({ "message": "database error" })
    }

}

exports.update = async(req, res) => {

    let id = req.params.id

    let Publication = req.body;

    try {
        let response = await Publication.update(Publication, {
            where: { id: id }
        })
        res.json(response)
    } catch (e) {
        res.status(500)
        res.json({ "message": "database error" })
    }

}

exports.delete = async(req, res) => {
    let recupId = req.params.id;
    try {
        await Publication.destroy({
            where: { id: recupId }
        })
        res.status(200)
    } catch (e) {
        res.status(500)
    }

}