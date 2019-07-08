import {Account, Customer} from '../db/sequelize'

module.exports = {
    add : function (body, response) {
        if (body.customer) {
            body.cif = body.customer.cif;
        }
        let numb = Math.floor(Math.random() * Math.floor(100000));
        let id = 'AC-'+numb;
        body.accountNumber = id;
        body.status = 'active'
        Account.create(body).then(
            (customer) =>{
                response(null, customer);
            }).catch((err) => {
            response(err, null);
        })
    },
    getList : function (filter, response) {
        Account.findAll({
            include: [{
                model: Customer
            }],
            where: filter
        }).then(
            (customer) =>{
                response(null, customer);
            }).catch((err) => {
            response(err, null);
        })
    },
    closeAccount: function (body, response) {
        body.status = 'INACTIVE';
        Account.update(body, {
            where: {accountNumber: body.accountNumber}
        }).then(
            (acc) => {
                response(null, acc);
            }
        ).catch((err)=>{
            response(err,null);
        })
    },
    updateBalance: function (body, response) {
        Account.update({
            balance: body.balance,
            status: body.status
        },{
            where: {accountNumber: body.accountNumber}
        }).then((acc)=>{
            response(null,acc);
        }).catch((err)=>{
            response(err, null);
        })
    },
    getByCif : function (cif, response) {
        Account.findAll({
            include: [{
                model: Customer
            }],
            where: {
                cif: cif,
                status: 'active'
            }
        }).then(
            (customer) =>{
                response(null, customer);
            }).catch((err) => {
            response(err, null);
        })
    }
};
