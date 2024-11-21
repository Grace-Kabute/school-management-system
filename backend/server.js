import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import sequelize from './config/db.js';  // This is where Sequelize is initialized
import routes from './routes/index.js';
import User from './models/user.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Seed Super Admin
    await seedSuperAdmin();

    // Middleware setup
    app.use(express.json());
    app.use('/', routes);

    // 404 route
    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong' });
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Seed Super Admin function
const seedSuperAdmin = async () => {
  try {
    console.log('Checking for super admin user...');
    const superAdmin = await User.findOne({ where: { role: 'super-admin' } });
    if (!superAdmin) {
      console.log('Creating super admin user...');
      const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
      await User.create({
        firstname: 'Super',
        middlename: '',
        lastname: 'Admin',
        role: 'super-admin',
        superAdminActive: true,
        contact: '1234567890',
        email: 'superadmin@example.com',
        password: hashedPassword
      });
      console.log('Super admin user created.');
    } else {
      console.log('Super admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding super admin:', error);
  }
};

startServer();
