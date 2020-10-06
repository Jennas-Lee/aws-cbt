const Sequelize = require('sequelize');

module.exports = class Problem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            idx: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            question: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            view_a: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            view_b: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            view_c: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            view_d: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            answer: {
                type: Sequelize.CHAR,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Problem',
            tableName: 'problems',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db);
}