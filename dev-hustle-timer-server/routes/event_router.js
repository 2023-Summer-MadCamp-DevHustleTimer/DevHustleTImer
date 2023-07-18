var express = require('express');
var router = express.Router();
const { Event, User } = require('../models');

router.post('/create', async function (req, res, next) { // 새로운 이벤트 생성

    const agentId = req.headers['user-agent'];
    const { nickname, title, subtitle, endTime} = req.body;

    //  const endTime = req.body.endTime;
   // const endTime = new Date();


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
        let user = await User.findOne({ where: { deviceId: agentId } });
        if (!user) {
            user = await User.create({ deviceId: agentId, nickname: nickname });
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

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating event');
    }
});

router.post('/join', async function (req, res, next) {
    const deviceId = req.headers['user-agent'];
    let { nickname, eventNum } = req.body;
    console.log(deviceId);
    console.log(eventNum);
    if (typeof eventNum === 'string') {
        const parsedEventNum = parseInt(eventNum, 10);
        if (!isNaN(parsedEventNum)) {
          eventNum = parsedEventNum;
        } else {
            res.status(404).json({ message: 'code invalid' });
            return;
        }
      }
    try {
        console.log("event + "+eventNum+" "+typeof (eventNum));
        const event = await Event.findOne({ where: { eventNum: eventNum } })
        let user = await User.findOne({ where: { deviceId: deviceId } });
        
        //Todo: user.eventId is null이면 진행시켜~~
        if (!event) {
            res.status(404).json({ message: 'event not found' });
            return;
        }
        if (!user) { 
            user = await User.create({ deviceId: deviceId, nickname: nickname });
        }
        user.eventId = event.id;
        await user.save();
        res.json(event);

    } catch {
        res.status(404).json({ message: 'event not found' });
    }

});// 이벤트에 참가
router.post('/withdraw', async function (req, res, next) {
    const deviceId = req.headers['user-agent'];
    console.log(deviceId);
    // console.log(eventNum);
    try {

        const user = await User.findOne({ where: { deviceId: deviceId } });
        if (!user) {
            res.status(404).json({ message: 'user not found' });

        }
        const event = await Event.findOne({ where: { id: user.eventId } });
        if (!event) {
            res.status(404).json({ message: 'event not found' });
        }
        await user.destroy();
        res.json(event);

    } catch {
        res.status(404).json({ message: 'event not found' });
    }
}
);
//title 교체
router.patch('/title', async function(req, res, next) {
    const deviceId = req.headers['user-agent'];
    console.log(deviceId);
    let { title, subtitle } = req.body;
    console.log(subtitle);

    try {
        const user = await User.findOne({ where: { deviceId: deviceId } });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const event = await Event.findOne({ where: { id: user.eventId } });
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }

        // Update the event with the new title and subtitle
        if (title != undefined)
        event.title = title;
        if (subtitle != undefined)
        event.subtitle = subtitle;

        // Save the updated event
        await event.save();

        // Respond with success message
        res.status(200).json({ message: 'event updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
    req.io.emit('event', "킬");
});


module.exports = router;