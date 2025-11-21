require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const linkController = require('./controllers/linkControllers');

const PORT = process.env.PORT || 8003;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { });
    console.log('Connected to MongoDB');

    // Redirect route (must be after APIs to avoid conflict)
    app.get('/:code', linkController.redirectByCode);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

