const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
// const port = require('./src/consts/port');
// Create a connection pool for MySQL
const pool = mysql.createPool({
  host: '192.168.2.3',
  user: 'Quyen',
  password: 'LWrE*15e[tL@r2AU',
  database: 'dn2ndhome',
});

const app = express();
const port = 3000; // Choose the port number for your API
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};
// Assuming you have the necessary packages and configurations for your backend server
app.get('/api/getQuan', (req, res) => {
  const query = 'SELECT * FROM district';
  pool.query(query, (error, results) => {
    res.status(200).json(results);
  });
});
app.post('/api/getHuyen', (req, res) => {
  pool.query('SELECT * FROM ward', (error, results) => {
    res.status(200).json(results);
  });
});
const storage = multer.diskStorage({
  destination: '/temp/', // Specify the destination folder where uploaded files will be stored
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Configure multer middleware
const upload = multer({storage: storage});
app.post('/api/uploadImages', upload.array('imagesUri', 2), (req, res) => {
  console.log(imagesUri[0]);
});
app.post('/api/upload', (req, res) => {
  const prd_id = generateRandomId();
  const prd_status = 1;
  const {
    token,
    tieudeInputed,
    quanSelected,
    huyenSelected,
    diaChiChiTietInputed,
    dienTichInputed,
    giaChoThueInputed,
    moTaInputed,
    imagesUri,
  } = req.body;
  const imageUri = imagesUri[0].uri;
  const filename = path.basename(imageUri);
  let imageUri1,
    filename1 = '',
    imageUri2,
    filename2 = '',
    imageUri3,
    filename3 = '';

  if (imagesUri[1]) {
    imageUri1 = imagesUri[1].uri;
    filename1 = path.basename(imageUri1);
  }

  if (imagesUri[2]) {
    imageUri2 = imagesUri[2].uri;
    filename2 = path.basename(imageUri2);
  }

  if (imagesUri[3]) {
    imageUri3 = imagesUri[3].uri;
    filename3 = path.basename(imageUri3);
  }
  const decoded = jwt.verify(token, 'secret_key');
  const user_id = decoded.id;
  const values = [
    prd_id,
    user_id,
    quanSelected,
    huyenSelected,
    tieudeInputed,
    dienTichInputed,
    giaChoThueInputed,
    moTaInputed,
    filename,
    filename1,
    filename2,
    filename3,
    prd_status,
    1,
    'Active',
  ];

  pool.query(
    'INSERT INTO `prd_info`(`prd_id`, `user_id`, `district_id`, `ward_id`, `prd_title`, `area`, `price`, `prd_detail`, `img`, `img2`, `img3`, `img4`, `prd_status`, `full`,`create_day`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
    values,
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({error: 'An error occurred while inserting data'});
      } else {
        res
          .status(200)
          .json({success: true, message: 'Data inserted successfully'});
      }
    },
  );
});

app.post('/api/login', (req, res) => {
  const {username, password} = req.body;

  pool.query(
    'SELECT * FROM user WHERE username = ?',
    [username],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({error: 'An error occurred during login'});
      }
      if (results.length > 0) {
        // User with the provided username exists
        const user = results[0];
        if (user.pass === password) {
          // Valid credentials, send success response
          const u = {id: user.user_id, username: user.username};
          const token = jwt.sign(u, 'secret_key', {expiresIn: '1h'});
          res.json({success: true, token});
        } else {
          // Invalid password, send failure response
          res.json({success: false});
        }
      } else {
        // User with the provided username does not exist, send failure response
        res.json({success: false});
      }
    },
  );
});
app.get('/api/checkAuth', authenticateToken, (req, res) => {
  // The user is authenticated, handle the request
  // ...
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function generateRandomId() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return timestamp + randomNum;
}
