const db = require('../models/db')
const Lesson = db.lesson;


exports.create = (req, res) => {

    if (req.body.title && req.body.hours && req.body.type) {
        try {
            let response = Lesson.create(req.body)
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
        let response = await Lesson.findByPk(id)
        res.json(response)
    } catch (e) {
        res.status(500)
        res.json({ "message": "database error" })
    }

}

exports.findAll = async(req, res) => {
    try {
        let response = await Lesson.findAll()
        res.json(response)
    } catch (e) {
        res.status(500)
        res.json({ "message": "database error" })
    }

}

exports.update = async(req, res) => {

    let id = req.params.id

    let lesson = req.body;

    try {
        let response = await Lesson.update(lesson, {
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
        await Lesson.destroy({
            where: { id: recupId }
        })
        res.status(200)
    } catch (e) {
        res.status(500)
    }

}