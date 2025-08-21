const router = require('express').Router();

const { getStates } = require('../controllers/state.controller');

router.get('/autocomplete', async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const query = req.query.query || '';

  const data = await getStates(limit, offset, query);
  res.status(200).json(data);
});

module.exports = router;
