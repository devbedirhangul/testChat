const app = require('express')();
const http = require('http').Server(app);
var express = require('express');
const socket = require('socket.io')(http);

app.use(express.static(path.join('public')))
app.set('port', (process.env.PORT || 5000))

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    console.log("selmalar")
});

socket.on("connect", (socket) => {
    console.log('a user connected');

    socket.on("messages", (data) => {
        console.log(data)
        let messsageObj = {
            user: {
                _id: socket.id,
                username:data.username
            },
            text: data.message,
            _id: new Date() + socket.id + data.username,
            createAt:new Date()
        }
        socket.broadcast.emit("messages", { messages: messsageObj });
        socket.emit("messages", { messages: messsageObj });
    })

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});