const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
