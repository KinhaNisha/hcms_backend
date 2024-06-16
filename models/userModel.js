module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 100]
            }
        },
        role: {
            type: DataTypes.ENUM('patient', 'doctor', 'admin'), 
            allowNull: false,
            validate: {
                isIn: [['patient', 'doctor', 'admin']]
            }
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return User;
};
