const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const diagramRoutes = require('./routes/diagram');
const cors = require('cors')

const app = express();
app.use(cors({ origin: ['http://localhost:3001'] }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



app.use('/api/diagrams', diagramRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});