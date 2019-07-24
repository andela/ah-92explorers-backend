export const up = (queryInterface, Sequelize) => queryInterface.createTable('users', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  firstName: { type: Sequelize.STRING, allowNull: true },
  lastName: { type: Sequelize.STRING, allowNull: true },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    required: true,
    validate: {
      isEmail: true
    }
  },
  provider: { type: Sequelize.STRING },
  notificationsOpt: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  facebook: {
    type: Sequelize.STRING,
    allowNull: true
  },
  twitter: {
    type: Sequelize.STRING,
    allowNull: true
  },
  linkedIn: {
    type: Sequelize.STRING,
    allowNull: true
  },
  instagram: {
    type: Sequelize.STRING,
    allowNull: true
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true
  },
  accessLevel: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  timestamps: {
    allowNull: true,
    type: Sequelize.DATE
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  },
  isVerified: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  }
});

export const down = queryInterface => queryInterface.dropTable('users');
