const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config({ path: '.env'})
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./router'));

mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((con) => console.log('Connected to MongoDB', con.connection.host))
.catch(err => console.log('Could not connect!', err));

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));