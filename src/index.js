const express = require('express');
const app = express();
const PORT = 3001;
const { getEducationForms, getEducationAreas, getEducationProgramsJoin } = require('./crud');
const cors = require("cors");


const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));


app.get('/api/forms', getEducationForms); 
app.get('/api/areas', getEducationAreas); 
app.get('/api/programs', getEducationProgramsJoin); 


app.listen(PORT, console.log(`listen port ${PORT}`));