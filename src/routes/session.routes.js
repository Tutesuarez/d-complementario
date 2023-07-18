import { Router } from 'express'
import passport from 'passport'
import '../config/passport.js'
import { jwtValidation } from '../middleware/jwt.middleware.js'
import { current, login, logout, register, validation } from '../controller/session.controller.js'

const routerSession = Router()


routerSession.post('/login', login)
routerSession.get('/logout', logout)
routerSession.post('/register', register)
routerSession.post('/current', current)
routerSession.get('/validation', jwtValidation, validation)


routerSession.get('/githubSignup'), passport.authenticate('githubSignup', { scope: ['user:email'] }), async (req, res) => { }
routerSession.get('/githubSignup', passport.authenticate('githubSignup', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.user = req.user;
        res.redirect('/')
    })

routerSession.get('/GoogleSignup', passport.authenticate('GoogleStrategy',{ scope: ['user:email'] }))
routerSession.get('/google', passport.authenticate('GoogleStrategy',{failureRedirect: '/login'}),
function (req, res) {
    req.session.user = req.user;
    res.redirect('/')
})


export default routerSession;