require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool= require("../db.js")

const router = express.Router();
// router.use(bodyParser.json());

const SECRET =process.env.TOKEN_SECRET;
const nodemailer =require("nodemailer")
const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.EMAIL_verify,
      pass: process.env.EMAIL_key
   }
});

// router.post('/register', async (req, res) => {
//     try {
//       const { email, password, name } = req.body;
    
//       // add some basic validation
//       if(!phone || !email || !password) throw new Error('All fields are required.');    
  
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = {
//         phone: phone,
//         email: email,
//         password: hashedPassword
//       }
//       const jwtToken = jwt.sign(user, SECRET);
//       await pool.query('INSERT INTO users (email,password,name,token) VALUES ($1, $2, $3, $4 )', [email, hashedPassword, name, jwtToken]);
//       res.json({ token: jwtToken, message: 'Registered successfully!' });
//     } catch(err) {
//         // set status code to 400 for client errors and provide error message
//         res.status(400).json({ error: err.message });
//     }
//   });

// registratsiya
router.post("/register",async (req, res) => {
  const body = req.body
  if(body){
  var code =Math.floor(Math.random() * 900000)+100000;
   const hashedPassword = await bcrypt.hash(body.password, 10);
 
  if(body.password.length>7 && body.email.includes('@')){
  pool.query('INSERT INTO verify (password,email,username,code) VALUES ($1,$2,$3,$4) RETURNING *',
      [hashedPassword,body.email,body.username,code], (err, result) => {
          if (err) {
            console.log(err);
              res.status(400).send(err.message)
          } else {
              var mailOptions = {
                  from: process.env.EMAIL_verify,
                  to: body.email,
                  subject: "Verification Code",
                  html: `Your activation code:${code}`
               };
              transporter.sendMail(mailOptions, function(error, info){
                  if(error){
                     console.log(error,"error");
                  }else{
                     console.log("your code: "+code);
               
                  }
               });
              res.status(201).send("send message your email")
          }
      })}else{
          if(body.password.length<8){
          res.status(420).send("parol kam kiritildi")
          }
          if(!(body.email.includes('@'))){
              res.status(421).send("email xato kiritildi")
          }}
         }else{
              res.status(441).send("malumotni yubormadingiz")
          }
})

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
    
      // add some basic validation
      if(!email || !password) throw new Error('Email and password are required.');    
  
      // Get user from the database
      const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userRes.rows[0];
  
      // Check if User exists
      if (!user) {
        return res.status(400).json({ error: 'User does not exist.'})
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch){
        return res.status(400).json({ error: 'Incorrect password.' });
      }
  
      // Create token with API secret
      const jwtToken = jwt.sign({id: user.id, name: user.name, email: email},'secret', { expiresIn: '1h' });
  
      // Send back the token
      res.json({ token: jwtToken, message: 'You have successfully logged in!' });
    
    } catch(err) {
        // set status code to 400 for client errors and provide error message
        res.status(400).json({ error: err.message });
    }
  });


  router.put("/reset/", async(req, res) => {
    const body = req.body
    const hashedPassword = await bcrypt.hash(body.password, 10);
    pool.query("SELECT * FROM users", (err, result1) => {
        if (!err) {
            var s=result1.rows.filter(item=>item.verify==body.code)
            console.log(s);
            pool.query('UPDATE users SET password=$1 WHERE id=$2',
            [hashedPassword,s[0].id],
            (err, result) => {
                if (err) {
                    res.status(400).send({err:err,message:'parol oldin ishlatilgan'})
                } else {
                    res.status(200).send("Updated")
                }})
        } else {
            res.status(400).send(err)
        } 
    }) 
  
})

    
// verifikatsiya
router.post("/verify", (req, res) => {
    const body = req.body
    var datatime=new Date()
    pool.query("SELECT * FROM verify", (err, result) => {
        if (!err) {
        var data2=result.rows.filter(item=>item.code==body.code)
        if(data2.length===1){
          pool.query('INSERT INTO users (password,email,username,last_login,time_create,time_update) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [data2[0].password,data2[0].email,data2[0].username,datatime,datatime,datatime], (err, result) => {
            if (err) {
              console.log(err);
                res.status(400).send(err.message)
            } else {
                pool.query('DELETE FROM verify WHERE id = $1', [data2[0].id], (err, result) => {
                    if (err) {
                        res.status(400).send(err.message)
                    } else {
                        console.log(result.rows);
                        token = jwt.sign({ password:data2[0].password,email:data2[0].email,username:data2[0].username,position:data2[0].position}, 'secret')
                        res.status(200).send({access:token})
                    }
                })
            }
        })   
        }else{
            res.status(501).send("error code")
        }
        } else {
            res.status(404).send(err.message)
        }
    })
  
})




  router.get('/user', async (req, res) => {
    // Token "Authorization" sarlavhasi orqali olinadi. Bunday sarlavha yo'q bo'lsa, xatolik qaytariladi.
    const token = req.header('authorization').split(' ')[1];
  console.log(token);
    if (!token) {
      return res.status(403).json({ error: 'Token is required.' });
    }
  
    try {
      // Token ni tekshiramiz va uning ichidagi ma'lumotlarni olamiz
      const userData = jwt.verify(token, SECRET);
  
      // user id orqali user ma'lumotlarni bazadan olish
      const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userData.id]);
      const user = userRes.rows[0];
  
      // Agar foydalanuvchi topilmadi bo'lsa, xatolik qaytariladi
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // foydalanuvchi ma'lumotlarini qaytarish
      res.json(user);
    } catch(err) {
      // Token tekshiruvi yoki bazadan foydalanuvchini olishda xato bo'lsa, xabo qaytarish
      res.status(400).json({ error: err.message });
    }
  });
  router.delete('/user', async (req, res) => {
    const token = req.header('authorization').split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ error: 'Token is required.' });
    }
  
    try {
      const userData = jwt.verify(token, SECRET);
  
      // user id orqali userni bazadan o'chirish
      const deleteRes = await pool.query('DELETE FROM users WHERE id = $1', [userData.id]);
  
      // Agar foydalanuvchi topilmadi bo'lsa, yani uni o'chirish amali bajarilmagan bo'lsa,
      // xatolik qaytariladi
      if (deleteRes.rowCount === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // O'chirish amali muvaffaqiyatli amalga oshganida, ishning tugallanganini bildirgich msg qaytaradi.
      res.json({ message: 'User has been deleted successfully.' });
    } catch(err) {
      res.status(400).json({ error: err.message });
    }
  });
  // PUT /user endpoynti
router.put('/user', async (req, res) => {
    // token ni headerdan olamiz
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied. No token provided.');
  
    let userId; // user id saqlanadigan o'zgaruvchi
    try {
      // token topildi endi uni verify qilamiz
      const decoded = jwt.verify(token, 'YourSecretKey');
      userId = decoded.id;
    } catch (ex) {
      // token verification fail bo'larsa xatolik qaytariladi
      return res.status(400).send('Invalid token.');
    }
  
    try {
      // Userning id si bo'yicha yangilash amaliyoti
      // "User" modelni va "YourSecretKey" ni o'z proyektingizga moslashtiring
      const user = await User.findById(userId);
      if (!user) return res.status(404).send('The user with the given ID was not found.');
  
      // Yangilanmagan ma'lumot uchun standartni saqlash
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // va hokazo...
  
      await user.save();
      res.send(user);
    } catch (err) {
      // yangilash amalida xatolik yuzaga kelsa
      console.error('Something went wrong during the update process', err);
      res.status(500).send('Something went wrong during the update process.');
    }
  });
router.post('/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(res.body.password, 10);
    pool.query('INSERT INTO users(email, password, username, name, superadmin) VALUES($1, $2, $3, $4, $5)', [req.body.email, hashedPassword, req.body.ptichka, req.body.name, req.body.superadmin])
     .then(() => {
         res.status(200).json({
             status: 'success',
             message: 'Inserted one user'
         });
     })
     .catch((error) => {
         return next(error);
     });
});
// Read -> GET request
router.get('/users', (req, res) => {
    pool.query('SELECT * FROM users')
     .then((data) => {
         res.status(200).json(data.rows);
     })
     .catch((error) => {
         return next(error);
     });
});

// Update -> PUT request
router.put('/users/:id', (req, res) => {
    pool.query('UPDATE users SET email=$1, password=$2, ptichka=$3, name=$4, superadmin=$5 WHERE id = $6', 
    [req.body.email, req.body.password, req.body.ptichka, req.body.name, req.body.superadmin, parseInt(req.params.id)])
     .then(() => {
         res.status(200).json({
             status: 'success',
             message: 'Updated user'
         });
     })
     .catch((error) => {
         return next(error);
     })
});

// Delete -> DELETE request
router.delete('/users/:id', (req, res) => {
    pool.query('DELETE FROM users WHERE id = $1', parseInt(req.params.id))
     .then((result) => {
         res.status(200).json({
             status: 'success',
             message: `Removed ${result.rowCount} user`
         });
     })
     .catch((error) => {
         return next(error);
     });
});
module.exports=router