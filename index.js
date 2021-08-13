const express = require('express');
const connectDB = require('./config/db');

const app = express();
// connect DB 
connectDB();

// enable json 
app.use(express.json({extended: true}));

// app PORT 
const PORT = process.env.PORT || 4000;

// routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


// run app 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});