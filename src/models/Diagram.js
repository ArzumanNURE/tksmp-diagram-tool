const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['rectangle', 'circle', 'diamond', 'text', 'arrow'],
    required: true
  },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  text: String,
  startElement: { type: mongoose.Schema.Types.ObjectId, ref: 'Element' },
  endElement: { type: mongoose.Schema.Types.ObjectId, ref: 'Element' }
});

const VersionSchema = new mongoose.Schema({
  elements: [ElementSchema],
  createdAt: { type: Date, default: Date.now }
});

const DiagramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  versions: [VersionSchema]
});

module.exports = mongoose.model('Diagram', DiagramSchema);