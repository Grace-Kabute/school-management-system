import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Subject extends Model {}

// Define the Subject model
Subject.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    studentId: {  // Use studentId as the foreign key
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Subject',
    tableName: 'subjects',
    timestamps: true,
  }
);

export default Subject;
