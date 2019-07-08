
module.exports = (sequelize, DataTypes) => {
    const WalletAccount = sequelize.define('walletAccount',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        walletId: {
            field: 'wallet_id',
            type: DataTypes.STRING,
        },
        accountNumber: {
            field: 'account_number',
            type: DataTypes.STRING,
        },
        status: DataTypes.STRING
    },{
        tableName: 'wallet_account',
        timestamps: false
    });

    return WalletAccount;
}