// routes/masterRoutes.js
const express = require('express');
const {
  addEntry,
  getEntriesByType,
  getAllEntries,
  updateEntry,
  softDeleteEntry,
} = require('../controllers/MasterController');

const router = express.Router();

router.post('/masterCreate', addEntry);
router.get('/masterByType/:type', getEntriesByType);
router.get('/masterAll', getAllEntries);
router.put('/masterUpdate/:uniqueId', updateEntry);
router.delete('/masterDelete/:uniqueId', softDeleteEntry);

module.exports = router;
