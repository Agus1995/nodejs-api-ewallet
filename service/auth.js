import {Account, Customer, Op} from '../db/sequelize'
const bcrypt = require('bcrypt');

module.exports = {
    create : function (body, response) {
        // let hash = bcrypt.hashSync(body.password, 10);
        // body.password = hash;
        let numb = Math.floor(Math.random() * Math.floor(100000));
        let id = 'CS-'+numb;
        body.cif = id;
        Customer.create(body).then(
            (customer) =>{
                response(null, customer);
            }).catch((err) => {
            response(err, null);
        })
    },
    login : function (body, response) {

        Customer.findOne({
            where: {
                username: body.username
                //[Op.or]: [{email: body.email}, {username: body.email}]
            }
        }).then(
            (customer) => {
                if (customer.password === body.password){
                    response(null, customer);
                }else {
                    response('wrong username or password', null)
                }
            }
        ).catch((err) =>{
            response(err,null);
        })
    }
}
