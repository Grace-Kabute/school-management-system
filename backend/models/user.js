import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; // Import configured sequelize instance

class User extends Model {}

// Define the User model
User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM('super-admin', 'headteacher', 'teacher', 'student'),
      allowNull: false,
      defaultValue: 'student',
    },
    superAdminActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    staffID: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Unique ID for staff members (e.g., STA240001)',
    },
    needsPasswordChange: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.role === 'super-admin') {
          user.superAdminActive = true; // Activate super-admin on creation
        }
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['staffID'],
      },
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
);

export default User;
