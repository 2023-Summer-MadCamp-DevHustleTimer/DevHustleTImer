var express = require('express');
var router = express.Router();
const { Message, Event, User } = require('../models');
router.get('/', async function (req, res, next) {
    const deviceId = req.headers['user-agent'];
    try {
        const user = await User.findOne({ where: { deviceId: deviceId } });
        const event = await Event.findOne({ where: { id: user.eventId } });
        if (!user){
            res.status(404).json({ message: 'user not found1' });
            return;
        }
        if(!event){
            res.status(404).json({ message: 'event not found' });
            return;
        }
        const messages = await Message.findAll({ where: { eventId: user.eventId } });
        console.log("mess");

        var modifiedMessages = [];
        var modifiedMessage;
        for (const message of messages) {
            const writer = await User.findOne({ where: { id: message.writerId } });
            if (message.writerId !== user.id) {
                modifiedMessage = { ...message.dataValues, me: false, writer:writer.dataValues};
            
            } else {
                modifiedMessage = { ...message.dataValues, me: true, writer:writer.dataValues};
                
            }
            // console.log(modifiedMessage);
            modifiedMessages.push(modifiedMessage);
        }
        res.json(modifiedMessages);
    } catch (error) {
        res.status(404).json({ message: 'user not found' });
    }
});
router.post('/', async function (req, res, next) {

    
    

    const { text } = req.body;
    const deviceId = req.headers['user-agent'];
    try {
        const user = await User.findOne({ where: { deviceId: deviceId } });
        const event = await Event.findOne({ where: { id: user.eventId } });
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            const message = await Message.create({
                text: text,
                eventId: user.eventId,
                writerId: user.id
            });
            res.json(message);
        }
    } catch (error) {
        res.status(404).json({ message: 'user not found' });
    }
    ///새로운 메세지가 업데이트 되면 이벤트를 보내줘야함
    req.io.emit('message', "킬");
});
module.exports
    = router;