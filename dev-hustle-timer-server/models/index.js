const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//add model
db.sequelize = sequelize;

const Event = require('./event_model');
const Notification = require('./notification_model');
const User = require('./user_model');
const Music = require('./music_model');
const TimeTable = require('./time_table_model');
const Message = require('./message_model');

db.Event = Event;
db.Notification = Notification;
db.User = User;
db.Music = Music;
db.TimeTable = TimeTable;
db.Message = Message;


Event.initiate(sequelize);
Notification.initiate(sequelize);
User.initiate(sequelize);
Music.initiate(sequelize);
TimeTable.initiate(sequelize);
Message.initiate(sequelize);

Event.associate(db);
Notification.associate(db);
User.associate(db);
Music.associate(db);
TimeTable.associate(db);
Message.associate(db);
//

module.exports = db;