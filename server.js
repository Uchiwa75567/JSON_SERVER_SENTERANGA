require('dotenv').config();
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Add CORS middleware
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Use default middlewares (logger, static, etc.)
server.use(middlewares);

// Use default router
server.use('/api', router);

// Root endpoint
server.get('/', (req, res) => {
  res.json({ 
    message: 'SENTERANGA Backend API',
    version: '1.0.0',
    endpoints: 'http://localhost:3004/api/users, /api/products, /api/seeds, etc.'
  });
});

// Start server
const PORT = process.env.PORT || 3004;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SENTERANGA Backend running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`🗄️  Database: db.json`);
});
