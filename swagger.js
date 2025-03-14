const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion de Profils',
      version: '1.0.0',
      description: 'Une API RESTful pour gérer des profils utilisateurs avec leurs expériences, compétences et relations',
      contact: {
        name: 'Support API',
        email: 'support@api-profiles.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Profile: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique du profil'
            },
            name: {
              type: 'string',
              description: 'Nom de l\'utilisateur'
            },
            email: {
              type: 'string',
              description: 'Email de l\'utilisateur'
            },
            experience: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    description: 'ID unique de l\'expérience'
                  },
                  titre: {
                    type: 'string',
                    description: 'Titre du poste'
                  },
                  entreprise: {
                    type: 'string',
                    description: 'Nom de l\'entreprise'
                  },
                  dates: {
                    type: 'string',
                    description: 'Période de l\'expérience'
                  },
                  description: {
                    type: 'string',
                    description: 'Description de l\'expérience'
                  }
                }
              }
            },
            skills: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Liste des compétences'
            },
            information: {
              type: 'object',
              properties: {
                bio: {
                  type: 'string',
                  description: 'Biographie de l\'utilisateur'
                },
                localisation: {
                  type: 'string',
                  description: 'Localisation de l\'utilisateur'
                },
                siteWeb: {
                  type: 'string',
                  description: 'Site web de l\'utilisateur'
                }
              }
            },
            friends: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Liste des IDs des amis'
            },
            isDeleted: {
              type: 'boolean',
              description: 'Indique si le profil est supprimé'
            },
            dateCreation: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création du profil'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./api/profiles/index.js', './routes.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs }; 