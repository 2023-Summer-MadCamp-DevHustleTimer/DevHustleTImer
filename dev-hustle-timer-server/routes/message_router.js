var express = require('express');
var router = express.Router();
const { Message, Event, User } = require('../models');
router.get('/', async function (req, res, next) {
    const deviceId = req.headers['user-agent'];
    try {
        const user = await User.findOne({ where: { deviceId: deviceId } });
        const event = await Event.findOne({ where: { id: user.eventId } });
        if (!user) res.status(404).json({ message: 'user not found' });
        if(!event) res.status(404).json({ message: 'event not found' });
        const messages = await Message.findAll({ where: { eventId: user.eventId } });
        res.json(messages);
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
});
module.exports
    = router;