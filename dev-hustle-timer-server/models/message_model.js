const Sequelize = require('sequelize');

class Message extends Sequelize.Model {
    static initiate(sequelize) {
        Message.init(
            {
                text: {
                    type: Sequelize.STRING(1000),
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Message',
                tableName: 'message',
                timestamps: true,
            }
        );
    }

    static associate(db) {
        db.Message.belongsTo(db.Event, { foreignKey: 'eventId', targetKey: 'id' });
        db.Message.belongsTo(db.User, { foreignKey: 'writerId', targetKey: 'id' });
    }
}

module.exports = Message;
