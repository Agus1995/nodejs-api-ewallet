import {Account, Customer, Transaction, TransactionType, Op} from '../db/sequelize'
import {updateBalance} from './account'

module.exports = {
    topUp : function (body, response) {
        body.transactionId = '001';
        Account.findByPk(body.credit).then(
            (account)=> {
                account.balance = account.balance + body.amount;
                updateBalance(account, function (error, result) {
                    if (error){
                        response(error, null)
                    } else if (result){
                        console.log(result)
                        Transaction.create(body).then(
                            (trans) =>{
                                response(null, trans)
                            }
                        ).catch((err) => {
                            response(err, null)
                        })
                    }
                })
            }
        ).catch((err)=>{
            response(err, null)
        })
    },
    withdrawl : function (body, response) {
        body.transactionId = '002';
        Account.findByPk(body.debet).then(
            (account)=> {
                account.balance = account.balance - body.amount;
                if (account.balance >= 100000) {
                    updateBalance(account, function (error, result) {
                        if (error){
                            response(error, null)
                        } else if (result){
                            console.log(result)
                            Transaction.create(body).then(
                                (trans) =>{
                                    response(null, trans)
                                }
                            ).catch((err) => {
                                response(err, null)
                            })
                        }
                    })
                }else {
                    response('Your Balance is Not Enough', null)
                }
            }
        ).catch((err)=>{
            response(err, null)
        })
    },
    transfer : function (body, response) {
        body.transactionId = '003';
        Account.findByPk(body.credit).then(
            (accountCredit) => {
                if (accountCredit){
                    Account.findByPk(body.debet).then(
                        (accountDebit) => {
                            accountDebit.balance = accountDebit.balance - body.amount;
                            accountCredit.balance = accountCredit.balance + body.amount;
                            if (accountDebit.balance >= 100000){
                                updateBalance(accountDebit, function (error, result) {
                                    if (error){
                                        response(error, null);
                                    } else if (result){
                                        Transaction.create(body).then(
                                            (trans) => {
                                                updateBalance(accountCredit, function (err, rest) {
                                                    if (err){
                                                        response(err, null)
                                                    }
                                                });
                                                response(null, trans);
                                            }
                                        ).catch((err) => {
                                            response(err, null);
                                        })
                                    }
                                })
                            } else {
                                response('Your Balance Is Not enough')
                            }
                        }
                    )
                } else {
                    response('Destination Number Not Found')
                }
            }
        )
    },
    closeAccount : function (body, response) {
        body.transactionId = '007';
        if (body.credit === body.debet){
            response('enter diferent account')
        } else {
            Account.findByPk(body.credit).then(
                (accountCredit) => {
                    if (accountCredit) {
                        Account.findByPk(body.debet).then(
                            (accountDebit) => {
                                accountDebit.status = 'trash';
                             //   accountDebit.balance = accountDebit.balance - body.amount;
                                accountCredit.balance = accountCredit.balance + accountDebit.balance;

                                updateBalance(accountDebit, function (error, result) {
                                    if (error) {
                                        response(error, null);
                                    } else if (result) {
                                        Transaction.create(body).then(
                                            (trans) => {
                                                updateBalance(accountCredit, function (err, rest) {
                                                    if (err) {
                                                        response(err, null)
                                                    }
                                                });
                                                response(null, trans);
                                            }
                                        ).catch((err) => {
                                            response(err, null);
                                        })
                                    }
                                })

                            }
                        )
                    } else {
                        response('Destination Number Not Found')
                    }
                }
            )
        }
    },
    getList: function (id, response) {
        Transaction.findAll({
            include: [{
                model: TransactionType
            }],
            where:{
                [Op.or]:[{debet: id}, {credit: id}]
            }
        }).then(
            (trans) => {
                response(null, trans);
            }
        ).then((err)=>{
            response(err, null)
        })
    }
}
