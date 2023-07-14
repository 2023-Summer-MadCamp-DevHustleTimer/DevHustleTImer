const Sequelize = require('sequelize');
class TimeTable extends Sequelize.Model {
    static initiate(sequelize) {
        TimeTable.init({
            title: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'TimeTable'
            ,
            tableName: 'timeTable',
            timestamps: true,

        });
    }
    static associate(db) {
        db.TimeTable.belongsTo(db.Event, { foreignKey: 'eventId', targetKey: 'id' });
    }
}
module.exports = TimeTable;