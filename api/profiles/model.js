const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  entreprise: {
    type: String,
    required: true
  },
  dates: {
    type: String
  },
  description: {
    type: String
  }
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  experience: [experienceSchema],
  skills: [String],
  information: {
    bio: String,
    localisation: String,
    siteWeb: String
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema); 