module.exports = (sequelize, DataTypes) => {

    const SupermarketInfo = sequelize.define("supermarketInfo", {
        image: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        opening_hours: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.STRING
        }
    
    })
    return SupermarketInfo
}