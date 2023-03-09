const { Op } = require('sequelize');
const { User, Course, Proficiency, Class } = require('../models');


class coursesController{
    static getCoursesList(req, res) {
        const { userId } = req.params
        const { prof } = req.query;
        const options = {
            include: Proficiency, User, Class
        };
        console.log(userId);

        if (prof) {
            options.where = {
                ProficiencyId: {
                     [Op.eq]: prof
                }
            }
        }
        Course.findAll(options)
        .then(courses => {
            User.findByPk(userId, {})
            .then(user => {
                console.log(user);
                res.render('coursesList', { courses, user, prof: prof })
            })
        })
        .catch(err => res.send(err));
    }

    static getCourseEnroll(req, res) {

    }

    static getCourseUnenrolled(req, res) {

    }
}

module.exports = coursesController;
