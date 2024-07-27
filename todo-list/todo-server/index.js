const server = require('./backend/server'); //a express import


const HOST = 'localhost';
const PORT = 8888;



server.listen(PORT, () => console.log(`server Running at ${HOST}:${PORT}`))