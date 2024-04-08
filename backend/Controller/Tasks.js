const User = require("../Schemas/UserSchema")

const loginByNumber = async (req, res) => {
    try {
        const users = await User.find({ number: req.body.number });
        const user = users[0];
        if (!user) {
            return res.status(404).send("User not found");
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.send("Could not login");
    }
}

const loginByToken = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (e) {
        res.send("Could not login");
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send("Logged out");
    } catch (e) {
        res.send("Could not logout");
    }
}

module.exports = {loginByNumber,logout,loginByToken}