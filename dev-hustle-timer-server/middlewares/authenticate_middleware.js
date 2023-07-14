async function authenticateMacId(req, res, next) {
    const macId = req.body.deviceId;
    try {
        const macIdExists = await User.findOne({ deviceId: deviceId });
        if (macIdExists) {
            req.me = macIdExists;
            next();
        } else {
            console.log("Invalid MacId");
            return res.status(401).json({ message: "Invalid MacId" });
        }
    } catch (err) {
        console.error("middle : " + err.toString());
        return res.status(401).json({ message: "Error   occurred" });
    }
}

module.exports = authenticateMacId;
