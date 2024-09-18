const express = require("express");
const mongoose=require('mongoose');

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app=express();
app.use(express.json());
app.use(cors());

server = require('http').createServer(app);

mongoose.connect('--hidden--', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to DB'))
  .catch(console.error);

  const Project = require('./models/Project');

  const io = new Server(server, {
    cors: {
      origin: "*",
      //"http://localhost:3000",
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
  
    
    const ProjectEventEmitter = Project.watch();
    ProjectEventEmitter.on('change', change => {
      let text='project';
        socket.emit('message',{text});
    });
    
  });




app.get('/projects', cors(), async(req,res)=>{  

    const projects = await Project.find();
    res.json(projects);
});

app.post('/project/new', async (req,res)=>{

    const project = new Project({
     
      name: req.body.name,
      pass: req.body.pass,
      type: req.body.type

    });
    project.save();
    res.json(project);
});

app.delete('/project/delete/:id', async (req,res)=>{
  const result=await Project.findByIdAndDelete(req.params.id);
  res.json(result);
})

app.put('/project/save/:id', async (req,res)=>{

  const project=await Project.findByIdAndUpdate(req.params.id);
  if(project) {
      project.name= req.body.name
      project.pass= req.body.pass
  }
  
    project.save();
    res.json(project);
});
