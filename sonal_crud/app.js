// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./config/database'); 
const userRoutes = require('./routes/user-route'); 

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public'))); 


app.use('/users', userRoutes); 
app.get('/', (req, res) => {
    res.redirect('/users'); 
});
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!'); 
});
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});
