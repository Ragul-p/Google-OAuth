const Story = require("../models/Story");

const getLogin = (req, res) => {
    return res.render("login", { layout: "login" });
}


const getDashboard = async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render("dashboard", { name: req.user.firstName, stories });
    } catch (error) {
        res.render("error/500");
    }
}




module.exports = { getLogin, getDashboard };