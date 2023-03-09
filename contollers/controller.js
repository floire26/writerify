class Controller {
    static home(req, res) {
        res.render('home')
    }

    static login(req, res) {
        res.render('login')
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
        console.log({userName, email, password});
        
    }


}

module.exports = Controller