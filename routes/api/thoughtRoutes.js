const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

router.route('/api/Thoughts')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router.route('/api/Thoughts/:ThoughtId')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/api/thoughts/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router.route('/api/thoughts/:thoughtId/reactions/:reactionsId')
  .delete(thoughtController.removeReaction);

module.exports = router;
