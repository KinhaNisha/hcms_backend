module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("patient", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        medicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    Patient.associate = (models) => {
        Patient.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Patient;
};
