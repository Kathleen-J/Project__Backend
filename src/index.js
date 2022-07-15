const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 3001;
const cors = require("cors");
const router = require('./routes');
const { getToken } = require('./controllers');
const catchErrors = require('./middlewares/catchErrors');
const {catcher} = require('./utils/catcher');
const { checkAuth } = require('./middlewares/checkAuth');
const { sendNewToken } = require('./controllers/auth/sendNewToken');

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', router);
app.post('/api/auth/token', catcher(getToken));
app.post('/api/auth/new-token', checkAuth, catcher(sendNewToken));
app.use(catchErrors);

io.on("connection", socket => {
   const { id } = socket.client;
   console.log(`User connected: ${id}`);
   socket.on("chat message", (message) => {
      console.log(message);
      io.emit("chat message", (message));
      console.log(message);
    });
 });

server.listen(PORT, console.log(`HTTP: listen port ${PORT}`));