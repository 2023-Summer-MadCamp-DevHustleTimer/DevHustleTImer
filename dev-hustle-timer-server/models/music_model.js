const Sequelize = require('sequelize')
class Music extends Sequelize.Model{
    static initiate(sequelize){
        Music.init({
            position:{
                type: Sequelize.INTEGER,
                allowNull: false,
            }
    },{
        sequelize,
        modelName: 'Music',
        tableName: 'music',
        timestamps: true,
        paranoid: true,
    })

    }
    static associate(db){
        db.Music.belongsTo(db.Event, {foreignKey: 'eventId', targetKey: 'id'});
        db.Music.belongsTo(db.User, {foreignKey: 'writerId', targetKey: 'id'});
    }
}
module.exports = Music;