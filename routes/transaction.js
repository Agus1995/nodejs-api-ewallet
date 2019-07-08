import express from 'express';
import Account from '../service/account'
import Transaction from '../service/transaction'
import CommonResponse from "../dto/CommonResponse";


const TransactionRoute = express.Router();

TransactionRoute.post('/transaction/topup', (req, res, next) => {
    Transaction.topUp(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

TransactionRoute.post('/transaction/withdraw', (req, res, next) => {
    Transaction.withdrawl(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

TransactionRoute.post('/transaction/transfer', (req, res, next) => {
    Transaction.transfer(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});

TransactionRoute.get('/transaction/:id', (req, res, next) => {
    Transaction.getList(req.params.id, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});


export default TransactionRoute;