const { User, Course, Proficiency } = require('../models');
const { Configuration, OpenAIApi } = require("openai");
const determineProfId = require('../helpers/determineProfId');
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

class promptController {
    static getTestForm(req, res) {
        const { err } = req.query
        const { userId } = req.params;
        console.log(userId);

        User.findByPk(
            userId,
            {}
        )
        .then(user => {
            console.log(user.id);
            res.render('promptForm', { user, err });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }

    static postTestForm(req, res) {
        let updatedProf;
        const { text } = req.body;
        const { userId } = req.params;

        const prompt = `
            Can you evaluate my writing skill with my sample writing below? The scale should be within:
            - beginner
            - intermediate
            - advanced

            Here's the sample:
            ${text}
            `;


        if (text === "" || !text) {
            return res.redirect(`/prompt/${userId}?err=There's seem to be a problem to in determining your writing skill. Please try again!`)
        }

        openai.createCompletion({
            model: "text-davinci-002",
            prompt,
            max_tokens: 64,
            temperature: 0.5
        })
        .then(response => {
            const ProficiencyId = determineProfId(response.data.choices[0].text);
            // console.log(prompt);
            // res.send(prompt);
            User.update({
                ProficiencyId
            }, {
                where: {
                    id: userId
                }
            })

            res.redirect(`/courses?prof=${ProficiencyId}`);
        })
        .catch(err => res.send(err));
    }
}

module.exports = promptController;
