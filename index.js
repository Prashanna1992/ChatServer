const express = require("express");
var http = require("http");

const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);


var io = require("socket.io")(server);
// middleware
app.use(express.json());
var clients = {};
const routes = require("./routes");
app.use("/routes",routes);

io.on("connection",(socket)=>{

  console.log(socket.id ," has connected");
  socket.on("/test",(msg)=>{ 
    console.log(msg);
  });

  socket.on("verifyUser",(id)=>{
    clients[id] = socket;
  });

  socket.on("sendMessage",(request)=>{
    let destinationId = request.destinationId;
    if(clients[destinationId]){
      clients[destinationId].emit("sendMessage",request); 
    }
  });
});

app.route("/check").get((req,res)=>{
  return res.json("Your app is running!");
});

server.listen(port,"0.0.0.0",()=>{console.log("Server Started! at " + port)});

