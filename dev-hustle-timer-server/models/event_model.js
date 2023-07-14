const Sequelize = require('sequelize');
class Event extends Sequelize.Model {
    static initiate(sequelize) {
        Event.init({
            eventNum: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            subtitle: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Event',
            tableName: 'event',
            timestamps: true,
        });
    }
    static associate(db) {
        db.Event.hasMany(db.Notification, { foreignKey: 'eventId', sourceKey: 'id' });
        db.Event.hasMany(db.User, { foreignKey: 'eventId', sourceKey: 'id' })
        db.Event.hasMany(db.Music, { foreignKey: 'eventId', sourceKey: 'id' });
        db.Event.hasMany(db.TimeTable, { foreignKey: 'eventId', sourceKey: 'id' });
        db.Event.hasMany(db.Message, { foreignKey: 'eventId', sourceKey: 'id' });
    }
}
module.exports = Event;
