module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer',{
        cif: {
            field: 'cif',
            type: DataTypes.STRING,
            primaryKey: true
        },
        firstName:{
            field: 'first_name',
            type: DataTypes.STRING
        },
        lastName:{
            field: 'last_name',
            type: DataTypes.STRING
        },
        username:{
            field: 'username',
            type: DataTypes.STRING
        },
        birthDate:{
            field: 'birth_date',
            type: DataTypes.STRING
        },
        email:{
            field: 'email',
            type: DataTypes.STRING
        },
        gender:DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        telephone: DataTypes.STRING,
        status: DataTypes.STRING
    },{
        tableName: 'customer',
        timestamps: false
    });

    return Customer;
}