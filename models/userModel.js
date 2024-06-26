const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
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
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10] 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                // len: [8, 50]
            }
        },
        DOB: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.ENUM('patient', 'doctor'), 
            allowNull: false,
            validate: {
                isIn: [['patient', 'doctor']]
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async (user) => {
              const salt = await bcrypt.genSaltSync(12);
              user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user) => {
              if (user.changed('password')) {
                const salt = await bcrypt.genSaltSync(12);
                user.password = await bcrypt.hash(user.password, salt);
              }
            }
          }
    });

    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};
