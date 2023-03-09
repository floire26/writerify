const { Op } = require('sequelize');
const { User, Course, Proficiency, Class } = require('../models');
const pubKey = process.env.PUBLISHABLE_KEY;
const sKey = process.env.SECRET_KEY;
const stripe = require('stripe')(sKey);


class coursesController{
    static getCoursesList(req, res) {
        const { UserId, CourseId } = req.params
        const { prof } = req.query;
        const options = {
            include: Proficiency, User, Class
        };
        console.log(UserId);

        if (prof) {
            options.where = {
                ProficiencyId: {
                     [Op.eq]: prof
                }
            }
        }
        Course.findAll(options)
        .then(courses => {
            User.findByPk(UserId, {
                include: {
                    model: Course,
                    through: Class
                }
            })
            .then(user => {
                console.log(user.dataValues.Courses);
                res.render('coursesList', { courses, user, prof: prof, key: pubKey, CourseId })
            })
        })
        .catch(err => res.send(err));
    }

    static getCourseEnroll(req, res) {
        const { UserId, CourseId } = req.params

        res.redirect(`/courses/${UserId}/enroll/${CourseId}`)
        .catch(err => res.send(err));
    }

    static postCourseEnroll(req, res) {
        const { UserId, CourseId } = req.params;
        const { prof } = req.query;


        Course.findByPk(CourseId).
        then(course => {
            stripe.customers.create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken,
                name: 'Edward',
                address: {
                    line1: 'Jl. Kali Jodo',
                    postal_code: '42069',
                    city: 'Jakarta Barat',
                    state: 'DKI Jakarta',
                    country: 'Indonesia'
                }
            })
            .then(customer => {
                return stripe.charges.create({
                    amount: course.price * 100,
                    description: 'Testing stuffs',
                    currency: 'USD',
                    customer: customer.id
                })
            })
            .then(() => {
                return Class.create({
                    UserId,
                    CourseId
                })
            })
            .then(() => {
                if (prof) {
                    res.redirect(`/courses/${UserId}?prof=${prof}`);
                } else {
                    res.redirect(`/courses/${UserId}`);
                }
            })
            .catch(err => res.send(err));
        })
    }

    static getCourseUnenrolled(req, res) {
        const { UserId, CourseId } = req.params;

        Class.destroy({
            where: {
                UserId,
                CourseId
            }
        })
        .then(() => res.redirect(`/courses/${UserId}`))
        .catch(err => res.send(err));

    }
}

module.exports = coursesController;
