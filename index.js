require("dotenv").config();

const app = require("./app");

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API listening on ${process.env.PORT}`);
})
