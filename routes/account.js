import express from 'express';
import Account from '../service/account';
import Transaction from '../service/transaction'
import CommonResponse from "../dto/CommonResponse";


const AccountRoute = express.Router();

AccountRoute.get('/accounts', (req, res, next) => {
    let filter = {};
    filter.status = 'ACTIVE';
    if (req.query.accountNumber){
        filter.accountNumber = req.query.accountNumber;
    }
    if (req.query.cif){
        filter.cif = req.query.cif;
    }
    if (req.query.balance){
        filter.balance = req.query.balance;
    }
    if (req.query.status){
        filter.status = req.query.status;
    }
    if (req.query.name){
        filter.name = req.query.name;
    }
    Account.getList(filter, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }else if (result == null){
            res.json(new CommonResponse('03', `Id ${req.params.id} Not Found`, null))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

AccountRoute.get('/account/customer/:cif', (req, res, next) => {
    Account.getByCif(req.params.cif, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }else if (result == null){
            res.json(new CommonResponse('03', `Id ${req.params.id} Not Found`, null))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

AccountRoute.post('/account', (req, res, next) => {
    Account.add(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

AccountRoute.put('/account', (req, res, next) => {
    Transaction.closeAccount(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});




export default AccountRoute;