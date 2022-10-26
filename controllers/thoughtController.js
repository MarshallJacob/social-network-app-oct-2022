// pull in models from thought and user
const { Thought, User } = require('../models');

module.exports = {
    // retrieve all thoughts, one thought and the create new thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thought: dbThoughtData._id }},
                    { new: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No user found with this id!' });
                            return;
                        }
                        res.json(dbThoughtData)
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },
    // revise existing thoughts, delete thoughts, add rections and delete reactions
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, {new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found. Think harder!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body }}, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found. Think harder!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate (
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId }}},
            { new: true })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};
