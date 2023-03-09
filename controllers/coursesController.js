const { Op } = require('sequelize');
const { User, Course, Proficiency } = require('../models');


class coursesController{
    static getCoursesList(req, res) {
        const { prof } = req.query;

        Course.findAll({
            where: {
                ProficiencyId: {
                    [Op.eq]: prof
                }
            },
            include: Proficiency, User
        }
        )
        .then(courses => res.render('coursesList', { courses }))
        .catch(err => res.send(err));
    }

    static getCourseEnroll(req, res) {

    }

}

module.exports = coursesController;
