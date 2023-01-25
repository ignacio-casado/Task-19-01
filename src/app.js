
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const User = require('./models/User.js')

//app
const app = express();

//PORT
const PORT = process.env.PORT || 8080

//Listen port
app.listen(PORT,()=>{
    console.log(`Server up running on port ${PORT}`)
})

//sessions
// const store = fileStore(session)

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    key: 'user_sid',
    secret: 'nach1n',
    resave: true,
    saveUninitialized: true
}))

//views
/* app.use(express.static(path.join(__dirname, 'public')))
app.use('/routerData',router)
app.engine('handlebars',handlebars.engine())
app.set('views',path.join(__dirname,'views'))
app.set('view engine','handlebars') */

//morgan
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
morgan.token('host', function(req, res) {
    return req.hostname;
});

// new routes


const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

// app.get('/login', )
app.route('/login').get((req, res) => {
    res.sendFile(__dirname + '/public/login.html')
}).post(async (req, res) => {
    let { username, password } = req.body

    try {
        let user = await User.findOne({ username }).exec()
        if (!user) {
            res.redirect('/login')
        }
        if (user.password != password) {
            res.redirect('/login')
        }
        req.session.user = user
        res.redirect('/dashboard')
    } catch(err) {
        console.log(err)
    }
})

app.route('/signup').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
}).post((req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err, docs) => {
        if (err) {
            res.redirect('/signup')
        } else {
            req.session.user = docs
            res.redirect('/dashboard')
        }
    })
})

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid')
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})
// console.log(sessionChecker)

