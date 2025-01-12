import fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';

dotenv.config();

const app = fastify();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fastify_auth';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.register(authRoutes);

app.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
