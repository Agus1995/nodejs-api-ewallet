const Sequelize = require('sequelize');
const CustomerModel = require('./model/customer');
const AccountModel = require('./model/account')
const TransactionModel = require('./model/transaction');
const WalletModel = require('./model/wallet');
const WalletAccountModel = require('./model/walletAccount');
const TransactionTypeModel = require('./model/transactionType')
const Op = Sequelize.Op;

const sequelize = new Sequelize('db-ebanking', 'root', '3sk10000*', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Wallet = WalletModel(sequelize, Sequelize);
const WalletAccount = WalletAccountModel(sequelize, Sequelize);
const TransactionType = TransactionTypeModel(sequelize, Sequelize);

TransactionType.hasMany(Transaction, {
    foreignKey: 'transactionId'
});

Transaction.belongsTo(TransactionType, {
    foreignKey: 'transactionId'
});

Account.hasMany(WalletAccount,{
   foreignKey: 'accountNumber'
});

WalletAccount.belongsTo(Account,{
    foreignKey: 'accountNumber'
})

Wallet.hasMany(WalletAccount, {
    foreignKey: 'walletId'
});

WalletAccount.belongsTo(Wallet,{
   foreignKey: 'walletId'
});

Account.belongsTo(Customer,{
    foreignKey: 'cif'
});
Customer.hasMany(Account,{
    foreignKey: 'cif'
});

module.exports = {
    Customer,
    Account,
    Transaction,
    TransactionType,
    Wallet,
    WalletAccount,
    Op
};