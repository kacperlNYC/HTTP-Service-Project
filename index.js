// Kacper Letowski Web Dev Period 7 8
const express = require('express');
const app = express()

const courses = [
    {id: 1, name: 'Web Dev'},
    {id: 2, name: 'IT'},
    {id: 3, name: 'Cybersecurity'}
]

const genres = [
    "pop",
    "hip-hop",
    "rap",
    "classical",
    "rock",
    "jazz",
    "blues",
    "electronic"
]

const songs = [
    {id: 1, name:"Name", genre: "pop", year: 2023, month: 1}
]

app.use(express.json())

// GET Request
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Kacper\'s music app!')
})

app.get('/api/genres', (req, res)=>{
    res.status(200).send(genres);
})

app.get('/api/songs', (req, res)=>{
    res.status(200).send(songs);
})

app.get('/api/songs/id', (req, res)=>{
    res.status(404).send('ID Missing')
})

app.get('/api/songs/id/:id', (req,res)=> {
    let song = songs.find(s=> s.id === parseInt(req.params.id))
    if (!song) {
        res.status(404).send('The song was not found')
        return
    }
    res.status(200).send(song);
})

app.get('/api/songs/date', (req,res) => {
    res.status(404).send("Year and Month not found")
})

app.get('/api/songs/date/:year/:month', (req,res) => {
    let filtered = songs.filter((s) => s.year == req.params.year && s.month == req.params.month)
    if (filtered.length === 0) {
        res.status(404).send("No songs found")
        return
    }
    res.status(200).send(filtered)
})

app.get('/api/songs/genre/:genre', (req,res) => {
    let filtered = songs.filter((s) => s.genre == req.params.genre)
    if (filtered.length === 0) {
        res.status(404).send("No songs found")
        return
    }
    res.status(200).send(filtered)
})

// POST Requests
app.post('/api/songs', (req,res) => {
    let name = req.body.name
    let genre = req.body.genre
    let year = req.body.year
    let month = req.body.month

    if (!genres.includes(genre))
    {
        res.status(404).send("Invalid Song Genre")
        return
    }
    else if (name.length < 3 || name.length > 32)
    {
        res.status(404).send("Song name must be between 3 and 32 characters")
        return
    }
    else if (!year || !month)
    {
        date = new Date()
        year = date.getFullYear()
        month = date.getMonth()
    }

    let song = {
        id: songs.length +1,
        name: name,
        genre: genre,
        year: year,
        month: month
    }

    songs.push(song)

    res.status(200).send(song)
});

// TODO: add genre post req

app.put('/api/courses/:id', (req,res)=>{
    let song = songs.find((s) => s.id === parseInt(req.params.id))
    if (!song) {
        res.status(404).send('The song was not found')
        return
    }
    else if (req.body.name < 3 || req.body.name > 32)
    {
        res.status(404).send('Song name must be between 3 and 32 characters')
        return
    }
    else if (!genres.includes(req.body.genre))
    {
        res.status(404).send('Invalid genre')
    }
    else {
        songs["name"] = req.body.name
        songs["genre"] = req.body.genre;
        // TODO: add date?
        res.status(200).send(song)
    }
});
    
app.delete('/api/courses/:id', (req,res)=>{
    course = courses.find(c=> c.id === parseInt(req.params.id))
    if (!course)
    {
        res.status(404).send('The course was not found')
        return
    }
    else
    {
        let index = courses.indexOf(course)
        courses.splice(index, index+1)
        res.status(200).send(course)

    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000 ..")
})