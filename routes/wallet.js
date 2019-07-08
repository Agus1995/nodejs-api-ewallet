import express from 'express';
import Account from '../service/account';
import Wallet from '../service/wallet'
import Transaction from '../service/transaction';
import CommonResponse from "../dto/CommonResponse";


const WalletRoute = express.Router();

WalletRoute.post('/wallet/add', (req, res, next) => {
    Wallet.addWallet(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.get('/wallet/customer/:cif', (req, res, next) => {
    Wallet.getWalByCif(req.params.cif, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.get('/wallet/account/:cif', (req, res, next) => {
    Wallet.getRegistered(req.params.cif, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.get('/wallet/wallet/:id', (req, res, next) => {
    Wallet.getByWalletId(req.params.id, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.post('/wallet/account', (req, res, next) => {
    Wallet.regisWallet(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.post('/wallet', (req, res, next) => {
    Wallet.unreg(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});
WalletRoute.delete('/wallet/:id', (req, res, next) => {
    Wallet.deleteWallet(req.params.id, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});


export default WalletRoute;