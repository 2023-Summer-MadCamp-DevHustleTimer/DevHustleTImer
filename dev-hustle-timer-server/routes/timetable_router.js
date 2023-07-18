var express = require('express');
var router = express.Router();

const { User, Event } = require('../models');
router.get('/', async function (req, res, next) {
    const deviceId = req.headers['user-agent'];
    if (!deviceId) {
        res.status(400).json({ message: 'User-Agent header is missing' });
    } else {
        try {
            const user = await User.findOne({ where: { deviceId: deviceId } });
            if (!user) {
                res.status(404).send('user not found');
            }
            else {
                const users = await User.findAll({ where: { eventId: user.eventId } });
                const totals = new Array(24 * 2 * 7).fill(0);
                
                for(i=0;i<users.length;i++){
                    console.log(users[i].possibleTime);
                    for(j=0;j<336;j++){
                        totals[j]+=parseInt(users[i].possibleTime[j]);
                    }
                }
                res.json({totalNum:users.length,totalTime:totals});
            }
        } catch (error) {
            console.error(error);
            res.status(404).send('user not found');
        }
    }
});
module.exports = router;