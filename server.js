const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {Blob} = require('buffer');
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
app.use(
  '/api/getImage',
  express.static('C:/xampp/htdocs/DN2ndHome/img/Products'),
);
app.use(
  '/api/getUserAvatar',
  express.static('C:/xampp/htdocs/DN2ndHome/img/Avatars'),
);
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Split by space and get the token at index 1
  if (!token) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user_id = decoded.id; // Add the user_id to the request object
    next();
  } catch (error) {
    console.log('Error verifying token:', error);
    res.status(401).json({error: 'Invalid token'});
  }
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
  destination: 'C:/xampp/htdocs/DN2ndHome/img/Products',
  filename: (req, file, cb) => {
    // Set the file name for the uploaded file
    cb(null, generateRandomId() + file.originalname);
  },
});

const upload = multer({storage, limits: {fileSize: 10 * 1024 * 1024}});

app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  const imageName = req.file.filename;
  const {tieude, diachi, dientich, giachothue, mota, quan, huyen} = req.body;
  const user_id = req.user_id;
  const prd_status = 1;
  if (!req.file) {
    return res.status(400).json({error: 'No image provided'});
  }
  const values = [
    user_id,
    quan,
    huyen,
    diachi,
    tieude,
    dientich,
    giachothue,
    mota,
    imageName,
    '',
    '',
    '',
    prd_status,
    1,
    'Active',
  ];
  pool.query(
    'INSERT INTO `prd_info`(`user_id`, `district_id`, `ward_id`, `detail_address`, `prd_title`, `area`, `price`, `prd_detail`, `img`, `img2`, `img3`, `img4`, `prd_status`, `full`, `create_day`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
    values,
    (error, results) => {
      if (error) {
        console.error('Error inserting image into database:', error);
        return res.status(500).json({
          error: 'An error occurred while inserting image into database',
        });
      }
      return res
        .status(200)
        .json({success: true, message: 'Image uploaded successfully'});
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
          const token = jwt.sign(u, 'secret_key', {expiresIn: '2h'});
          res.json({success: true, token, user});
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

app.get('/api/getPost', (req, res) => {
  pool.query(
    'SELECT * FROM prd_info inner join district ON prd_info.district_id=district.district_id inner join ward ON prd_info.ward_id=ward.ward_id inner join user ON prd_info.user_id=user.user_id WHERE prd_status = 2',
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({error: 'An error occurred during retrieving data'});
      }
      res.json(results); // Send the query results as the response data
    },
  );
});

app.get('/api/getPostedPost', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  pool.query(
    'SELECT * FROM prd_info inner join district ON prd_info.district_id=district.district_id inner join ward ON prd_info.ward_id=ward.ward_id inner join user ON prd_info.user_id=user.user_id WHERE user.user_id = ?',
    user_id,
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({error: 'An error occurred during retrieving data'});
      }
      res.json(results); // Send the query results as the response data
    },
  );
});

app.get('/api/deletePostedPost', (req, res) => {
  const prd_id = req.query.prd_id;
  console.log(prd_id);
  pool.query(
    'DELETE FROM `prd_info` WHERE prd_id = ?',
    prd_id,

    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({error: 'An error occurred during retrieving data'});
      }
      res.json(results); // Send the query results as the response data
    },
  );
});

app.get('/api/getLikedPost', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  const prd_id = req.query.prd_id;
  pool.query(
    'SELECT * FROM cart_new WHERE user_id = ? AND id_prd = ?',
    [user_id, prd_id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({error: 'An error occurred during retrieving data'});
      }
      res.json(results); // Send the query results as the response data
    },
  );
});

app.post('/api/likePost', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  const {prd_id} = req.body;
  pool.query(
    'INSERT INTO `cart_new`(`user_id`,`id_prd`) VALUES (?,?)',
    [user_id, prd_id],
    (error, results) => {
      if (error) {
        console.error('Error inserting data into database:', error);
        return res.status(500).json({
          error: 'An error occurred while inserting date into database',
        });
      }
      return res
        .status(200)
        .json({success: true, message: 'Image uploaded successfully'});
    },
  );
});

app.post('/api/removeLikePost', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  const {prd_id} = req.body;
  pool.query(
    'DELETE FROM `cart_new` WHERE `user_id` = ? and `id_prd` = ?',
    [user_id, prd_id],
    (error, results) => {
      if (error) {
        console.error('Error inserting data into database:', error);
        return res.status(500).json({
          error: 'An error occurred while inserting data into database',
        });
      }
      return res
        .status(200)
        .json({success: true, message: 'data remove successfully'});
    },
  );
});

app.get('/api/checkTokenExpiredTime', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  try {
    const decodedToken = jwt.decode(token);
    const currentTime = Date.now() / 1000; // Convert current time to seconds
    if (decodedToken.exp < currentTime) {
      res.json({success: false});
    } else {
      // Token is still valid
      res.json({success: true});
    }
  } catch (error) {
    console.log('Error verifying token:', error);
    res.status(401).json({error: 'Invalid token'});
  }
});

app.get('/api/getUserAvartarName', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  pool.query(
    'SELECT avatar FROM user WHERE user_id = ?',
    user_id,
    (err, result) => {
      if (err) {
        console.error('Error retriving data from database:', err);
        return res.status(500).json({
          error: 'An error occurred while retriving data from database',
        });
      }
      return res.status(200).json(result);
    },
  );
});

app.get('/api/getUserInfo', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  pool.query('SELECT * FROM user WHERE user_id = ?', user_id, (err, result) => {
    if (err) {
      console.error('Error retriving data from database:', err);
      return res.status(500).json({
        error: 'An error occurred while retriving data from database',
      });
    }
    return res.status(200).json(result);
  });
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
  return timestamp;
}
