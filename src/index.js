const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

// Application setup
const app = express();
const url = 'http://localhost';

// Configure application port
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

// Middlewares
app.use(cors({
    origin: 'https://web-app-with-custom-api-integration.vercel.app' // Especifica el origen permitido
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import and use routers
const indexRoutes = require('../routes/index');
app.use('/', indexRoutes);

const frasesRouter = require('../routes/frases');
app.use('/api', frasesRouter);

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server running at ${url}:${app.get('port')} online`);
});
