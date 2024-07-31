const express = require("express");
const mongoose=require('mongoose');

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app=express();
app.use(express.json());
app.use(cors());

server = require('http').createServer(app);

mongoose.connect('mongodb+srv://borismirevbm:2YacEBc3qgz4OiLJ@blocks.6ud9dig.mongodb.net/workstation?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to DB'))
  .catch(console.error);

const User=require('./models/User');

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  'force new connection': true 
});
server.listen(3002);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', function () {
    console.log(`User DisConnected: ${socket.id}`);
});

  
const UserEventEmitter = User.watch();
UserEventEmitter.on('change', change => {
  let text='user';
    socket.emit('message',{text});
});
  
});

app.get('/users', cors(), async(req,res)=>{  

  const users=await User.find();
  res.json(users);
});

app.post('/user/new', async (req,res)=>{

  const user=new User({
      nickname:req.body.nickname,
  });
  user.save();
  res.json(user);
});
