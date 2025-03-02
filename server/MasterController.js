// controllers/MasterController.js
const Master = require('../models/MasterModel');
const generateUniqueId = require('../utils/generateUniqueId');

exports.addEntry = async (req, res) => {
  try {
    const { type, name } = req.body;
    if (!['tag', 'serviceCategory', 'blogCategory'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const trimmedName = name.toLowerCase().trim();
    const existingEntry = await Master.findOne({ type, name: trimmedName });
    if (existingEntry) {
      return res.status(400).json({ success: false, message: 'Duplicate entry within the same type' });
    }

    const newEntry = new Master({
      type,
      name: trimmedName,
      uniqueId: generateUniqueId(type),
    });
    await newEntry.save();

    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEntriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!['tag', 'serviceCategory', 'blogCategory'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const entries = await Master.find({ type, isDeleted: false });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllEntries = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type, isDeleted: false } : { isDeleted: false };

    const entries = await Master.find(filter);
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { name } = req.body;
    const trimmedName = name.toLowerCase().trim();

    const entry = await Master.findOneAndUpdate(
      { uniqueId, isDeleted: false },
      { name: trimmedName },
      { new: true }
    );
    
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found or deleted' });
    }
    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.softDeleteEntry = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const entry = await Master.findOneAndUpdate(
      { uniqueId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found or already deleted' });
    }
    res.status(200).json({ success: true, message: 'Soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
