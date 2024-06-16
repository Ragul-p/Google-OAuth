const Story = require("../models/Story");

const getAddStory = (req, res) => {
    res.render("stories/add");
}

const postAddStory = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect("/dashboard");
    } catch (error) {
        res.render("error/500");
    }
}






const getEditStory = async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id, }).lean();
        if (!story) { return res.render('error/404') }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', { story });
        }
    } catch (err) {
        return res.render('error/500')
    }
}




const postEditStory = async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean();
        if (!story) { return res.render('error/404'); }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.redirect('/dashboard')
        }
    } catch (err) {
        return res.render('error/500')
    }
}


const deleteStory = async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean();
        if (!story) { return res.render('error/404'); }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            await Story.deleteOne({ _id: req.params.id })
            res.redirect('/dashboard')
        }

    } catch (err) {
        return res.render('error/500')
    }
}






const getSingleStory = async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).populate('user').lean()
        if (!story) { return res.render('error/404') }

        if (story.user._id != req.user.id && story.status == 'private') {
            res.render('error/404')
        } else {
            res.render('stories/show', { story });
        }
    } catch (err) {
        res.render('error/404');
    }
}




const getStoriesByUser = async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId, status: 'public' }).populate('user').lean();
        res.render('stories/index', { stories });
    } catch (err) {
        res.render('error/500');
    }
}



const getAllPublicStory = async (req, res) => {
    try {
        const stories = await Story.find({ status: "public" }).populate("user").sort({ createdAt: "desc" }).lean();
        res.render("stories/index", { stories });
    } catch (error) {
        res.render("error/500");
    }
}



const getSearchStories = async (req, res) => {
    try {
        const stories = await Story.find({ title: new RegExp(req.query.query, 'i'), status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('stories/index', { stories })
    } catch (err) {
        res.render('error/404')
    }
}

module.exports = {
    getAddStory, postAddStory, getEditStory, postEditStory, deleteStory, getSingleStory,
    getStoriesByUser, getAllPublicStory, getSearchStories
};