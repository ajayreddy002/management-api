const loginModal = require('../models').adminLogin;
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    create: (req, res) => {
        if (req.body.email && req.body.password && req.body.roll) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                loginModal.findAll({
                    where: {
                        email: req.body.email
                    }
                }).then(data => {
                    if (data !== undefined && data.length == 0) {
                        loginModal.create({
                            email: req.body.email,
                            password: hash,
                            roll: req.body.roll
                        }).then(data => {
                            console.log(data.id)
                            res.send({message:'Inserted'});
                        }).catch(err => {
                            // console.log(err)
                            res.send({message:'Not inserted', err: err});
                        });
                    } else {
                        res.send({ error: true, message: 'User already exists' })
                    }
                }).catch(e => {
                    res.send({ error: true })
                })
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
                        payload = { email: req.body.email, roll: data[0].roll };
                        options = { expiresIn: '2h' };
                        iat = Math.floor(Date.now() / 1000) - 30
                        secret = process.env.private_key;
                        const token = jwt.sign(payload, secret, options, iat);
                        res.send({ authToken: token, error: false });
                    } else {
                        // console.log(err, 'err');
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