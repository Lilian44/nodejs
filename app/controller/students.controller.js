const { Student } = require('../models/db')
const { getAge } = require('../services/students.services')
const erreurCall = require('../services/call.services')


//importer le service
// const studentsService = require('../services/students.services')

exports.getAll = async(req, res) => {

    try {
        let listeEtudiants = await Student.findAll();
        if (!listeEtudiants.length) {
            const message = "La liste des etudiants est vide"
            return res.json(message)
        }
        listeEtudiants = listeEtudiants.map(etudiant => {
            etudiant.age = getAge(etudiant.birthdate)
            return etudiant
        });

        const message = "Las liste a été récupérée"
        res.json({ message, listeEtudiants })
    } catch (error) {
        erreurCall(error, res)
    }
}


exports.getById = async(req, res) => {
    try {
        let etudiant = await Student.findByPk(req.params.id)
        if (etudiant === null) {
            const message = "L'étudiant demander n'existe pas"
            res.status(400).json(message);
        }
        etudiant.age = getAge(etudiant.birthdate)

        const message = "Un etudiant a bien été trouvé"
        res.json({ message, etudiant });
    } catch (error) {
        erreurCall(error, res)
    }


}
exports.create = async(req, res) => {
    try {
        const etudiant = await Student.create(req.body);
        return etudiant;

    } catch (e) {
        erreurCall(e, res)
    }

}




// exports.addLesson = async (req, resp) => {
//    try {
//       let student = await Student.findByPk(req.params.id2)
//       let lesson = await Lesson.findByPk(req.params.id1)
//       await lesson.setStudents(student);
//       let lessons = await student.getLessons();
//       resp.json(lessons);

//    } catch (e) {
//       console.log(e);
//       resp.status(500);
//       resp.json({ error: e });
//    }


// }



// exports.update = async (req, res) => {
//    try {
//        await Student.update(req.body, {
//          where: {
//             id: req.params.id
//          }
//       });
//         res.json({id:req.params.id,...req.body});
//    } catch (e) {
//       resp.json(500);
//       resp.json({ error: e });
//    }



// }

// exports.remove = async (req, resp) =>{
// try {
//        await Student.destroy({
//          where: {
//             id: req.params.id
//          }
//        });
//    res.status(200);
//         res.json({"message":"element removed"});
//    } catch (e) {
//       resp.json(500);
//       resp.json({ error: e });
//    }
// }