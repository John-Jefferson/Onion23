import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
console.log("js file recognized");
root.render(<h1>Hello, world</h1>);

  /*const socket = io();

  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const send = document.getElementById('send');

  send.onclick = () => {
    alert("button Working")
    const msg = input.value.trim();
    if (msg) {
      socket.emit('sendMessage', msg);
      input.value = '';
    }
  };

  socket.on('newMessage', msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.textContent = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });*/