import app from './src/server.js';

import './src/db/mongoose.js';

const PORT = 5000 || process.env.PORT;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`server running on port ${PORT}`));
