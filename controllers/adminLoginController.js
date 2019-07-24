const loginModal = require('../models').adminLogin;
module.exports = {
    create:(req, res) => {
        if(req.body.email, req.body.password) {
            loginModal.create({
                email: req.body.email,
                password: req.body.password
            }).then(data => {
                res.send('Inserted');
            }).catch(err => {
                res.send('Not inserted');
            });
        }
    },
    index:(req, res) => {
        if (req.body.email, req.body.password) {
            loginModal.findAll({
                where: {
                    email: req.body.email
                }
            }).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        } else {    
            res.send('Enter Valid details');
        }
    }
}