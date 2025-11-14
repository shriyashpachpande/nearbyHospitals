import express from 'express';
import cors from 'cors';
import hospitalRoutes from './routes/hospitalRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main hospital search route
app.use('/search-hospitals', hospitalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error occurred' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
