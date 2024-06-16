

const logout = (req, res) => {

    req.logout((err) => {
        if (err) { return res.render("error/500") }
        res.redirect("/");
    });

}
module.exports = { logout };