var express = require('express');
var router = express.Router();
const { Event, User } = require('../models');

router.post('/create', async function (req, res, next) { // 새로운 이벤트 생성

    const agentId = req.headers['user-agent'];
    const { nickname, title, subtitle, } = req.body;

    //  const endTime = req.body.endTime;
    const endTime = new Date();


    // 기존 eventNum 값들을 가져옵니다.
    const existingEventNums = await Event.findAll({ attributes: ['eventNum'] });

    // 사용되지 않은 eventNum을 찾기 위해 Set을 활용합니다.
    const usedEventNums = new Set(existingEventNums.map(event => event.eventNum));

    // 가능한 모든 eventNum 값들을 포함한 배열을 생성합니다.
    const allEventNums = Array.from({ length: 1000 }, (_, index) => index);

    // 사용되지 않은 eventNum들을 필터링합니다.
    const unusedEventNums = allEventNums.filter(eventNum => !usedEventNums.has(eventNum));

    // 무작위로 하나의 unusedEventNum을 선택합니다.
    const newEventNum = unusedEventNums[Math.floor(Math.random() * unusedEventNums.length)];


    try {
        let user = await User.findOne({ where: { deviceId: agentId + "1" } });
        if (!user) {
            user = await User.create({ deviceId: agentId + "1", nickname: nickname });
        }
        //Todo: user.eventId is null이면 진행시켜~~
        const event = await Event.create({
            eventNum: newEventNum,
            nickname: nickname,
            endTime: endTime,
            title: title,
            subtitle: subtitle,
            hostId: user.id
        });
        user.eventId = event.id;
        await user.save();

        res.send('Event created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating event');
    }
});

module.exports = router;