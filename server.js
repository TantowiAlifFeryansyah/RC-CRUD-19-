const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const port = 3005

const data = [
    
]

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//template engine
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { daftarSiswa: data })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    // res.render('add')
    data.push({string: req.body.string, integer: Number(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) },
    );
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    data.splice(index, 1)
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const index = req.params.id
    res.render('edit', { item: data[index] })
})

app.post('/edit/:id', (req, res) => {
    const index = req.params.id
    data[index] = {string: req.body.string, integer: Number(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) }
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`Aplikasi akan berjalan di port ${port}`)
})