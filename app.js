const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();
let cookieParser = require('cookie-parser')

const port = process.env.PORT;

app.use(cookieParser())
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
