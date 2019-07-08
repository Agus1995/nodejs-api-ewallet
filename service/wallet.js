import {Account, Customer, Wallet, WalletAccount, Op} from '../db/sequelize'
import "babel-polyfill";

module.exports = {
    addWallet : function (body, response) {
        if (body.customer) {
            body.cif = body.customer.cif;
        }
        let numb = Math.floor(Math.random() * Math.floor(100000));
        let id = 'WL-'+numb;
        body.walletId = id;
        Wallet.create(body).then(
            (customer) =>{
                response(null, customer);
            }).catch((err) => {
            response(err, null);
        })
    },
    getWalByCif: function (cif, response) {
        Wallet.findAll({
            where:{
                cif: cif
            }
        }).then(
            (wal) => {
                response(null, wal)
            }
        ).catch((err)=>{
            response(err, null)
        })
    },
    regisWallet: async function (body, response) {
        // console.log(body.account.accountNumber);
        // console.log(body.wallet.walletId);
        // console.log(body)
        body.walletId = body.wallet.walletId;
        body.accountNumber = body.account.accountNumber;
        let walAccount = await  WalletAccount.findOne({
            where: {
                walletId : body.walletId,
                accountNumber : body.accountNumber
            }
        }).catch(console.log);
        if (walAccount != null){
            response(`wallet ${body.walletId} and account ${body.accountNumber} are registered`)
        }else {
            WalletAccount.create(body).then(
                (regis) => {
                    response(null, regis)
                }
            ).catch((err) => {
                response(err, null)
            })
        }

    },
    getRegistered: async function (cif, response) {
        let acc = await Account.findAll({where:{cif:cif}});
        let numb = [];
        acc.forEach(function (element) {
          numb.push(element.accountNumber)
        });
        //console.log(numb);
        let reg = await WalletAccount.findAll({
            where: {
                accountNumber: numb
            },
            include: [
                {model: Wallet},
                {model: Account}
            ]
        }).catch(console.log);
       // console.log(reg.account);
        response(null, reg);
    },
    getByWalletId: function (walletId, response) {
        WalletAccount.findAll({
            where: {
                walletId: walletId
            },
            include: [{
                model: Account
            }],
        }).then(
            (rest) => {
                response(null, rest)
            }
        ).catch((err) => {
            response(err, null)
        })
    },
    unreg: function (body, response) {
        WalletAccount.destroy({
            where: {
                walletId: body.walletId,
                accountNumber: body.accountNumber
            }
        }).then(
            (rest) => {
                response(null, rest)
            }
        ).catch((err)=>{
            response(err, null)
        })
    },
    deleteWallet: async function (id, response) {
        let regis = await WalletAccount.findAll({where:{walletId: id}});
        console.log(regis);
        if (regis.length > 0){
            response('Your wallet are registered')
        } else {
            let des = Wallet.destroy({where: {walletId: id}}).catch((err) => {response(err, null)});
            response(null, des);
        }
    }
}
