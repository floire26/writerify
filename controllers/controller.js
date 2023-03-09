class Controller {
    static home(req, res) {
        res.render('home')
    }

    static login(req, res) {
        const {error} = req.query
        res.render('login', {error})
    }

    static loginPost(req, res) {
        const {email, password } = req.body
        console.log({email, password});
        
    }

    static register(req, res) {
        res.render('register')
        
    }
    
    static registerPost(req, res) {
        const {userName, email, password} = req.body

        User.create({userName, email, password})
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseList(req, res) {
        res.render('courseList')
    }


}

module.exports = Controller