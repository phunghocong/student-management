const db = require("../../models");
const mongoose = require('mongoose');

const topicController = db.topicController;
const Subcategory = db.forumSubcategory;
const Topic = db.forumTopic;
const Post = db.forumPost
const User = db.accounts;


// get info from a single topic
exports.getById = (req, res) => {
    const { id = null, sid = null, page = 1, limit = 10 } = req.query;
    const queryParams = {};
    let topicResult = {};

    if (id) {
        queryParams._id = id;
    } else if (sid) {
        queryParams.shortid = sid;
    }

    Topic.findOne({...queryParams })
        .populate({
            path: 'posts',
            options: {
                limit,
                skip: (page - 1) * limit,
                sort: { createdAt: 1 },
            },
            populate: {
                path: 'author',
            },
        })
        .lean()
        .then(topic => {
            topicResult = {...topic, currentPage: page };
            topicResult.posts.forEach(post => {
                const topicCount = post.author.topics.length;
                const postCount = post.author.posts.length;

                post.author.topicCount = topicCount;
                post.author.postCount = postCount;
            });
            return Post.countDocuments({ topic: topic._id });
        })
        .then(count => {
            topicResult.totalPages = Math.ceil(count / limit);
            return Subcategory.findById(topicResult.subcategory, 'name shortid');
        })
        .then(subcategory => {
            topicResult.subcategory = subcategory;
            return res.status(200).json(topicResult);
        })
        .catch(err =>
            res.status(400).json({ msg: 'Failed to get info of topic', err })
        );
}

// post a new topic
exports.addNewTopic = (req, res) => {
    // Create a new topic, a new post then push the id to the subcategory topics array
    // and to the user topics and posts array
    const { title, subtitle, subcategory, author, message } = req.body;
    const newTopicId = new mongoose.Types.ObjectId();
    const newPostId = new mongoose.Types.ObjectId();

    const newTopic = new Topic({
        _id: newTopicId,
        title,
        subtitle,
        subcategory,
        author,
        posts: [newPostId],
        lastpost: newPostId,
    });

    const newPost = new Post({
        _id: newPostId,
        message,
        author,
        topic: newTopicId,
    });

    newTopic
        .save()
        .then(() => {
            return newPost.save();
        })
        .then(() => {
            return Subcategory.findByIdAndUpdate(
                subcategory, {
                    $push: { topics: newTopicId },
                    $set: { lastpost: newPostId },
                }, { useFindAndModify: false }
            );
        })
        .then(() => {
            return User.findByIdAndUpdate(
                author, {
                    $push: { posts: newPostId, topics: newTopicId },
                }, { useFindAndModify: false }
            );
        })
        .then(() => res.status(200).send({ topic: newTopic }))
        .catch(err => res.json({ msg: 'Failed to add a new topic', err }));
}

// update a topic
exports.update = (req, res) => {
    Topic.findByIdAndUpdate(req.body.id, req.body, {
            useFindAndModify: false,
        })
        .then(topic => res.status(200).json({ msg: 'Topic updated', topic }))
        .catch(err =>
            res.status(400).json({ msg: 'Failed to update topic', err })
        );
}


// delete a topic
exports.delete = (req, res) => {
    const { id } = req.body;

    Topic.findByIdAndDelete(id)
        .then(topic => {
            Post.deleteMany({ topic: id })
                .then(() => {
                    return User.updateMany({ posts: { $in: topic.posts }, topics: id }, { $pullAll: { posts: topic.posts }, $pull: { topics: id } });
                })
                .then(() => {
                    res.status(200).send({ topic });
                });
        })
        .catch(err =>
            res.status(400).json({ msg: 'Failed to delete topic', err })
        );
}