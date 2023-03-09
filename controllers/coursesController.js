const { User, Course, Proficiency } = require('../models');


class coursesController{
    static getCoursesList(req, res) {
        Course.findAll({
            include: all
        })
    }

    static getCourseEnroll(req, res) {

    }

}

module.exports = coursesController;
