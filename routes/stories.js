const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const { ensureAuth } = require("../middleware/auth");
const { getAddStory, postAddStory, getEditStory, postEditStory, deleteStory, getSingleStory,
    getStoriesByUser, getAllPublicStory, getSearchStories
} = require("../controller/stories");



router.get("/add", ensureAuth, getAddStory);
router.post("/", ensureAuth, postAddStory);


router.get("/edit/:id", ensureAuth, getEditStory);
router.put('/:id', ensureAuth, postEditStory)


router.delete('/:id', ensureAuth, deleteStory)


router.get('/:id', ensureAuth, getSingleStory);


router.get('/user/:userId', ensureAuth, getStoriesByUser)

router.get("/", ensureAuth, getAllPublicStory);


router.get('/search/:query', ensureAuth, getSearchStories)

module.exports = router;