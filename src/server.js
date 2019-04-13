const express = require('express');
const mongosse = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
//agora o app escuta tanto http quanto ws
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
})
                  
mongosse.connect("mongodb+srv://got:got@cluster0-0ms4r.mongodb.net/omnistack?retryWrites=true", {
    useNewUrlParser: true,

});

//A partir desse momento todos os middleware terão acesso ao io
app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));


//app.listen(3333);
server.listen(process.event.PORT || 3333);