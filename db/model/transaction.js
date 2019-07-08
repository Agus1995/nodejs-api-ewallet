module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date:{
            type: DataTypes.DATE,
        },
        debet:{
            field: 'debet',
            type: DataTypes.STRING
        },
        credit:{
            type: DataTypes.STRING
        },
        amount:{
            type: DataTypes.FLOAT
        },
        transactionId:{
            field: 'transaction_id',
            type : DataTypes.STRING
        }
    },{
        tableName: 'transaction',
        timestamps: false
    });

    return Transaction;
}