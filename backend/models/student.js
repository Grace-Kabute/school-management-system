import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; // Import configured sequelize instance
import Subject from './subject.js'; // Import Subject model

class Student extends Model {}

// Define the Student model
Student.init(
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
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Date of Birth',
    },
    studentID: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Unique ID for students (e.g., STU240001)',
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      comment: 'Assigned class for the student',
    },
    parentFirstname: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'First name of the parent/guardian',
    },
    parentMiddlename: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comment: 'Middle name of the parent/guardian',
    },
    parentLastname: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Last name of the parent/guardian',
    },
    parentContact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
      comment: 'Contact number of the parent/guardian',
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
      comment: 'Email of the parent/guardian',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Whether the student account is active',
    },
  },
  {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true,
    indexes: [
      {
        unique: true, // Ensure the uniqueness index on studentID is added
        fields: ['studentID'],
      },
    ],
  }
);

// Define associations
Student.hasMany(Subject, {
  foreignKey: 'studentID',
  as: 'subjects', // You can access subjects via student.subjects
});

export default Student;
