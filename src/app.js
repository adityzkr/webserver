
// //request and response
// //app.com
// //app.com/help
// //app.com/about
const path = require('path')
const express = require('express')
const app = express()

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
app.set('view engine','hbs')

const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    res.send({
        forecast:'it is raining',
        location:'New Delhi'
    })
})

app.listen(3002, () => {
    console.log('Server is up on port 3000.')
})