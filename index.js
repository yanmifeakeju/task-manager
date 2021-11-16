import app from './src/server.js';
const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`server running on port ${PORT}`));
