import {Customer} from "../sequelize";

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('wallet',{
        walletId: {
            field: 'wallet_id',
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING,
        cif: {
            field: 'cif',
            type: DataTypes.STRING,
            references: {
                model: Customer,
                key:'cif'
            }
        },
        status: DataTypes.STRING
    },{
        tableName: 'wallet',
        timestamps: false
    });

    return Wallet;
}