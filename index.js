const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const {v4:uuidv4} = require('uuid')

//setup express server


app.set('view engine','ejs')
app.use(express.static('public'))

// get Id
app.get('/',(req, res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room',(req,res) =>{
    res.render('room',{roomId:req.params.room})
})

// connect socket io

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId) => {
 console.log(roomId,userId);
    })
})


server.listen(3000)