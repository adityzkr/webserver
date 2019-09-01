// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')

// const app = express()

// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname,'../template/views')
// const partialsPath = path.join(__dirname,'../templates/partials')

// app.set('view engine', 'hbs')
// app.set('views',viewsPath)
// hbs.registerPartials(partialsPath)

// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Aditya'
//     })
   
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: ' Aditya'
//     })
//     res.render('about')
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title:'Help',
//         name:"aditya"
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

// app.listen(3002, () => {
//     console.log('Server is up on port 3000.')
// })
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'aditya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'aditya'
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'NewDELHI',
    //     address:   req.query.address
    // })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Help page not found',
        name:"aditya"
    })
})
// app.get('*',(req,res)=>{
//     res.send("My 404 Page Not Found")
// })
app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'PAGE NOT FOUND',
        name:"aditya"
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3000.')
})