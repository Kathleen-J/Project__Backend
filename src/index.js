const express = require('express');
const app = express();
const PORT = 3001;
const cors = require("cors");
const router = require('./routes');


const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));


app.use('/api', router);


app.listen(PORT, console.log(`listen port ${PORT}`));