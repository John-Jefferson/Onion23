const http = require('http'); 
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const url = require('url');
const db = require('./firebase-admin');

console.log(db)
// Create HTTP server manually
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // Set JSON response headers
  res.setHeader('Content-Type', 'application/json');
  if (method === 'GET'){
    requestedPath = pathname === "/" ? "/home.html" : pathname;
    const filePath = path.join(__dirname, 'public', requestedPath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        //res.writeHead(200, { 'Content-Type': "text/html" });
        const ext = path.extname(filePath);
        if (ext === '.js') {
          contentType = 'text/javascript';
          console.log("JS FILE DONE")
        }
        else if (ext === '.html') {
          contentType = 'text/html';
          console.log("HTML FILE DONE")
        }
        //console.log("looking for the file: ", ext);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
  });
}});

// Socket.io setup
const io = new Server(server);

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
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})