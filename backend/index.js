const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanchar.izgww06.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, () => console.log('connected'));

app.use('/api/user', require('./Routes/appRouter'));
app.use('/api/posts', require('./Routes/postRouter'));
app.use('/api/aadhar', require('./Routes/aadharRouter'));
app.use('/api/dna', require('./Routes/dnaRouter'));
app.use('/api/cars',require('./Routes/carsRouter'))

app.get('/', (req, res) => {
    res.send('Hello from Sanchaar!');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})