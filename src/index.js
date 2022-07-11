const express = require('express');
const app = express();
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


app.listen(PORT, console.log(`listen port ${PORT}`));