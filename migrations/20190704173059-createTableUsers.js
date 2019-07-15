 export const up = (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
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
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    accessLevel: {
      type: Sequelize.INTEGER,
      defaultValue: '0'
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
  
export const down = (queryInterface, Sequelize) => queryInterface.dropTable('users');
