const express = require('express');
const router = express.Router();
const Diagram = require('../models/Diagram');

// Create new diagram
router.post('/', async (req, res) => {
  try {
    const diagram = new Diagram({
      name: req.body.name,
      versions: [{
        elements: req.body.elements
      }]
    });
    await diagram.save();
    res.status(201).json(diagram);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all diagrams
router.get('/', async (req, res) => {
  try {
    const diagrams = await Diagram.find();
    res.json(diagrams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get specific diagram with versions
router.get('/:id', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ error: 'Diagram not found' });
    res.json(diagram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save new version
router.post('/:id/versions', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ error: 'Diagram not found' });
    
    diagram.versions.push({
      elements: req.body.elements
    });
    await diagram.save();
    res.status(201).json(diagram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;