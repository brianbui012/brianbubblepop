const path = require('path');
const connectDB = require('../backend/connnection');
const express = require('express');
const app = express();
const cors = require('cors');


const publicPath = path.join(__dirname, "..", "public");
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

connectDB();


app.use('/API/userModel', require('../API/User'))
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, () => {
    console.log(`Connected to ${port}`);
});
