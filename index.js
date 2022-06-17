const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api', (req, res) => {
    res.json({message: 'Backend'});
})

app.listen(PORT, console.log(`listen port ${PORT}`));