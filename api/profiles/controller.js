const Profile = require('./model');

// Récupérer tous les profils
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ isDeleted: false });
    res.json(profiles);
  } catch (err) {
    console.error('Erreur lors de la récupération des profils:', err);
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un profil par ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err);
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau profil
exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      information: req.body.information || {}
    });
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.error('Erreur lors de la création du profil:', err);
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un profil
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    
    if (req.body.name) profile.name = req.body.name;
    if (req.body.email) profile.email = req.body.email;
    if (req.body.information) {
      profile.information = {
        ...profile.information,
        ...req.body.information
      };
    }
    
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du profil:', err);
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un profil (soft delete)
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    profile.isDeleted = true;
    await profile.save();
    res.json({ message: 'Profil supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du profil:', err);
    res.status(500).json({ message: err.message });
  }
};

// Ajouter une expérience
exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    profile.experience.push({
      titre: req.body.titre,
      entreprise: req.body.entreprise,
      dates: req.body.dates,
      description: req.body.description
    });

    const updatedProfile = await profile.save();
    res.status(201).json(updatedProfile);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'expérience:', err);
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une expérience
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    const experienceIndex = profile.experience.findIndex(exp => exp._id.toString() === req.params.exp);
    if (experienceIndex === -1) {
      return res.status(404).json({ message: 'Expérience non trouvée' });
    }

    profile.experience.splice(experienceIndex, 1);
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'expérience:', err);
    res.status(400).json({ message: err.message });
  }
};

// Ajouter une compétence
exports.addSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    const skill = req.body.skill;
    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la compétence:', err);
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une compétence
exports.removeSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    const skillIndex = profile.skills.indexOf(req.params.skill);
    if (skillIndex === -1) {
      return res.status(404).json({ message: 'Compétence non trouvée' });
    }

    profile.skills.splice(skillIndex, 1);
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    console.error('Erreur lors de la suppression de la compétence:', err);
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour les informations
exports.updateInformation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    profile.information = {
      ...profile.information,
      ...req.body
    };

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ajouter un ami
exports.addFriend = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    const friend = await Profile.findOne({ _id: req.params.friendId, isDeleted: false });
    if (!friend) {
      return res.status(404).json({ message: 'Ami non trouvé' });
    }

    // Vérifier si l'ami est déjà dans la liste
    if (!profile.friends.includes(req.params.friendId)) {
      profile.friends.push(req.params.friendId);
    }

    const updatedProfile = await profile.save();
    res.status(201).json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un ami
exports.deleteFriend = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    const friendIndex = profile.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      return res.status(404).json({ message: 'Ami non trouvé' });
    }

    profile.friends.splice(friendIndex, 1);
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer la liste des amis
exports.getFriends = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, isDeleted: false })
      .populate('friends', 'name email _id');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    
    res.json(profile.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rechercher des profils
exports.searchProfiles = async (req, res) => {
  try {
    const { skills, localisation, name } = req.query;
    let query = { isDeleted: false };

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (localisation) {
      query['information.localisation'] = { $regex: localisation, $options: 'i' };
    }

    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }

    const profiles = await Profile.find(query);
    res.json(profiles);
  } catch (err) {
    console.error('Erreur lors de la recherche de profils:', err);
    res.status(500).json({ message: err.message });
  }
}; 