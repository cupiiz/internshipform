
const express = require('express');
const apiRouter = require('./routes/admin');
const bodyParser = require('body-parser');
const app = express();

//Bodyparser
app.use(bodyParser.json());
//Cross-origin permission
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use((error, req, res, next) => {
    // console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use('/api', apiRouter);

//Port
app.listen(process.env.PORT || '8000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '8000'}`);
});