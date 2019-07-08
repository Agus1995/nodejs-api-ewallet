module.exports = (sequelize, DataTypes) => {
    const TransactionType = sequelize.define('transactionType',{
        transactionId: {
            field: 'transaction_id',
            type: DataTypes.STRING,
            primaryKey: true
        },
        description: DataTypes.STRING
    },{
        tableName: 'transaction_type',
        timestamps: false
    });
    return TransactionType;
}