const express = require('express');
const cors = require('cors');

const app = express();

// Port
const PORT = process.env.PORT || 8080;

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRouter = require('./routes/userRoutes');
app.use('/api/v1/users', userRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
