// Kacper Letowski Web Dev Period 7 8
const express = require('express');
const app = express()

const genres = ["Pop", "Hip-Hop", "Rap", "Classical", "Rock", "Jazz", "Blues", "Electronic"]

const songs = [
    {id: 1, name:"Name", genre: "pop", year: 2023, month: "January"}
]

app.use(express.json())

function getMonth(month) {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Invalid Month"
    }

}

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

app.get('/api/songs/:id', (req,res)=> {
    let song = songs.find(s=> s.id === parseInt(req.params.id))
    if (!song) {
        res.status(404).send('The song was not found')
        return
    }
    res.status(200).send(song);
})

app.get('/api/songs/:year/:month', (req,res) => {
    let filtered = songs.filter((s) => s.year == req.params.year && s.month == req.params.month)
    if (filtered.length === 0) {
        res.status(404).send("No songs found")
        return
    }
    res.status(200).send(filtered)
})

app.get('/api/genre/:genre', (req,res) => {
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
        month = getMonth(date.getMonth())
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

app.put('/api/songs/:id', (req,res)=>{
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
        song["name"] = req.body.name
        song["genre"] = req.body.genre;
        // TODO: add date?
        res.status(200).send(song)
    }
});
    
app.delete('/api/songs/:id', (req,res)=>{
    let song = songs.find(s => s.id === parseInt(req.params.id))
    if (!song)
    {
        res.status(404).send('The song was not found')
        return
    }
    else
    {
        let index = songs.indexOf(song)
        songs.splice(index, index+1)
        res.status(200).send(song)

    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000...")
})