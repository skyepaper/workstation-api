const express = require("express");
const mongoose=require('mongoose');

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app=express();
app.use(express.json());
app.use(cors());

server = require('http').createServer(app);

mongoose.connect('mongodb+srv://borismirevbm:2YacEBc3qgz4OiLJ@aquarium.6ud9dig.mongodb.net/edireader?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to DB'))
  .catch(console.error);

  const Record = require('./models/Record');
  const Version = require('./models/Version');

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
  
    
    const RecordEventEmitter = Record.watch();
    RecordEventEmitter.on('change', change => {
      let text='record';
        socket.emit('message',{text});
    });

    const VersionEventEmitter = Version.watch();
    VersionEventEmitter.on('change', change => {
      let text='version';
        socket.emit('message',{text});
    });
    
  });




app.get('/records', cors(), async(req,res)=>{  

    const records = await Record.find();
    res.json(records);
});
app.post('/record/new', async (req,res)=>{

    const record = new Record({
     
      number: req.body.number
    });
    record.save();
    res.json(record);
});
app.delete('/record/delete/:id', async (req,res)=>{
  const result=await Record.findByIdAndDelete(req.params.id);
  res.json(result);
})
app.put('/record/save/:id', async (req,res)=>{

  const record=await Record.findByIdAndUpdate(req.params.id);
  if(record) {
    record.description= req.body.description;
    record.code= req.body.code;
  }
  
    record.save();
    res.json(record);
});



app.get('/versions', cors(), async(req,res)=>{  

  const versions = await Version.find();
  res.json(versions);
});
app.post('/version/new', async (req,res)=>{

  const version = new Version({
    version: req.body.version,
    number: req.body.number
  });
  version.save();
  res.json(version);
});
app.delete('/version/delete/:id', async (req,res)=>{
const result=await Version.findByIdAndDelete(req.params.id);
res.json(result);
})
app.put('/version/save/:id', async (req,res)=>{

const version=await Version.findByIdAndUpdate(req.params.id);
if(version) {
  version.code= req.body.code;
}

  version.save();
  res.json(version);
});
