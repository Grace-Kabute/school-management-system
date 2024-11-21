import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Automatically loads environment variables

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database user
  process.env.DB_PASSWORD, // User password
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',    // Specify the dialect
    port: process.env.DB_PORT || 5432,
    logging: false,         // Disable query logging for cleaner output
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models with the database
    await sequelize.sync({ alter: true });  // Use with caution in production
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
