const Master = require('../models/Master');

const generateUniqueId = async (type) => {
  let prefix = '';

  switch (type) {
    case 'serviceCategory':
      prefix = 'ser';
      break;
    case 'blogCategory':
      prefix = 'blog';
      break;
    case 'tag':
      prefix = 'tag';
      break;
    default:
      throw new Error('Invalid type provided for unique ID generation');
  }

  // Find the latest entry for the given type
  const latestEntry = await Master.findOne({ type })
    .sort({ uniqueId: -1 })
    .select('uniqueId')
    .lean();

  let newIdNumber = 1001; // Default start

  if (latestEntry && latestEntry.uniqueId) {
    const match = latestEntry.uniqueId.match(/\d+$/); // Extract last number
    if (match) {
      newIdNumber = parseInt(match[0], 10) + 1; // Increment number
    }
  }

  return `${prefix}${newIdNumber}`;
};

module.exports = generateUniqueId;
