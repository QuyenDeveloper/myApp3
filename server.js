const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {Blob} = require('buffer');
// Create a connection pool for MySQL
const pool = mysql.createPool({
  host: '10.50.14.182',
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

app.post(
  '/api/upload',
  authMiddleware,
  upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1},
  ]),
  (req, res) => {
    const image1 = req.files['image'][0].filename;
    const image2 = req.files['image2'][0].filename;
    const image3 = req.files['image3'][0].filename;
    const image4 = req.files['image4'][0].filename;
    // console.log(image1, image2, image3, image4);
    const {tieude, diachi, dientich, giachothue, mota, quan, huyen} = req.body;
    const user_id = req.user_id;
    const prd_status = 1;
    const values = [
      user_id,
      quan,
      huyen,
      diachi,
      tieude,
      dientich,
      giachothue,
      mota,
      image1,
      image2,
      image3,
      image4,
      prd_status,
      1,
      'Active',
    ];
    console.log(values);
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
  },
);

app.post('/api/login', (req, res) => {
  const {username, password} = req.body;

  pool.query(
    'SELECT * FROM user WHERE email = ?',
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
  pool.query(
    'SELECT * FROM cart_new inner join prd_info ON cart_new.id_prd = prd_info.prd_id inner join district ON prd_info.district_id=district.district_id inner join ward ON prd_info.ward_id=ward.ward_id inner join user on prd_info.user_id = user.user_id WHERE cart_new.user_id = ?',
    [user_id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({error: 'An error occurred during retrieving data'});
      }
      res.json(results);
    },
  );
});
app.get('/api/checkLikedPost', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  const prd_id = req.query.prd_id;
  pool.query(
    'SELECT * FROM cart_new WHERE user_id = ? and id_prd= ?',
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

const avatarStorage = multer.diskStorage({
  destination: 'C:/xampp/htdocs/DN2ndHome/img/Avatars',
  filename: (req, file, cb) => {
    // Set the file name for the uploaded file
    cb(null, generateRandomId() + file.originalname);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {fileSize: 10 * 1024 * 1024},
});

app.post(
  '/api/saveUserInfo',
  authMiddleware,
  uploadAvatar.single('image'),
  (req, res) => {
    const avatarName = req.file.filename;
    const user_id = req.user_id;
    const {ten, sdt, matkhau} = req.body;
    const values = [ten, matkhau, sdt, avatarName, user_id];
    pool.query(
      'UPDATE `user` SET `username`=?,`pass`=?,`phone`=?,`avatar`=? WHERE user_id = ?',
      values,
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
  },
);

app.post('/api/saveUserInfo2', authMiddleware, (req, res) => {
  const user_id = req.user_id;
  const {ten, sdt, matkhau} = req.body;
  const values = [ten, matkhau, sdt, user_id];
  pool.query(
    'UPDATE `user` SET `username`=?,`pass`=?,`phone`=? WHERE user_id = ?',
    values,
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

app.post('/api/register', (req, res) => {
  const {email, ten, matkhau} = req.body;
  const values = [ten, matkhau, email, '', 'DefaultAvt.jpg', 2, 'Active'];
  pool.query(
    'INSERT INTO `user`(`username`, `pass`, `email`, `phone`, `avatar`, `user_level`, `created_at`) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP)',
    values,
    (err, results) => {
      if (err) {
        console.error('Error insert data into database:', err);
        return res.status(500).json({
          error: 'An error occurred while insert data into database',
        });
      }
      return res.status(200).json(results);
    },
  );
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
