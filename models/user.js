const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            nickname: {
                types: Sequelize.STRING(10),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {
        db.User.hasMany(db.Solve);
    }
}