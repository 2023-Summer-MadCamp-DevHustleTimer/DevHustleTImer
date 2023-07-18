var express = require('express');
var router = express.Router();

const { User ,Event} = require('../models');

router.get('/',async function(req,res,next){
    const deviceId = req.headers['user-agent'];
    if (!deviceId) {
        // User-Agent 정보가 없는 경우
        res.status(400).json({ message: 'User-Agent header is missing' });
    } else {
        try {
            const user = await User.findOne({ where: { deviceId: deviceId } });
            if (user) {
                const event = await Event.findOne({ where: { id: user.eventId } });
                res.json({...user.dataValues,event:event.dataValues});
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        } catch (error) {
            console.error('Sequelize query error:', error);
            res.sendStatus(500);
        }
    }
});
//patch api/me -> 나의 테이블 정보(숫자로 이루어진 배열[24*2*7 길이]임)를 주면 mysql에 갱신한다.
router.patch('/',async function(req,res,next){
    const deviceId = req.headers['user-agent'];
    if (!deviceId) {
        res.status(400).json({ message: 'User-Agent header is missing' });
    } else {
        try {
            const user = await User.findOne({ where: { deviceId: deviceId } });
            if (user) {
                var str="";
                for(i=0;i<req.body.posibleTime.length;i++){//0이 336개
                    if(req.body.timeTable[i]==1){
                        str+="1";
                    }
                    else{
                        str+="0";
                    }
                }
                user.possibleTime = str;
                await user.save();
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        } catch (error) {
            console.error('Sequelize query error:', error);
            res.sendStatus(500);
        }
    }
});

module.exports = router;