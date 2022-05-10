const mars = require('./app');


const port = process.env.port || 600

mars.listen(port,()=>{console.log(`Listening on ${port}...`);});