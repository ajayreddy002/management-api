const loginModal = require('../models').adminLogin;
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    create: (req, res) => {
        if (req.body.email, req.body.password) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                console.log(hash)
                loginModal.create({
                    email: req.body.email,
                    password: hash
                }).then(data => {
                    console.log(data.id)
                    res.send('Inserted');
                }).catch(err => {
                    // console.log(err)
                    res.send('Not inserted');
                });
            });
        }
    },
    index: (req, res) => {
        if (req.body.email, req.body.password) {
            loginModal.findAll({
                where: {
                    email: req.body.email
                }
            }).then(data => {
                console.log(data[0].password)
                bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                    if (result === true) {
                        console.log(result);
                        payload = {email: req.body.email};
                        options = {expiresIn: '2h' };
                        iat = Math.floor(Date.now() / 1000) - 30
                        secret = process.env.private_key;
                        const token = jwt.sign(payload, secret, options, iat);
                        res.send({res: token});
                    } else {
                        console.log(err, 'err');
                        res.send('Invalid Password', 401)
                    }
                });
            }).catch(err => {
                console.log(err);
                res.send('Enter Valid details', 401);
            })
        } else {
            res.send('Enter Valid details');
        }
    }
}