const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

const PORT = 8000;
app.listen(PORT, (err) => {
    if(err) {
        console.error(err);
        return process.exit(1);
    }

    console.log(`Server is listening in port ${PORT}`);
});