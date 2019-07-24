var userModal = require('../models').User;
module.exports = {
    create:(req, res) => {
        if(req.body.email && req.body.password && req.body.employee_name
            && req.body.employee_id) {
            userModal.create({
                employeeId: req.body.employee_id,
                employeeName: req.body.employee_name,
                email: req.body.email,
                password: req.body.password
            }).then(data => {
                console.log(data);
            })
        }
    },
}