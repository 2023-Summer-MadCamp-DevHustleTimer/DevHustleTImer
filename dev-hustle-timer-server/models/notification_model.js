const Sequelize = require('sequelize');
class Notification extends Sequelize.Model {
    static initiate(sequelize) {
        Notification.init({

            mainText: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(1000),
                allowNull: false,

            },

        }, {
            sequelize,
            modelName: 'Notification',
            tableName: 'notification',
            timestamps: true,
            paranoid: true,
        })
    }
    static associate(db) {
        db.Notification.belongsTo(db.Event, { foreignKey: 'eventId', targetKey: 'id' });
        db.Notification.belongsTo(db.User, { foreignKey: 'writerId', targetKey: 'id' });
    }
}
module.exports = Notification;