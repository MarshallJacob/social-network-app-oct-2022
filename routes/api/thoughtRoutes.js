const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// main route for showing user thoughts /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
// the route for showing thought reactions api/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
// route to select specific reactions to be able to update or delete api/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

// select a specific thought by id /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);



module.exports = router;
