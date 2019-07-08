import {Customer} from "../sequelize";

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account',{
        accountNumber: {
            field: 'account_number',
            type: DataTypes.STRING,
            primaryKey: true
        },

        balance: DataTypes.FLOAT,
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
        tableName: 'account',
        timestamps: false
    });
    return Account;
}