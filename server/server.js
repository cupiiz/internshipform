
const express = require('express');
const apiRouterAdmin = require('./routes/admin');
const apiRouterTeams = require('./routes/teams');
const apiRouterPositions = require('./routes/positions');
const apiRouterUniversities = require('./routes/universities');
const apiRouterApplication = require('./routes/application');
const apiRouterMentors = require('./routes/mentors');
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


app.use('/api', apiRouterAdmin);
app.use('/api', apiRouterTeams);
app.use('/api', apiRouterPositions);
app.use('/api', apiRouterUniversities);
app.use('/api', apiRouterApplication);
app.use('/api', apiRouterMentors);
//Port
app.listen(process.env.PORT || '8000', () => {
  console.log(`Server is running on port: ${process.env.PORT || '8000'}`);
});