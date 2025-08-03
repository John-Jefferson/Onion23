const http = require('http'); 
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const url = require('url');
const db = require('./firebase-admin');
const fetchUserData = async (uid) => {
  try{
    console.log("ITO YUNG UID OHH LOOKK: ", uid)
    const userDocs = db.collection('Users').doc(uid);
    const userData = await userDocs.get();
    console.log("data from firebase: ", userData.data());
    return userData.data();
  }catch (err){
    console.log("ERRORRRR: ", err)
    return err;
  }
}
// Create HTTP server manually
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method == "OPTIONS"){
    res.writeHead(204);
    res.end()
    return;
  }
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    //body += chunk.toString(); // convert Buffer to string
  });
  if (pathname === "/mainPage" && method === "POST") {
    console.log("someone connected")

    req.on('end', async () => {
      try {
        const data = JSON.parse(body); // assuming JSON body
        console.log("Received data:", data);
        if(data.action == "Sign-up"){
          console.log("initializing signing in na")
          await db.collection('/Users').doc(data.uid).set({
            email: data.email,
            overallScore: 0
        })
        }
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "User added successfully" }));
        return;
      } catch (err) {
        console.error("Error:", err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid data" }));
        return;
      }
    });
  }
  else if (pathname === "/getUserData" && method === "POST"){
    req.on('end', async () => {
      try{
        const data = JSON.parse(body);
        const userData = await fetchUserData(data.uid)
        console.log(userData)
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ overallScore: userData.overallScore }));
        return
      }
      catch (err) {
          console.error("Error:", err);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Invalid data" }));
          return
        }
      })
  }
  else{
    console.log("wrong path")
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Route not found" }));
    return;
  }
  });
// Socket.io setup
/*const io = new Server(server);

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('sendMessage', async (msg) => {
    console.log('Message:', msg);
    try {
      await db.collection('Onions').add({
        message: msg,
        senderID: socket.id
      })
    } catch(error){
      console.log(error)
    }
    io.emit('newMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});*/

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${3001}`);
})