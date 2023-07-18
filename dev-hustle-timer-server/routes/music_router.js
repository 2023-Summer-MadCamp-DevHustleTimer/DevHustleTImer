var express = require('express');
var router = express.Router();
const { User, Event, Music } = require('../models');

router.get('/', async function (req, res) {
  console.log("GET /api/music logic");
  const deviceId = req.headers['user-agent'];
  try {
    const user = await User.findOne({ where: { deviceId: deviceId } });
    if (!user){
      return res.status(404).json({ message: 'user not found!' });
    }
    const playList = await Music.findAll({where: { eventId: user.eventId}});
    if (!playList){
      return res.status(404).json({ message: 'playList not found!' });
    }
    res.json({data: playList});

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'user not found' });
  }
});

// Post: 플레이스트 받고 갱신하기
// JSON 형식으로 받기
// ex: {data: [{index:1, videoId: aadssdas}, {index:2, videoId: aadssdas}, ...]}

router.post('/', async function (req, res) {
  console.log("POST /api/music logic");
  const deviceId = req.headers['user-agent'];
  try {
    const user = await User.findOne({ where: { deviceId: deviceId } });
    if (!user){
      return res.status(404).json({ message: 'user not found!' });
      
    }
    const result = await Music.destroy({ where: { eventId: user.eventId }});
    if(!req.body.data){
      return res.status(404).json({ message: 'no playlist passed...' });
    }
    req.body.data.forEach((value) => {
      Music.create({
        videoId: value.videoId,
        position: value.index,
        eventId: user.eventId,
      })
    });
    return res.status(201).json({ message: "playList updated!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(401).json({ message: 'user not found' });
  }
});

module.exports = router;
