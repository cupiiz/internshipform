
const express = require('express');
const apiRouterAdmin = require('./server/routes/admin');
const apiRouterTeams = require('./server/routes/teams');
const apiRouterPositions = require('./server/routes/positions');
const apiRouterUniversities = require('./server/routes/universities');
const apiRouterApplication = require('./server/routes/application');
const apiRouterMentors = require('./server/routes/mentors');
const apiRouterMailTemp = require('./server/routes/mailtemp');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const sql = require('./server/db');
const pdf = require('express-pdf');
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('__dirname', path.join(__dirname, 'uploads'));

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//test 
app.get('/test', async (req, res) => {
  // try {
  //   const sqlQuery = `SELECT id, subject,text FROM therunway_internship.mailtemps WHERE id='1'`;
  //   sql.query(sqlQuery, async (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       // throw err
  //       return 'err'
  //     } else {
  //       console.log(results);

  //       return res.json({ data: results[0].subject});
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return 'err';
  // }
  res.json({ message: 'data' })
});



// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('PDF');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (req.file == undefined) {
        console.log('error 2');
        res.status(400).json({ error: 'Error: No File Selected!' })
      } else {
        res.json({ data: `uploads/${req.file.filename}` })
      }
    }
  });
});

app.use('/api', apiRouterAdmin);
app.use('/api', apiRouterTeams);
app.use('/api', apiRouterPositions);
app.use('/api', apiRouterUniversities);
app.use('/api', apiRouterApplication);
app.use('/api', apiRouterMentors);
app.use('/api', apiRouterMailTemp);
//Port
app.listen(process.env.PORT || '8000', () => {
  console.log(`Server is running on port: ${process.env.PORT || '8000'}`);
});