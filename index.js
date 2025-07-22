const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const courseRoutes = require('./routes/course.routes')
const progressRoutes = require('./routes/progress.routes')

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    app.get('/', (req, res) => {
      res.send(' route works!');
    });
    
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/progress', progressRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();