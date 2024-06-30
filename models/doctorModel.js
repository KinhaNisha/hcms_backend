module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("doctor", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Doctor;
};
