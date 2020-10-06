const Sequelize = require('sequelize');

module.exports = class Solve extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            idx: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            q_data: {
                type: Sequelize.JSON,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Solve',
            tableName: 'solves',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db);
}