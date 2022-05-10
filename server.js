const app = require("./app");
require('dotenv/config');

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port: ${process.env.PORT}`));