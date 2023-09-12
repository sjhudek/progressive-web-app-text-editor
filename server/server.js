const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// This serves the static assets from `client/` directory
app.use(express.static(path.join(__dirname, '../client')));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// This catches all routes and serves `index.html` from `client/`
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
